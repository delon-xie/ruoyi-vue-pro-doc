# WMS 演示

## # 1. 演示地址
### # 1.1 WMS 管理后台
- 演示地址：[http://dashboard-vue3.yudao.iocoder.cn/](http://dashboard-vue3.yudao.iocoder.cn/)
- 菜单："WMS 系统"下的「基础数据」「库存管理」「入库管理」「出库管理」「移库管理」「盘库管理」
- 仓库：[https://github.com/yudaocode/yudao-ui-admin-vue3](https://github.com/yudaocode/yudao-ui-admin-vue3) 的 `wms` 目录，基于 Vue3 + Element Plus 实现
![管理后台](/images/wms-preview.png) 
### # 1.2 WMS 后端
支持 Spring Boot 单体、Spring Cloud 微服务架构
- 单体仓库： [https://github.com/YunaiV/ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) 的 `yudao-module-wms` 模块
- 微服务仓库： [https://github.com/YunaiV/yudao-cloud](https://github.com/YunaiV/yudao-cloud) 的 `yudao-module-wms` 服务
## # 2. WMS 启动
参见 [《WMS 手册 —— 功能开启》](/wms/build/) 文档，一般 3 分钟就可以启动完成。
## # 3. WMS 交流
专属交流社区，欢迎扫码加入。
![交流群](/images/zsxq_wms.png) 
## # 4. 功能描述
主要包含：基础数据、库存管理，以及入库 / 出库 / 移库 / 盘库四类业务单据。
![WMS 功能列表](/images/wms-feature.png) 
## # 5. 表结构
WMS 共 **16** 张表，覆盖物料主数据、库存台账与流水、出入库 / 移库 / 盘库四类业务单据，表名统一以 `wms_` 为前缀：
![WMS 全表关系](/images/img_0b2f6003.png) | 模块 | 子前缀 | 表数量 | 核心职责 |
| --- | --- | --- | --- |
| 基础数据 | `wms_warehouse` / `wms_item*` / `wms_merchant` | 6 | 仓库、商品体系（分类 / 品牌 / 商品 / SKU）、往来企业 |
| 库存管理 | `wms_inventory*` | 2 | 当前库存数量记录（按 `仓库 + SKU` 聚合）+ 库存变更流水 |
| 入库单 | `wms_receipt_order*` | 2 | 生产 / 采购 / 退货 / 归还 四类入库，共主表 + 明细 |
| 出库单 | `wms_shipment_order*` | 2 | 退货 / 销售 / 生产 三类出库，共主表 + 明细 |
| 移库单 | `wms_movement_order*` | 2 | 同公司内不同仓库间转移物料（主表 + 明细） |
| 盘库单 | `wms_check_order*` | 2 | 实物盘点后调整账面库存差异（主表 + 明细） |
### # 5.1 基础数据
为库存与单据业务提供主数据支撑，包括仓库、商品体系（分类、品牌、商品、SKU）、往来企业（供应商、客户）。
- [《【基础】仓库》](/wms/md/warehouse/)
- [《【基础】商品、SKU、分类、品牌》](/wms/md/item/)
- [《【基础】往来企业（供应商、客户）》](/wms/md/merchant/)
### # 5.2 库存管理
按 `仓库 + SKU` 维度记录当前库存数量，所有出入库 / 移库 / 盘库单据完成时通过库存事务统一写入流水。首页报表基于库存记录与流水聚合关键指标。
- [《【库存】库存记录、流水、统计》](/wms/inventory/)
### # 5.3 单据管理
四类业务单据：
- **入库单**（`wms_receipt_order*`）：生产 / 采购 / 退货 / 归还四类，共用主表 + 明细。
- **出库单**（`wms_shipment_order*`）：退货 / 销售 / 生产三类，共用主表 + 明细。
- **移库单**（`wms_movement_order*`）：同公司内不同仓库间转移物料，完成时一次性写入 OUT + IN 两笔库存事务。
- **盘库单**（`wms_check_order*`）：实物盘点对比账面后，按差异写入 ADJUST 库存事务对齐账实。
- [《【单据】入库》](/wms/order/receipt/)
- [《【单据】出库》](/wms/order/shipment/)
- [《【单据】移库》](/wms/order/movement/)
- [《【单据】盘库》](/wms/order/check/)
## # 6. 选型参考
yudao 体系内 WMS、MES、ERP 三个模块均涉及"库存"与"出入库单据"，业务边界与技术深度差异较大。选型纠结时可参阅：
- [《【其它】WMS、MES、ERP 对比》](/wms/compare/)
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[【排班】排班计划、排班日历](/mes/cal/calendar/) [功能开启](/wms/build/) 
←
[【排班】排班计划、排班日历](/mes/cal/calendar/) [功能开启](/wms/build/)→
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