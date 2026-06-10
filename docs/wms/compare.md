# 【其它】WMS、MES、ERP 对比

yudao 体系内 WMS、MES、ERP 三个模块都涉及"库存"与"出入库单据"，业务边界与技术深度差异较大。本文用一张总览表 + 几条选型建议，帮你判断当前业务该用哪个模块。
## # 1. 三者总览
| 维度 | WMS | MES | ERP |
| --- | --- | --- | --- |
| 后端模块 | `yudao-module-wms` | `yudao-module-mes` | `yudao-module-erp` |
| 前端目录 | `@/views/wms` | `@/views/mes` | `@/views/erp` |
| 业务定位 | **纯仓储管理** | **制造执行**（生产 + 仓储 + 质量 + 设备） | **企业资源计划**（采购 + 销售 + 库存 + 财务） |
| 表数量 | 16 张 | 133 张 | 30+ 张 |
| 核心维度 | 仓库 + SKU | 仓库 + 库区 + 库位 + 批次 + SN（五维聚合） | 仓库 + 产品 |
| 单据形态 | 入 / 出 / 移 / 盘 4 类（共 8 张表） | 10+ 类（采购入库、销售出库、生产领退料、外协…） | 采购订单 → 入库 / 退货、销售订单 → 出库 / 退货等 |
| 库存事务 | **统一服务**（`changeInventory` / `checkInventory`） | 库存事务 + 虚拟线边库 + 主子表批次拆分 | 直接在各单据 Service 内变更 |
| 上下游 | 不联动 | 关联工序 / 工单 / 质检 / 设备 | 关联供应商付款 / 客户收款 |
| 适合企业 | 仅需"管库存进出"的中小仓储 | 离散制造业全链路落地 | 销售型企业（电商 / 零售 等） |
## # 2. 模块能力地图
### # 2.1 WMS
只做仓储管理，3 大块：
- **基础数据**：仓库、商品（含 SKU / 分类 / 品牌）、往来企业（供应商 / 客户）。
- **库存台账**：库存记录 + 库存流水 + 库存事务。
- **业务单据**：入库（采购 / 生产 / 退货 / 归还）、出库（销售 / 退货 / 生产）、移库（仓间转移）、盘库（差异调整）。
**不涉及**：采购订单 / 销售订单 / 应收应付 / 财务结算 / 生产工单 / 工序工艺 / 质检 / 设备 / 工具 / 排班；也**不涉及**库区库位、批次、生产日期、过期日期、SN 一物一码（详见 [《功能开启》](/wms/build/)）。
详见 [《WMS 演示》](/wms-preview/)。
### # 2.2 MES
制造执行系统，覆盖 7 大模块：
- **基础数据**：物料、客户 / 供应商、车间、工作站、编码规则。
- **生产管理**：工序、工艺、工单、排产、报工、安灯。
- **仓库管理**（最重）：62 张表。仓库 → 库区 → 库位三级结构、批次管理、SN 码、虚拟线边库、到货通知、采购入库 / 退货、生产领退料 / 物料消耗、产品产出 / 入库、销售发货 / 出库 / 退货、外协发料 / 入库、调拨装箱、盘点等。
- **质量管理**：IQC / IPQC / OQC / RQC 四类质检 + 检测项 + 缺陷管理。
- **设备管理**：设备台账、点检保养、维修单。
- **工具管理**：工装夹具台账。
- **排班管理**：班组、排班计划、排班日历。
详见 [《MES 手册》](/mes-preview/)。
### # 2.3 ERP
企业资源计划，5 大模块：
- **产品管理**：产品信息、分类、单位。
- **采购管理**：采购订单 → 采购入库 / 退货。
- **销售管理**：销售订单 → 销售出库 / 退货。
- **库存管理**：产品库存、库存明细、其它入 / 出库、库存调拨、库存盘点。
- **财务管理**：采购付款、销售收款。
详见 [《ERP 手册》](/erp-preview)。
## # 3. 选型建议
简单分流：
- **只管库存进出**（仓储型公司、电商仓、生产辅料仓）→ **WMS**。开箱可用，结构最轻。
- **需要采购订单 / 销售订单 / 应收应付 / 财务对账**（销售型企业，如电商 / 零售）→ **ERP**。WMS 不带这套。
- **离散制造业上下游全链路**（带工艺、工单、报工、质检、设备）→ **MES**。覆盖最广，但学习成本最高。
边界场景：
- **既要 WMS 的轻量仓储 + ERP 的销售订单链路**：当前 yudao 没提供"WMS + ERP 联动包"。临时方案是各开各的模块，业务系统内手动同步主数据；后续如有官方联动需求请提 Issue。
- **需要批次 / 库位 / SN 一物一码**：当前 WMS **不支持**，请评估是否切换到 MES（MES 仓库管理模块原生支持）。
- **库存口径要"按月 / 按品类"做财务结算**：WMS 库存流水保留单价 + 金额字段（每笔变更都记），但**不提供**结算报表。需要的话可基于 `wms_inventory_history` 自建报表，或切换到 ERP。
## # 4. 库存模型对比
三者库存的核心维度差异最大，单独对比一下。
### # 4.1 维度与能力
| 维度 | WMS | MES | ERP |
| --- | --- | --- | --- |
| 聚合粒度 | `仓库 + SKU` | `仓库 + 库区 + 库位 + 物料 + 批次` | `仓库 + 产品` |
| 物料抽象 | 商品 + SKU 两级（SKU 含尺寸/重量/价格） | 物料 + 批次属性 +（库位、SN）等多维 | 产品（单级，无 SKU） |
| 明细 / 拆分表 | 不支持 | 有 `mes_wm_material_stock_detail`（5 维拆分） | 不支持 |
| 虚拟仓 | 不支持 | 内置 `WIP_VIRTUAL_WAREHOUSE` 线边库 | 不支持 |
| SN 序列号 | **不支持** | 支持（按批次批量生成、可分组管理 / 导出） | **不支持** |
| 批次属性 | **不支持** | 支持生产日期、过期日期、到期提醒 | **不支持** |
| 写入路径 | 统一服务 2 个核心方法 | 事务服务（细分类型：外协、生产消耗、归还等） | `ErpStockRecordService` 由各单据 Service 直接调用 |
| 出入两阶段 | 草稿 → 已完成 / 已作废 | 多状态（草稿 → 待上架 → 待执行入库 → 已完成 等） | **无两阶段**，单据直接出入 |
如果业务确实需要批次 / 库位 / SN 这套精细化库存管理，建议**直接选 MES**，不要在 WMS / ERP 上自行扩展。
### # 4.2 相关表映射
按角色对齐 WMS / MES / ERP 同类表，便于跨模块迁移时一一对照：
| 角色 / 概念 | WMS | MES | ERP |
| --- | --- | --- | --- |
| 库存主表 | `wms_inventory` | `mes_wm_material_stock` | `erp_stock` |
| 库存流水 | `wms_inventory_history` | `mes_wm_transaction` | `erp_stock_record` |
| 仓库 | `wms_warehouse` | `mes_wm_warehouse`（+ `_area` + `_location` 三级） | `erp_warehouse` |
| 物料 / 商品 | `wms_item` + `wms_item_sku` | `mes_md_item`（+ `mes_wm_batch` 等扩展） | `erp_product` |
| 商品分类 | `wms_item_category` | `mes_md_item_type` | `erp_product_category` |
| 商品品牌 | `wms_item_brand` | —（无独立品牌维度） | — |
| 供应商 | `wms_merchant`（`type = 2 / 3`） | `mes_md_vendor` | `erp_supplier` |
| 客户 | `wms_merchant`（`type = 1 / 3`） | `mes_md_client` | `erp_customer` |
| 入库单 | `wms_receipt_order` + `_detail` | `mes_wm_item_receipt` + `_line` + `_detail` | `erp_stock_in` + `_item` / `erp_purchase_in*` |
| 出库单 | `wms_shipment_order` + `_detail` | （销售出库 / 生产消耗 等多张单据） | `erp_stock_out` + `_item` / `erp_sale_out*` |
| 移库 / 调拨 | `wms_movement_order` + `_detail` | `mes_wm_transfer` | `erp_stock_move` + `_item` |
| 盘库 | `wms_check_order` + `_detail` | `mes_wm_stock_taking_plan` + `_task` + 多张子表 | `erp_stock_check` + `_item` |
WMS 的"往来企业"是一表两用（`wms_merchant` 通过 `type` 区分客户 / 供应商），MES 和 ERP 都是**客户、供应商分两张表**。如果业务里"客户/供应商"经常重叠（如外协厂商），WMS 的设计更省事。
### # 4.3 MES / ERP 的扩展能力
WMS 聚焦"管库存进出"，以下能力 WMS **不涉及**，从 WMS 切换到 MES / ERP 即可获得：
| 能力 | MES（仓储 / 制造侧） | ERP（销售 / 采购 / 财务侧） |
| --- | --- | --- |
| 三级仓库（库区 / 库位） | `mes_wm_warehouse_area` + `mes_wm_warehouse_location` | — |
| 批次（生产日期 / 过期日期 / 提醒） | `mes_wm_batch` + `mes_md_item_batch_config` | — |
| SN 一物一码 | `mes_wm_sn` | — |
| 条码赋码 | `mes_wm_barcode` + `mes_wm_barcode_config` | — |
| 到货 / 发货通知（预约） | `mes_wm_arrival_notice*` + `mes_wm_sales_notice*` | —（采购 / 销售订单直串入 / 出库） |
| 上架明细（按库位 PutAway） | `mes_wm_item_receipt_detail` | — |
| 装箱管理 | `mes_wm_package` + `_line` | — |
| 生产领退料 / 物料消耗 | `mes_wm_item_consume*` + `mes_wm_product_issue*` | — |
| 产品产出 / 入库 | `mes_wm_product_produce*` + `mes_wm_product_receipt*` | — |
| 外协发料 / 入库 | `mes_wm_outsource_issue*` + `mes_wm_outsource_receipt*` | — |
| 退货系列 | `mes_wm_return_issue*` / `_sales*` / `_vendor*` | `erp_purchase_return` + `_items` / `erp_sale_return` + `_items` |
| 编码规则（自动编号） | `mes_md_auto_code_rule` / `_part` / `_record` | — |
| BOM / SIP / SOP | `mes_md_product_bom` / `_sip` / `_sop` | — |
| 计量单位 | `mes_md_unit_measure` | `erp_product_unit` |
| 采购订单链 | —（依赖到货通知串联） | `erp_purchase_order` + `_items` → `erp_purchase_in` + `_items` |
| 销售订单链 | —（依赖发货通知串联） | `erp_sale_order` + `_items` → `erp_sale_out` + `_items` |
| 财务付款（采购） | — | `erp_finance_payment` + `_item` |
| 财务收款（销售） | — | `erp_finance_receipt` + `_item` |
| 资金账户 | — | `erp_account` |
MES 仓储域共 **62 张表**，本表只列与 WMS 形成直接对比的关键扩展能力；质量管理 `mes_qc_*`、设备管理 `mes_dv_*`、生产 / 工艺 / 工单 `mes_pro_*`、排班 `mes_cal_*` 与"库存"无直接耦合，不在本表展开（详见 [§2.2 MES](#_2-2-mes)）。
## # 5. 落地步骤参考
- 选 WMS：参考 [《功能开启》](/wms/build/)，3 分钟开起来；后续按 [《WMS 演示》](/wms-preview/) 的 5 节表结构按需读模块文档。
- 选 MES：参考 [《MES 手册 —— 功能开启》](/mes/build/)。
- 选 ERP：参考 [《ERP 手册 —— 功能开启》](/erp/build/)。