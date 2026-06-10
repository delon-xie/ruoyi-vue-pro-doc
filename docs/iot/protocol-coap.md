# 设备接入（CoAP 协议）

推荐阅读：
- [《设备接入（概述）》](/iot/protocol-overview/) — 建议先阅读，了解整体架构和消息格式
- [《阿里云物联网平台 —— 使用 CoAP 连接通信》 (opens new window)](https://help.aliyun.com/zh/iot/user-guide/coap-standard)
CoAP 协议接入，由 `yudao-module-iot-gateway` 模块的 `protocol.coap` 包实现，基于 Eclipse Californium，默认端口 5683。
CoAP（Constrained Application Protocol）是专为资源受限设备设计的**轻量级**协议，基于 UDP 传输，采用类 REST 风格（资源路径 + POST 方法）。仅支持**上行**（设备 → 平台），无法下行推送。
## # 1. 整体架构
### # 1.1 认证方式
CoAP 使用 **JWT Token** 进行无状态认证（与 HTTP 类似）：
1. 设备发送 `POST /auth`，携带 `clientId`、`username`、`password`
1. 网关验证成功后返回 JWT Token
1. 后续请求通过 CoAP **自定义 Option（编号 2088）** 携带 Token
与 HTTP 通过 `Authorization` Header 传递 Token 不同，CoAP 使用自定义 Option 2088 传递。具体见 IotCoapAbstractHandler 的 `OPTION_TOKEN` 常量。
### # 1.2 资源路径
| 资源路径 | 说明 | Handler 类 | 认证 |
| --- | --- | --- | --- |
| `POST /auth` | 设备认证，获取 Token | IotCoapAuthHandler | 无 |
| `POST /auth/register/device` | [设备动态注册（一型一密）](/iot/device-register/) | IotCoapRegisterHandler | 无 |
| `POST /auth/register/sub-device/:productKey/:deviceName` | [子设备动态注册](/iot/device-register/) | IotCoapRegisterSubHandler | Token |
| `POST /topic/sys/:productKey/:deviceName/*` | 上行消息（属性 / 事件等） | IotCoapUpstreamHandler | Token |
上行消息的资源路径中，`*` 通配符部分会被转换为 IotDeviceMessageMethodEnum 消息方法（斜杠转点号），例如：
- `/topic/sys/{productKey}/{deviceName}/thing/property/post` → method: `thing.property.post`
- `/topic/sys/{productKey}/{deviceName}/thing/event/post` → method: `thing.event.post`
## # 2. 配置说明
在**网关**的 `application.yaml` 的 `yudao.iot.gateway.protocols` 中配置 CoAP 协议实例：
yudao:
iot:
gateway:
protocols:
- id: coap-json
enabled: true                    # 是否启用
protocol: coap                   # 协议类型
port: 5683                       # 监听端口（CoAP 标准端口）
coap:
max-message-size: 1024         # 最大消息大小（字节，默认 1024）
ack-timeout-ms: 2000           # ACK 超时时间（毫秒，默认 2000）
max-retransmit: 4              # 最大重传次数（默认 4）
对应 IotGatewayProperties.ProtocolProperties 通用配置类、和 IotCoapConfig 专属配置类。
注意：测试前需确保 `enabled` 设置为 `true`，否则协议不会启动。
## # 3. 快速测试【推荐】
可以通过以下集成测试类快速体验，具体步骤见各类的注释：
| 设备类型 | 测试类 |
| --- | --- |
| 直连设备 | IotDirectDeviceCoapProtocolIntegrationTest |
| 网关设备 | IotGatewayDeviceCoapProtocolIntegrationTest |
| 网关子设备 | IotGatewaySubDeviceCoapProtocolIntegrationTest |
## # 4. 手工测试（直连设备）
CoAP 没有类似 Postman、curl 这样开箱即用的调试工具，因此暂不提供手工测试案例。**请使用第 3 节的集成测试类进行测试**，它已经封装好了 Option 2088 Token 传递和序列化逻辑。