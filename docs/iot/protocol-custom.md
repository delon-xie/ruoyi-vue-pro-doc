# 设备接入（自定义协议）

推荐阅读：
- [《设备接入（概述）》](/iot/protocol-overview/) — 建议先阅读，了解整体架构和消息格式
本文以 TCP 协议为蓝本，一步步讲解如何在 IoT 网关中扩展一种新协议。
## # 1. 整体思路
新增一种协议，需要改动以下模块和类：
| 步骤 | 改动位置 | 说明 |
| --- | --- | --- |
| ① | IotProtocolTypeEnum | 新增协议类型枚举 |
| ② | IotXxxConfig + IotGatewayProperties.ProtocolProperties | 协议配置类 |
| ③ | IotXxxProtocol 实现 IotProtocol 接口 | 协议主类，管理生命周期 |
| ④ | 上行 Handler + 下行 Subscriber | 消息收发处理 |
| ⑤ | IotProtocolManager | 注册协议到管理器 |
在 `yudao-module-iot-gateway` 模块的 `protocol/` 目录下新建协议包，最终的包结构如下：
protocol/
└── xxx/                                    // 你的协议包
├── IotXxxProtocol.java                 // 协议主类
├── IotXxxConfig.java                   // 专属配置类
├── handler/
│   ├── upstream/                       // 上行（设备 → 网关）
│   │   ├── IotXxxAuthHandler.java      // 认证
│   │   └── IotXxxUpstreamHandler.java  // 上行消息
│   └── downstream/                     // 下行（网关 → 设备）
│       ├── IotXxxDownstreamHandler.java     // 下行消息处理逻辑
│       └── IotXxxDownstreamSubscriber.java  // 消息总线订阅者
└── manager/                            // 长连接协议需要
└── IotXxxConnectionManager.java    // 设备连接管理
提示
短连接协议（如 HTTP）通常不需要 `manager/` 目录。
## # 2. 实现步骤
### # 2.1 新增协议类型
① 在 `yudao-module-iot-core` 模块的 IotProtocolTypeEnum 枚举中，新增一个枚举值：
public enum IotProtocolTypeEnum {
// ... 已有协议 ...
HTTP("http"),
MQTT("mqtt"),
TCP("tcp"),
XXX("xxx"); // 新增：你的协议类型标识
}
注意
`"xxx"` 是协议的**类型标识**，必须与 `application.yaml` 配置中的 `protocol` 字段一致。
② 需要在管理后台的「系统管理 → 字典管理」中，找到字典类型 `iot_product_protocol_type`，新增一条字典数据（值与枚举标识一致，如 `"xxx"`），这样前端创建产品时才能选择该协议类型。
### # 2.2 创建协议配置类
**① 新建专属配置类** `IotXxxConfig`，存放该协议独有的配置参数：
@Data
public class IotXxxConfig {
/**
* 最大连接数
*/
private Integer maxConnections = 1000;
// ... 其他协议特有参数 ...
}
可参考 IotTcpConfig（含 codec、maxConnections 等字段）。
**② 在 ProtocolProperties 中注册**，编辑 IotGatewayProperties 的 ProtocolProperties 内部类：
@Data
public static class ProtocolProperties {
// ... 已有字段 ...
private IotHttpConfig http;
private IotMqttConfig mqtt;
private IotXxxConfig xxx; // 新增
}
### # 2.3 实现 IotProtocol 接口
IotProtocol 是所有协议的核心接口，需要实现以下方法：
| 方法 | 说明 |
| --- | --- |
| `#getId()` | 协议实例 ID，对应配置中的 `id` 字段 |
| `#getServerId()` | 服务标识，用于下行消息路由 |
| `#getType()` | 协议类型枚举 |
| `#start()` | 启动协议服务 |
| `#stop()` | 停止协议服务 |
| `#isRunning()` | 是否正在运行 |
以 IotTcpProtocol 为参考，协议主类的实现结构如下：
@Slf4j
public class IotXxxProtocol implements IotProtocol {
private final ProtocolProperties properties;
@Getter
private final String serverId;
@Getter
private volatile boolean running = false;
// 协议资源（服务器、连接等）
private YourServer server;
private IotXxxDownstreamSubscriber downstreamSubscriber;
public IotXxxProtocol(ProtocolProperties properties) {
this.properties = properties;
this.serverId = IotDeviceMessageUtils.generateServerId(properties.getPort());
}
@Override
public String getId() {
return properties.getId();
}
@Override
public IotProtocolTypeEnum getType() {
return IotProtocolTypeEnum.XXX;
}
@Override
public void start() {
if (running) {
return;
}
try {
// ① 创建并启动协议服务器
this.server = createAndStartServer();
running = true;
log.info("[start][协议 {} 启动成功，端口：{}]", getId(), properties.getPort());
// ② 启动下行消息订阅者
IotMessageBus messageBus = SpringUtil.getBean(IotMessageBus.class);
this.downstreamSubscriber = new IotXxxDownstreamSubscriber(this, messageBus);
this.downstreamSubscriber.start();
} catch (Exception e) {
log.error("[start][协议 {} 启动失败]", getId(), e);
stop0();
throw e;
}
}
@Override
public void stop() {
if (!running) {
return;
}
stop0();
}
private void stop0() {
// ① 停止下行订阅者
if (downstreamSubscriber != null) {
downstreamSubscriber.stop();
downstreamSubscriber = null;
}
// ② 关闭服务器
if (server != null) {
server.close();
server = null;
}
running = false;
}
}
注意
`stop0()` 方法在 `start()` 异常时也会被调用（用于清理已初始化的资源），因此每个资源释放都应做 `null` 判断，避免 NPE。
### # 2.4 实现上行 Handler
上行 Handler 负责处理设备发送到网关的请求，通常包括 **认证** 和 **消息上报** 两部分。
#### # 2.4.1 认证
认证方式取决于协议的连接特性：
| 连接类型 | 认证方式 | 参考实现 | 说明 |
| --- | --- | --- | --- |
| 短连接 | JWT Token | IotHttpAuthHandler | 认证成功返回 Token，后续请求携带 Token |
| 长连接 | 连接时认证 | IotTcpUpstreamHandler（`handleAuth()` 方法） | 认证成功后在 ConnectionManager 中记录设备信息，连接期间无需重复认证 |
两种方式都通过 IotDeviceCommonApi 的 `#authDevice(...)` 方法完成认证校验。认证成功后，需调用 IotDeviceMessageService 的 `#sendDeviceMessage(...)` 发送上线消息：
IotDeviceMessage message = IotDeviceMessage.buildStateUpdateOnline();
deviceMessageService.sendDeviceMessage(message, productKey, deviceName, serverId);
#### # 2.4.2 消息上报
处理设备上报的属性、事件等业务消息。核心流程：
1. 从请求中解析出 `productKey`、`deviceName`
1. 反序列化消息体为 IotDeviceMessage
1. 调用 IotDeviceMessageService 的 `#sendDeviceMessage(message, productKey, deviceName, serverId)` 发布到消息总线
// 以 TCP 为例（IotTcpUpstreamHandler）
String productKey = connectionInfo.getProductKey();
String deviceName = connectionInfo.getDeviceName();
IotDeviceMessage message = deserializeMessage(data);
deviceMessageService.sendDeviceMessage(message, productKey, deviceName, serverId);
提示
如果需要自定义消息序列化格式，可参考附录「C. 自定义序列化」。
#### # 2.4.3 动态注册（可选）
如果协议需要支持设备动态注册（一型一密），参考 IotHttpRegisterHandler 和 IotHttpRegisterSubHandler，调用 IotDeviceCommonApi 的 `#registerDevice(...)` 和 `#registerSubDevices(...)` 方法。
### # 2.5 实现下行 Subscriber
① 情况一：下行 Subscriber 负责接收平台发送给设备的消息（如属性设置、服务调用），继承 AbstractIotProtocolDownstreamSubscriber 即可：
@Slf4j
public class IotXxxDownstreamSubscriber extends AbstractIotProtocolDownstreamSubscriber {
public IotXxxDownstreamSubscriber(IotProtocol protocol, IotMessageBus messageBus) {
super(protocol, messageBus);
}
@Override
protected void handleMessage(IotDeviceMessage message) {
// 短连接协议（如 HTTP）不支持下行推送，直接忽略
log.info("[handleMessage][协议不支持下行推送，忽略消息：{}]", message.getId());
}
}
② 情况二：如果是**长连接**协议，需要通过 ConnectionManager 查找设备连接并推送消息。可参考 IotTcpDownstreamSubscriber + IotTcpDownstreamHandler，完整示例如下：
IotXxxDownstreamSubscriber 将消息委托给 Handler 处理：
@Slf4j
public class IotXxxDownstreamSubscriber extends AbstractIotProtocolDownstreamSubscriber {
private final IotXxxDownstreamHandler downstreamHandler;
public IotXxxDownstreamSubscriber(IotProtocol protocol,
IotXxxDownstreamHandler downstreamHandler,
IotMessageBus messageBus) {
super(protocol, messageBus);
this.downstreamHandler = downstreamHandler;
}
@Override
protected void handleMessage(IotDeviceMessage message) {
downstreamHandler.handle(message);
}
}
IotXxxDownstreamHandler 查找连接、序列化、发送：
@Slf4j
@RequiredArgsConstructor
public class IotXxxDownstreamHandler {
private final IotXxxConnectionManager connectionManager;
private final IotMessageSerializer serializer;
public void handle(IotDeviceMessage message) {
// ① 检查设备连接
IotXxxConnectionManager.ConnectionInfo connectionInfo =
connectionManager.getConnectionInfoByDeviceId(message.getDeviceId());
if (connectionInfo == null) {
log.warn("[handle][设备 {} 不在线]", message.getDeviceId());
return;
}
// ② 序列化消息
byte[] payload = serializer.serialize(message);
// ③ 发送给设备
connectionManager.sendToDevice(message.getDeviceId(), payload);
log.info("[handle][下行消息发送成功, 设备 ID: {}, 方法: {}]",
message.getDeviceId(), message.getMethod());
}
}
### # 2.6 注册到 IotProtocolManager
在 IotProtocolManager 中完成两处改动：
**① 在 `#createProtocol(config)` 的 `switch` 中增加分支：**
switch (protocolType) {
// ... 已有 case ...
case XXX:
return createXxxProtocol(config);
}
**② 新增工厂方法：**
private IotXxxProtocol createXxxProtocol(ProtocolProperties config) {
return new IotXxxProtocol(config);
}
### # 2.7 添加 YAML 配置
在**网关**的 `application.yaml` 中添加协议实例配置：
yudao:
iot:
gateway:
protocols:
- id: xxx-json
enabled: true
protocol: xxx        # 对应 IotProtocolTypeEnum 的标识
port: 9000
serialize: json      # 可选，短连接协议通常不需要
xxx:                 # 对应 IotXxxConfig 的字段
max-connections: 1000
注意
`enabled` 默认为 `false`，需要显式设置为 `true` 才会启动。
## # 附录
### # A. 关键服务一览
协议实现中常用的服务，均可通过 `SpringUtil.getBean(...)` 获取：
| 服务 | 说明 |
| --- | --- |
| IotDeviceMessageService | 消息发送、序列化/反序列化（按设备配置） |
| IotDeviceTokenService | JWT Token 创建/校验（短连接认证） |
| IotDeviceCommonApi | 设备认证 `#authDevice(...)`、动态注册 `#registerDevice(...)` 等 RPC 接口 |
| IotDeviceService | 设备缓存查询 `#getDeviceFromCache(...)` |
| IotMessageBus | 消息总线，注册/取消订阅者 |
| IotMessageSerializerManager | 获取指定类型的消息序列化器（JSON / Binary） |
### # B. 短连接 vs 长连接
根据协议的连接特性，实现方式有所不同：
| 特性 | 短连接（HTTP、CoAP） | 长连接（MQTT、TCP、UDP、WebSocket） |
| --- | --- | --- |
| 认证方式 | Token（JWT 无状态） | 连接时认证，ConnectionManager 记录 |
| 下行推送 | 不支持（DownstreamSubscriber 忽略） | 支持（通过 ConnectionManager 查找连接并推送） |
| 序列化 | 固定 JSON（请求体即 JSON） | 通过 `serialize` 配置 或 设备 `serializeType` 字段 |
| 连接管理 | 不需要 | 需要 ConnectionManager 管理连接和设备映射 |
| 离线检测 | 不涉及（Token 过期即视为离线） | 连接断开时发送离线消息 |
| 参考实现 | IotHttpProtocol | IotTcpProtocol、IotMqttProtocol |
### # C. 自定义序列化
系统内置 JSON 和 Binary 两种消息序列化方式（对应 IotSerializeTypeEnum 枚举）。如需自定义序列化格式，步骤如下：
1. 在 IotSerializeTypeEnum 中新增枚举值（如 `MY_FORMAT("my_format")`）
1. 实现 IotMessageSerializer 接口，包含三个方法： - `#serialize(IotDeviceMessage)` — 将消息编码为 `byte[]` - `#deserialize(byte[])` — 将 `byte[]` 解码为 IotDeviceMessage - `#getType()` — 返回对应的 IotSerializeTypeEnum 枚举值
1. IotMessageSerializerManager 会自动加载所有枚举对应的序列化器，无需手动注册
可参考内置实现：IotJsonSerializer（JSON 格式）、IotBinarySerializer（自定义二进制协议，含魔数、版本号、消息类型等帧头结构）。