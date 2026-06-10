# MES 演示

## # 1. 演示地址
### # 1.1 MES 管理后台
- 演示地址：[http://dashboard-vue3.yudao.iocoder.cn/ (opens new window)](http://dashboard-vue3.yudao.iocoder.cn/)
- 菜单："MES 系统"下的「基础数据」「生产管理」「仓库管理」「质量管理」「设备管理」「工具管理」「排班管理」
- 仓库：[https://github.com/yudaocode/yudao-ui-admin-vue3 (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3) 的 `mes` 目录，基于 Vue3 + Element Plus 实现
![管理后台](/images/mes-preview.png) 
### # 1.2 MES 后端
支持 Spring Boot 单体、Spring Cloud 微服务架构
- 单体仓库： [https://github.com/YunaiV/ruoyi-vue-pro (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro) 的 `yudao-module-mes` 模块
- 微服务仓库： [https://github.com/YunaiV/yudao-cloud (opens new window)](https://github.com/YunaiV/yudao-cloud) 的 `yudao-module-mes` 服务
## # 2. MES 启动
参见 [《MES 手册 —— 功能开启》](/mes/build/) 文档，一般 3 分钟就可以启动完成。
## # 3. MES 交流
专属交流社区，欢迎扫码加入。
![交流群](/images/zsxq_mes.png) 
## # 4. 功能描述
主要分为 7 个核心模块：基础数据、生产管理、仓库管理、质量管理、设备管理、工具管理、排班管理。
![MES 功能列表](/images/mes-feature.png) 
## # 5. 表结构
MES 共 **133** 张表，覆盖从基础数据到生产、仓储、质量的完整制造执行链路。各模块表前缀与规模汇总如下：
| 模块 | 表前缀 | 表数量 | 核心职责 |
| --- | --- | --- | --- |
| 基础数据 | `mes_md_` | 17 | 物料、客商、车间等主数据 |
| 生产管理 | `mes_pro_` | 17 | 工序 → 工艺 → 工单 → 排产 → 报工 |
| 仓库管理 | `mes_wm_` | 62 | 三级库位 + 库存事务驱动的全链路出入库 |
| 质量管理 | `mes_qc_` | 16 | IQC / IPQC / OQC / RQC 四类质检闭环 |
| 设备管理 | `mes_dv_` | 12 | 设备台账、点检保养、维修工单 |
| 工具管理 | `mes_tm_` | 2 | 工装夹具台账与库存跟踪 |
| 排班管理 | `mes_cal_` | 7 | 班组 → 排班计划 → 排班日历 |
### # 5.1 基础数据
为生产、仓储、质量等业务提供主数据支撑，包括物料产品（分类、计量单位）、客户/供应商、车间/工作站、编码规则等。这些基础数据也可根据工厂实际情况，通过接口从 ERP 或其他外部系统同步。
![基础数据表](/images/img_bae4184c.png) 
- [《【基础】物料产品、分类、计量单位》](/mes/md/product/)
- [《【基础】客户管理、供应商管理》](/mes/md/client-vendor/)
- [《【基础】车间设置、工作站设置》](/mes/md/workshop/)
- [《【基础】编码规则》](/mes/md/autocode/)
### # 5.2 生产管理
围绕「**工序 → 工艺流程 → 生产工单 → 排产 → 报工**」主线，实现从计划到执行的闭环：
- **工序**：最小可分辨加工步骤，定义物料输入与产出。
- **工艺流程**：将多道工序编排为完整加工路线，关联产品与工序级 BOM。
- **生产工单**：车间执行指令，来源可以是客户订单或库存备货；保存后自动计算物料需求，若产成品依赖多个半成品，可逐层生成子工单直至原材料级别。
![生产管理表](/images/img_f175ec16.png) 
- [《【生产】工序设置、工艺流程》](/mes/pro/process-route/)
- [《【生产】生产工单》](/mes/pro/work-order/)
- [《【生产】生产排产、工序流转卡》](/mes/pro/schedule-card/)
- [《【生产】生产报工》](/mes/pro/feedback/)
- [《【生产】安灯配置、安灯呼叫》](/mes/pro/andon/)
### # 5.3 仓库管理
构建 `仓库 → 库区 → 库位` 三级空间结构，通过**库存事务引擎**统一驱动所有出入库单据的库存增减。所有单据均采用「起草 → 执行」两阶段流程，系统内置虚拟线边库管理在制物资。主要业务包括：
- **基础设施**：仓库/库区/库位设置、条码赋码、SN 码管理、批次管理。
- **库存核心**：库存现有量（按物料+仓库+库区+库位+批次五维聚合）、库存事务流水。
- **采购收货**：到货通知 → IQC（可选）→ 采购入库 → 供应商退货。
- **生产物流**：生产领料、生产退料、物料消耗（报工自动扣减）、产品产出、产品入库。
- **销售发货**：发货通知 → 销售出库 → 销售退货。
- **其他业务**：外协发料/入库、杂项出入库、转移调拨、装箱管理、库存盘点。
![仓库管理表](/images/img_b4c4d264.png) 
- [《【仓库】仓库与库区库位、条码赋码、SN码》](/mes/wm/warehouse-setup/)
- [《【仓库】批次管理、库存现有量、库存事务》](/mes/wm/stock/)
- [《【仓库】到货通知、采购入库、采购退货》](/mes/wm/purchase-in/)
- [《【仓库】生产领料、生产退料、物料消耗》](/mes/wm/issue-return/)
- [《【仓库】产品产出、产品入库》](/mes/wm/product-in/)
- [《【仓库】发货通知、销售出库、销售退货》](/mes/wm/sales-out/)
- [《【仓库】外协发料、外协入库》](/mes/wm/outsource/)
- [《【仓库】其他入库、其他出库》](/mes/wm/misc/)
- [《【仓库】转移调拨、装箱管理》](/mes/wm/transfer/)
- [《【仓库】库存盘点》](/mes/wm/stocktaking/)
### # 5.4 质量管理
覆盖 **IQC**（来料）、**IPQC**（过程）、**OQC**（出货）、**RQC**（退货）四类质检场景，通过「检测项 → 质检方案 → 质检单」三层结构实现模板自动匹配、检验行自动生成、缺陷自动汇总，质检完成后回写来源单据。
![质量管理表](/images/img_0a57d347.png) 
- [《【质量】检测项设置、常见缺陷》](/mes/qc/base/)
- [《【质量】质检方案》](/mes/qc/template/)
- [《【质量】来料检验（IQC）》](/mes/qc/iqc/)
- [《【质量】过程检验（IPQC）》](/mes/qc/ipqc/)
- [《【质量】出货检验（OQC）》](/mes/qc/oqc/)
- [《【质量】退货检验（RQC）》](/mes/qc/rqc/)
- [《【质量】待检任务、检验结果、缺陷记录》](/mes/qc/pending-inspect/)
### # 5.5 设备管理
覆盖设备全生命周期：**设备台账**（分类 + 基础信息）→ **点检保养**（项目 → 方案 → 执行记录）→ **维修工单**（报修 → 维修 → 验收）。
![设备管理表](/images/img_c18aeacb.png) 
- [《【设备】设备类型、设备台账》](/mes/dv/device/)
- [《【设备】点检保养项目、点检保养方案》](/mes/dv/check-plan/)
- [《【设备】点检记录、保养记录、维修单》](/mes/dv/check-record/)
### # 5.6 工具管理
管理生产过程中的工装夹具（模具、治具、刀具等），跟踪库存数量、可用数量与保养周期。
![工具管理表](/images/img_035cfcea.png) 
- [《【工具】工具类型、工装夹具台账》](/mes/tm/tool/)
### # 5.7 排班管理
通过「班组 → 排班计划 → 排班日历」三层结构，支持单白班、两班倒、三班倒等轮班模式，计划确认后自动生成逐日排班日历。
![排班管理表](/images/img_6904ad25.png) 
- [《【排班】班组设置、节假日设置》](/mes/cal/team/)
- [《【排班】排班计划、排班日历》](/mes/cal/calendar/)
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[OTA 固件升级](/iot/ota/) [功能开启](/mes/build/) 
←
[OTA 固件升级](/iot/ota/) [功能开启](/mes/build/)→
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