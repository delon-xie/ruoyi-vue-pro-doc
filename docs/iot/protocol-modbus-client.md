# 设备接入（Modbus Client 模式）

推荐阅读：
- [《设备接入（概述）》](/iot/protocol-overview/) — 建议先阅读，了解整体架构和消息格式
- [《设备接入（Modbus Server）》](/iot/protocol-modbus-server/)
- [《阿里云物联网 —— 添加 Modbus 协议设备》](https://help.aliyun.com/zh/iot-edge/user-guide/add-a-modbus-device)
Modbus Client 协议接入，由 `yudao-module-iot-gateway` 模块的 `protocol.modbus.tcpclient` 包实现，基于 [j2mod](https://github.com/steveohara/j2mod) 库，默认端口 502。
网关作为 TCP **Client** 主动连接远程设备（PLC、传感器等），设备扮演 TCP **Server**（Modbus 从站）。连接建立后，网关作为 **Modbus 主站**，按配置的轮询间隔读取设备寄存器数据。
适用场景：设备有固定 IP 地址，网关可以主动发起连接。
## # 1. 整体架构
### # 1.1 支持的方法
与 MQTT/HTTP 等协议支持丰富的 method（属性上报、事件上报、服务调用等）不同，Modbus 协议的本质是**读写设备寄存器**，因此仅支持：
| 方向 | method | 说明 |
| --- | --- | --- |
| 上行（设备 → 平台） | `thing.property.post` | 网关轮询读取设备寄存器，经点位转换后上报属性 |
| 下行（平台 → 设备） | `thing.property.set` | 平台下发属性值，网关反向转换后写入设备寄存器 |
不支持：`thing.event.post`（事件上报）、`thing.service.invoke`（服务调用）等。
### # 1.2 上行（轮询读取）
网关启动后，按以下流程工作：
1. 【IotModbusTcpClientConfigCacheService】定期从平台拉取设备 Modbus 配置（默认 30 秒）
1. 【IotModbusTcpClientConnectionManager】对每个设备建立 TCP 连接到 `ip:port`，通过 Redisson 分布式锁防止多网关实例重复连接同一设备
1. 【IotModbusTcpClientPollScheduler】按 Modbus 点位配置的 `pollInterval` 定时发送 Modbus 读请求
1. 【IotModbusTcpClientUpstreamHandler】收到设备响应后，根据点位配置进行转换为最终属性值，最后发送 `thing.property.post` 到消息总线
提示
点位配置表，定义了"物模型属性 ↔ Modbus 寄存器"的映射关系，包括功能码、寄存器地址、数据类型、字节序、缩放因子等。详见「3.3 点位配置」。
### # 1.3 下行（属性写入）
平台通过 `thing.property.set` 下发属性值时，由 IotModbusTcpClientDownstreamHandler 处理：
1. 根据点位配置反向转换：属性值 → 原始寄存器值
1. 写功能码自动推导： - FC01（线圈）→ FC05（写单个）/ FC15（写多个） - FC03（保持寄存器）→ FC06（写单个）/ FC16（写多个）
注意
FC02（离散输入）/ FC04（输入寄存器）为只读，不支持写入。
## # 2. 配置说明
在**网关**的 `application.yaml` 的 `yudao.iot.gateway.protocols` 中配置 Modbus Client 协议实例：
yudao:
iot:
gateway:
protocols:
- id: modbus-tcp-client-1
enabled: true                # 是否启用
protocol: modbus_tcp_client  # 协议类型
port: 502                    # 默认端口（Modbus 标准端口）
modbus-tcp-client:           # 专属配置（IotModbusTcpClientConfig）
config-refresh-interval: 30  # 配置刷新间隔（秒，默认 30）
对应 IotGatewayProperties.ProtocolProperties 通用配置类、和 IotModbusTcpClientConfig 专属配置类。
注意：测试前需确保 `enabled` 设置为 `true`，否则协议不会启动。
## # 3. 管理后台配置
以实际操作流程讲解，从产品到设备到点位。
### # 3.1 产品配置
创建产品时，协议类型选择 **Modbus TCP Client**。
![产品创建](../images/img_5893daf5.png) 
### # 3.2 Modbus 连接配置
创建设备后，在设备详情页的「Modbus 配置」Tab 配置连接参数，由 IotDeviceModbusConfigController 提供的接口进行管理：
![连接配置](../images/img_fe303659.png) 对应数据表 `iot_device_modbus_config` 结构：
CREATE TABLE `iot_device_modbus_config` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
`device_id` bigint NOT NULL COMMENT '设备编号',
`product_id` bigint DEFAULT NULL COMMENT '产品编号',
`ip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'Modbus 服务器 IP 地址',
`port` int NOT NULL DEFAULT '502' COMMENT 'Modbus 服务器端口',
`slave_id` int NOT NULL DEFAULT '1' COMMENT '从站地址',
`timeout` int NOT NULL DEFAULT '3000' COMMENT '连接超时时间，单位：毫秒',
`retry_interval` int NOT NULL DEFAULT '1000' COMMENT '重试间隔，单位：毫秒',
`status` tinyint NOT NULL DEFAULT '0' COMMENT '状态',
-- 仅 Modbus Server 模式使用（暂时忽略）
`mode` tinyint NOT NULL DEFAULT '1' COMMENT '工作模式',
`frame_format` tinyint NOT NULL DEFAULT '1' COMMENT '数据帧格式',
PRIMARY KEY (`id`),
UNIQUE KEY `uk_device_id` (`device_id`,`deleted`,`tenant_id`) COMMENT '设备编号唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='IoT 设备 Modbus 连接配置表';
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
① `ip`、`port` 为设备的 Modbus 服务器地址。Client 模式下，网关作为客户端主动连接该地址。例如 PLC 设备地址为 `192.168.1.100:502`。
② `slaveId` 为 Modbus 从站地址（范围 1-247）。同一 TCP 连接上，如果设备支持多个从站（如 Modbus 网关代理多个子设备），通过 `slaveId` 区分不同从站。
③ `timeout` 为通信超时时间（毫秒），默认 3000。网关发送读写请求后，超过此时间未收到响应则视为超时。`retryInterval` 为连接失败后的重试间隔（毫秒），默认 1000。
④ `status` 为配置状态，对应 CommonStatusEnum 枚举。禁用后网关不会连接该设备。
### # 3.3 点位配置
将物模型属性映射到 Modbus 寄存器地址。每个点位定义了如何从设备读取/写入一个属性值，由 IotDeviceModbusPointController 提供的接口进行管理：
![点位配置](../images/img_aea9661a.png) 对应数据表 `iot_device_modbus_point` 结构：
CREATE TABLE `iot_device_modbus_point` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
`device_id` bigint NOT NULL COMMENT '设备编号',
`thing_model_id` bigint NOT NULL COMMENT '物模型属性编号',
`identifier` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '属性标识符',
`name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '属性名称',
`function_code` tinyint NOT NULL DEFAULT '3' COMMENT 'Modbus 功能码（1-读线圈 2-读离散输入 3-读保持寄存器 4-读输入寄存器）',
`register_address` int NOT NULL DEFAULT '0' COMMENT '寄存器起始地址',
`register_count` int NOT NULL DEFAULT '1' COMMENT '寄存器数量',
`byte_order` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'AB' COMMENT '字节序（AB/BA/ABCD/CDAB/DCBA/BADC）',
`raw_data_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'INT16' COMMENT '原始数据类型（INT16/UINT16/INT32/UINT32/FLOAT/DOUBLE/BOOLEAN/STRING）',
`scale` decimal(20,6) NOT NULL DEFAULT '1.000000' COMMENT '缩放因子',
`poll_interval` int NOT NULL DEFAULT '5000' COMMENT '轮询间隔，单位：毫秒',
`status` tinyint NOT NULL DEFAULT '0' COMMENT '状态（0-开启 1-禁用）',
PRIMARY KEY (`id`),
UNIQUE KEY `uk_device_thing_model` (`device_id`,`thing_model_id`,`deleted`,`tenant_id`) COMMENT '设备+物模型唯一索引',
KEY `idx_device_id` (`device_id`) COMMENT '设备编号索引'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='IoT 设备 Modbus 点位配置表';
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
① `device_id` 为设备编号，关联 `iot_device` 表。`thing_model_id` 为物模型属性编号，关联 `iot_thing_model` 表，确保每个设备的每个物模型属性只能映射一个点位（联合唯一索引）。`identifier`、`name` 为物模型属性的标识符和名称，冗余存储用于展示。
② `functionCode` 为 Modbus 功能码（FC01-04），决定读取哪种寄存器类型。`registerAddress` 为寄存器起始地址，`registerCount` 为读取的寄存器数量。三者共同决定一次读请求的目标位置。详见附录「A. 功能码」说明。
③ `rawDataType` 为从寄存器读取的原始数据类型，对应 IotModbusRawDataTypeEnum 枚举。`byteOrder` 为字节序，对应 IotModbusByteOrderEnum 枚举。两者共同决定如何将寄存器原始字节解析为数值。详见附录「B. 数据类型」和「C. 字节序」说明。
④ `scale` 为缩放因子，公式：**属性值 = 原始值 × scale**。例如温度传感器返回原始值 `256`，`scale = 0.1`，则属性值 = 25.6°C。
⑤ `pollInterval` 为轮询间隔（毫秒），网关每隔此时间向设备发送一次读请求。
⑥ `status` 为点位状态，对应 CommonStatusEnum 枚举。禁用后不再轮询该点位。
## # 4. 快速测试【推荐】
可以通过以下集成测试类快速体验，具体步骤见各类的注释：
| 测试场景 | 测试类 |
| --- | --- |
| Client 轮询从站设备 | IoTModbusTcpClientIntegrationTest |
以内置的 id 为 82 的 [Modbus TCP Client 演示设备](http://127.0.0.1/iot/device/detail/82) 为例进行测试。
① 该测试类内置了一个 j2mod 模拟从站（端口 5020），会自动初始化线圈、离散输入、保持寄存器、输入寄存器四种类型的数据，并每 5 秒更新一次模拟传感器数据变化。
执行 IoTModbusTcpClientIntegrationTest 该测试类后，会看到如下日志：
// 日志说明：模拟从站启动成功，监听 5020 端口，从站地址为 1
10:34:48.244 [main] INFO ...IoTModbusTcpClientIntegrationTest -- [testStartSlaveSimulator][Modbus TCP 从站模拟器已启动, 端口: 5020, 从站地址: 1]
10:34:48.246 [main] INFO ...IoTModbusTcpClientIntegrationTest -- [testStartSlaveSimulator][可用寄存器: 线圈(01/05) 0-9, 离散输入(02) 0-9, 保持寄存器(03/06/16) 0-19, 输入寄存器(04) 0-19]
// 日志说明：每 5 秒自动更新一次模拟传感器数据（保持寄存器 +100，输入寄存器 +1）
10:34:53.251 [main] INFO ...IoTModbusTcpClientIntegrationTest -- [testStartSlaveSimulator][数据已更新, counter=1, 保持寄存器[0]=100, 输入寄存器[0]=2]
10:34:58.259 [main] INFO ...IoTModbusTcpClientIntegrationTest -- [testStartSlaveSimulator][数据已更新, counter=2, 保持寄存器[0]=200, 输入寄存器[0]=3]
10:35:03.263 [main] INFO ...IoTModbusTcpClientIntegrationTest -- [testStartSlaveSimulator][数据已更新, counter=3, 保持寄存器[0]=300, 输入寄存器[0]=4]
② 在 IoT 网关端日志中，可以看到网关成功连接到模拟从站，并按点位配置轮询读取数据：
// 日志说明：网关拉取到 1 个 Modbus 设备配置，并成功建立 TCP 连接
2026-02-13T10:35:19.888+08:00 DEBUG ... IotModbusTcpClientProtocol : [refreshConfig][获取到 1 个 Modbus 设备配置]
2026-02-13T10:35:19.906+08:00  INFO ... IotModbusTcpClientConnectionManager : [ensureConnection][创建 Modbus 连接成功: 127.0.0.1:5020]
// 日志说明：为设备 82 的两个点位（width、height）创建轮询定时器，间隔 5000ms
2026-02-13T10:35:19.957+08:00 DEBUG ... AbstractIotModbusPollScheduler : [updatePolling][设备 82 点位 7 定时器已创建, interval=5000ms]
2026-02-13T10:35:19.957+08:00 DEBUG ... AbstractIotModbusPollScheduler : [updatePolling][设备 82 点位 8 定时器已创建, interval=5000ms]
// 日志说明：轮询读取到寄存器数据，经点位转换后上报属性值
2026-02-13T10:35:24.978+08:00 DEBUG ... IotModbusTcpClientUpstreamHandler : [handleReadResult][设备=82, 属性=width, 原始值=[700], 转换值=700]
2026-02-13T10:35:25.959+08:00 DEBUG ... IotModbusTcpClientUpstreamHandler : [handleReadResult][设备=82, 属性=height, 原始值=[100], 转换值=100]
③ 可以在管理后台查看上报的属性数据：
![属性数据](../images/property-data.png) ![属性消息日志](../images/property-message-log.png) 
## # 5. 手工测试
Modbus 协议需要专用从站设备或模拟器，暂不提供手工测试案例。**请使用第 4 节的集成测试类进行测试**。
## # 附录：Modbus 基础知识
### # A. 功能码（functionCode）
Modbus 定义了 4 种寄存器类型，每种对应不同的读/写功能码。使用 IotModbusCommonUtils 中的常量定义：
| 寄存器类型 | 读功能码 | 写功能码 | 数据类型 | 说明 |
| --- | --- | --- | --- | --- |
| 线圈（Coil） | FC01 | FC05 / FC15 | 布尔 | 可读写，控制开关量 |
| 离散输入（Discrete Input） | FC02 | 只读 | 布尔 | 只读，读取开关量状态 |
| 保持寄存器（Holding Register） | FC03 | FC06 / FC16 | 16 位整数 | 可读写，存储配置和数据 |
| 输入寄存器（Input Register） | FC04 | 只读 | 16 位整数 | 只读，读取测量数据 |
每个寄存器为 16 位（2 字节）。对于 32 位或 64 位数据类型（如 FLOAT、DOUBLE），需要占用多个连续寄存器。
### # B. 数据类型（rawDataType）
对应 IotModbusRawDataTypeEnum 枚举：
| 数据类型 | 说明 | 寄存器数量 |
| --- | --- | --- |
| `INT16` | 有符号 16 位整数 | 1 |
| `UINT16` | 无符号 16 位整数 | 1 |
| `INT32` | 有符号 32 位整数 | 2 |
| `UINT32` | 无符号 32 位整数 | 2 |
| `FLOAT` | 32 位浮点数 | 2 |
| `DOUBLE` | 64 位浮点数 | 4 |
| `BOOLEAN` | 布尔值（用于线圈） | 1 |
| `STRING` | 字符串 | 可变 |
### # C. 字节序（byteOrder）
不同设备厂商可能使用不同的字节序，需要根据设备手册配置。对应 IotModbusByteOrderEnum 枚举：
| 字节序 | 适用位宽 | 说明 |
| --- | --- | --- |
| `AB` | 16 位 | 大端序 |
| `BA` | 16 位 | 小端序 |
| `ABCD` | 32 位及以上 | 大端序 |
| `CDAB` | 32 位及以上 | 大端字交换 |
| `DCBA` | 32 位及以上 | 小端序 |
| `BADC` | 32 位及以上 | 小端字交换 |
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[设备接入（CoAP 协议）](/iot/protocol-coap/) [设备接入（Modbus Server 模式）](/iot/protocol-modbus-server/) 
←
[设备接入（CoAP 协议）](/iot/protocol-coap/) [设备接入（Modbus Server 模式）](/iot/protocol-modbus-server/)→
[](mailto:7685413@qq.com)[](https://github.com/YunaiV)[](https://www.iocoder.cn/?yudao) 
Theme by
[Vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing) 
| Copyright © 2019-2026
芋道源码 | MIT License   
- 跟随系统
- 浅色模式
- 深色模式
- 阅读模式
× 
.windowRB{ padding: 0;}
.windowRB .wwads-img{margin-top: 10px;}
.windowRB .wwads-content{margin: 0 10px 10px 10px;}
.custom-html-window-rb .close-but{
display: none;
}