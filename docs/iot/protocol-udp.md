# 设备接入（UDP 协议）

推荐阅读：
- [《设备接入（概述）》](/iot/protocol-overview/) — 建议先阅读，了解整体架构和消息格式
UDP 协议接入，由 `yudao-module-iot-gateway` 模块的 `protocol.udp` 包实现，基于 Vert.x UDP Server，默认端口 8093。
UDP 是**无连接**协议，仅支持**上行**（设备 → 平台），无法下行推送。每个数据报相互独立，因此采用 **JWT Token** 进行无状态认证。
## # 1. 整体架构
### # 1.1 认证方式
UDP 是无连接的协议，每次请求相互独立。认证流程：
1. 设备发送 `auth` 请求，携带 `clientId`、`username`、`password`
1. 网关验证成功后返回 **JWT Token**
1. 后续每次请求在 `params` 中携带该 Token
认证由 IotUdpUpstreamHandler 处理。
### # 1.2 Token 包装格式
认证成功后，后续请求的 `params` 需要使用以下包装格式：
{
"token": "eyJhbGciOiJIUzI1NiIs...",
"body": {
// 实际请求参数
}
}
- `token`：JWT 令牌，从认证接口获取
- `body`：实际的业务请求参数
### # 1.3 消息格式
UDP 消息统一使用 IotDeviceMessage 对象，通过 IotMessageSerializer 进行序列化/反序列化。序列化方式通过 `serialize` 配置项指定，详见 [《设备接入（概述）》](/iot/protocol-overview/) 的「4.3 消息序列化」章节。
消息的 `method` 字段标识操作类型：
| method | 说明 | 是否需要先认证 |
| --- | --- | --- |
| `auth` | 设备认证 | 否 |
| `thing.auth.register` | 设备动态注册（一型一密），详见 [《设备动态注册》](/iot/device-register/) | 否 |
| `thing.property.post` | 属性上报 | 是 |
| `thing.event.post` | 事件上报 | 是 |
所有上行消息由 IotUdpUpstreamHandler 统一处理，内部按 `method` 路由到不同方法：
| method | 处理方法 | 说明 |
| --- | --- | --- |
| `auth` | `#handleAuthenticationRequest(...)` | 校验三元组，返回 JWT Token，创建会话 |
| `thing.auth.register` | `#handleRegisterRequest(...)` | 一型一密动态注册，返回 deviceSecret |
| 其它业务方法 | `#handleBusinessRequest(...)` | 校验 Token 有效性，转发到消息总线 |
### # 1.4 会话管理
UDP 虽然是无连接协议，但网关仍会维护一个**会话缓存**（基于 Guava Cache），用于追踪设备状态。
会话通过 IotUdpSessionManager 管理，使用 `expireAfterAccess` 策略自动过期清理。
## # 2. 配置说明
在**网关**的 `application.yaml` 的 `yudao.iot.gateway.protocols` 中配置 UDP 协议实例：
yudao:
iot:
gateway:
protocols:
- id: udp-json
enabled: true                    # 是否启用
protocol: udp                    # 协议类型
port: 8093                       # 监听端口
serialize: json                  # 序列化方式
udp:
max-sessions: 1000             # 最大会话数（默认 1000）
session-timeout-ms: 60000      # 会话超时时间（毫秒，默认 60000）
receive-buffer-size: 65536     # 接收缓冲区大小（字节，默认 65536）
send-buffer-size: 65536        # 发送缓冲区大小（字节，默认 65536）
对应 IotGatewayProperties.ProtocolProperties 通用配置类、和 IotUdpConfig 专属配置类。
注意：测试前需确保 `enabled` 设置为 `true`，否则协议不会启动。
## # 3. 快速测试【推荐】
可以通过以下集成测试类快速体验，具体步骤见各类的注释：
| 设备类型 | 测试类 |
| --- | --- |
| 直连设备 | IotDirectDeviceUdpProtocolIntegrationTest |
| 网关设备 | IotGatewayDeviceUdpProtocolIntegrationTest |
| 网关子设备 | IotGatewaySubDeviceUdpProtocolIntegrationTest |
## # 4. 手工测试（直连设备）
UDP 没有类似 Postman、curl 这样开箱即用的调试工具，因此暂不提供手工测试案例。**请使用第 3 节的集成测试类进行测试**，它已经封装好了序列化和 Token 包装逻辑。