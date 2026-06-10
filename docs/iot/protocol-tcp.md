# 设备接入（TCP 协议）

推荐阅读：
- [《设备接入（概述）》](/iot/protocol-overview/) — 建议先阅读，了解整体架构和消息格式
TCP 协议接入，由 `yudao-module-iot-gateway` 模块的 `protocol.tcp` 包实现，基于 Vert.x TCP Server，默认端口 8091。
TCP 是**长连接**协议，支持**上行 + 下行**双向通信，适合需要稳定连接且资源有限的嵌入式设备。
## # 1. 整体架构
### # 1.1 连接认证
设备通过 TCP Socket 建立连接后，**第一条消息**必须是认证请求（`method` 为 `auth`），携带 `clientId`、`username`、`password` 三个字段。
认证由 IotTcpUpstreamHandler 处理。认证成功后，同一连接上的后续请求无需再携带认证信息。
### # 1.2 帧编解码
TCP 是流式协议，不保证消息边界。因此需要配置**帧编解码器**（Frame Codec）来解决粘包 / 拆包问题。
支持三种编解码类型（对应 IotTcpCodecTypeEnum 枚举）：
| 类型 | 说明 | 适用场景 |
| --- | --- | --- |
| `delimiter` | 分隔符拆包（如 `\n`、`\r\n`） | 文本协议，JSON 消息 |
| `length_field` | 长度字段拆包（二进制头部标记消息长度） | 二进制协议 |
| `fixed_length` | 固定长度拆包（每条消息长度固定） | 定长消息 |
编解码器由 IotTcpFrameCodecFactory 创建，具体实现见 `protocol.tcp.codec` 包。
### # 1.3 消息格式
TCP 消息统一使用 IotDeviceMessage 对象，通过 IotMessageSerializer 进行序列化/反序列化。序列化方式通过 `serialize` 配置项指定，详见 [《设备接入（概述）》](/iot/protocol-overview/) 的「4.3 消息序列化」章节。
消息的 `method` 字段标识操作类型：
| method | 说明 | 是否需要先认证 |
| --- | --- | --- |
| `auth` | 设备认证 | 否 |
| `thing.auth.register` | 设备动态注册（一型一密），详见 [《设备动态注册》](/iot/device-register/) | 否 |
| `thing.property.post` | 属性上报 | 是 |
| `thing.event.post` | 事件上报 | 是 |
所有上行消息由 IotTcpUpstreamHandler 统一处理，内部按 `method` 路由到不同方法：
| method | 处理方法 | 说明 |
| --- | --- | --- |
| `auth` | `#handleAuthenticationRequest(...)` | 校验三元组，注册连接，发送上线消息 |
| `thing.auth.register` | `#handleRegisterRequest(...)` | 一型一密动态注册，返回 deviceSecret |
| 其它业务方法 | `#handleBusinessRequest(...)` | 校验连接已认证，转发到消息总线 |
## # 2. 配置说明
在**网关**的 `application.yaml` 的 `yudao.iot.gateway.protocols` 中配置 TCP 协议实例：
yudao:
iot:
gateway:
protocols:
- id: tcp-json
enabled: true              # 是否启用
protocol: tcp              # 协议类型
port: 8091                 # 监听端口
serialize: json            # 序列化方式
tcp:
max-connections: 1000    # 最大连接数（默认 1000）
keep-alive-timeout-ms: 30000  # 空闲连接超时（毫秒，默认 30000）
codec:
type: delimiter        # 拆包类型：delimiter / length_field / fixed_length
delimiter: "\\n"       # 分隔符（支持转义：\\n=换行, \\r=回车, \\t=制表符）
对应 IotGatewayProperties.ProtocolProperties 通用配置类、IotTcpConfig 专属配置类（含 CodecConfig 内部类）。
注意：测试前需确保 `enabled` 设置为 `true`，否则协议不会启动。
## # 3. 快速测试【推荐】
可以通过以下集成测试类快速体验，具体步骤见各类的注释：
| 设备类型 | 测试类 |
| --- | --- |
| 直连设备 | IotDirectDeviceTcpProtocolIntegrationTest |
| 网关设备 | IotGatewayDeviceTcpProtocolIntegrationTest |
| 网关子设备 | IotGatewaySubDeviceTcpProtocolIntegrationTest |
## # 4. 手工测试（直连设备）
TCP 没有类似 Postman、curl 这样开箱即用的调试工具，因此暂不提供手工测试案例。**请使用第 3 节的集成测试类进行测试**，它已经封装好了帧编解码和序列化逻辑。