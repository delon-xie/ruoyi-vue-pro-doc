# 【质量】过程检验（IPQC）

过程检验（IPQC，In-Process Quality Control）模块，由 `yudao-module-mes` 后端模块的 `qc.ipqc` 包实现，覆盖生产过程中的质量检验场景——在生产报工后、产品入库前，对产出品进行质量抽检。
IPQC 检验单关联**生产工单和工作站**，创建时系统根据工单产品 + IPQC 类型**自动匹配质检方案**。检验完成后，**若存在来源单据则回写报工单据**，触发产出行的质量状态更新和库存入库；若为独立创建的检验单，则仅更新自身状态为已完成。
本文涉及表如下图所示：
![过程检验模块](../../images/img_1e899114.svg) 
## # 1. 过程检验单（IPQC）
过程检验单，由 MesQcIpqcController 提供接口。
### # 1.1 表结构
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
CREATE TABLE `mes_qc_ipqc` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
`code` varchar(64) NOT NULL COMMENT '检验单编码',
`name` varchar(500) NOT NULL COMMENT '检验单名称',
`type` tinyint NOT NULL COMMENT '检验类型',
`template_id` bigint NOT NULL COMMENT '质检方案ID',
`source_doc_type` int DEFAULT NULL COMMENT '来源单据类型',
`source_doc_id` bigint DEFAULT NULL COMMENT '来源单据ID',
`source_line_id` bigint DEFAULT NULL COMMENT '来源单据行ID',
`source_doc_code` varchar(64) DEFAULT NULL COMMENT '来源单据编码',
`work_order_id` bigint NOT NULL COMMENT '生产工单ID',
`task_id` bigint DEFAULT NULL COMMENT '生产任务ID',
`workstation_id` bigint NOT NULL COMMENT '工作站ID',
`process_id` bigint DEFAULT NULL COMMENT '工序ID',
`item_id` bigint NOT NULL COMMENT '产品ID',
`check_quantity` decimal(14,2) DEFAULT NULL COMMENT '检验数量',
`qualified_quantity` decimal(14,2) DEFAULT '0.00' COMMENT '合格数量',
`unqualified_quantity` decimal(14,2) DEFAULT '0.00' COMMENT '不合格数量',
`labor_scrap_quantity` decimal(14,2) DEFAULT '0.00' COMMENT '人工报废数量',
`material_scrap_quantity` decimal(14,2) DEFAULT '0.00' COMMENT '材料报废数量',
`other_scrap_quantity` decimal(14,2) DEFAULT '0.00' COMMENT '其他报废数量',
`critical_rate` decimal(14,2) DEFAULT '0.00' COMMENT '致命缺陷率',
`major_rate` decimal(14,2) DEFAULT '0.00' COMMENT '严重缺陷率',
`minor_rate` decimal(14,2) DEFAULT '0.00' COMMENT '轻微缺陷率',
`critical_quantity` int DEFAULT '0' COMMENT '致命缺陷数',
`major_quantity` int DEFAULT '0' COMMENT '严重缺陷数',
`minor_quantity` int DEFAULT '0' COMMENT '轻微缺陷数',
`check_result` tinyint DEFAULT NULL COMMENT '检验结果',
`inspect_date` datetime DEFAULT NULL COMMENT '检验日期',
`inspector_user_id` bigint DEFAULT NULL COMMENT '检验员',
`status` tinyint NOT NULL DEFAULT '0' COMMENT '状态',
`remark` varchar(500) DEFAULT NULL COMMENT '备注',
PRIMARY KEY (`id`)
) ENGINE=InnoDB COMMENT='MES 过程检验单';
① `template_id` 关联 `mes_qc_template` 表，**创建时由系统根据工单产品 + IPQC 类型自动匹配**。详见 [《【质量】质检方案》](/mes/qc/template/)。
② `source_doc_type` 为来源单据类型（选填），枚举 MesQcSourceDocTypeEnum（PRO_FEEDBACK=生产报工）。`source_doc_id` 关联报工单，`source_line_id` 关联报工产出行（`mes_wm_product_produce_line`），标识对哪行产出品进行检验。
来源单据整体不是必填项，可以独立创建 IPQC 检验单。当 `source_doc_type` 和 `source_doc_id` 同时非空时，系统会校验来源单据：**`source_line_id` 必须提供**，且对应的产出行必须归属该报工单、质量状态为「待检验」；若 `source_doc_type` 非空但 `source_doc_id` 为空，则视为无来源，不会拦截。如果填写了完整的来源单据，检验完成后会自动回写产出行的质量状态。创建后不可修改来源。
③ `work_order_id` 关联生产工单（必填，详见 [《【生产】生产工单》](/mes/pro/work-order/)）。`workstation_id` 关联工作站（必填，详见 [《【基础】车间设置、工作站设置》](/mes/md/workshop/)）。`task_id` 关联生产任务（选填）。
`process_id` 为工序 ID，**由系统自动推导**：先通过工单产品查询关联的工艺路线，再校验工作站关联的工序是否在该路线中——若匹配则取工作站的工序 ID，若工序不在路线中或产品未配置工艺路线则为 `null`。详见 [《【生产】工序设置、工艺流程》](/mes/pro/process-route/)。
`item_id` 为产品 ID，**由系统从工单自动取 `product_id`**。
④ `check_quantity` 为检验数量。`qualified_quantity`（合格数量）和 `unqualified_quantity`（不合格数量）**由检验员在前端手动填写**，检验完成后随主表一起回写给报工服务。后端强制校验：**`check_quantity` 必须等于 `qualified_quantity + unqualified_quantity`**。
`labor_scrap_quantity`、`material_scrap_quantity`、`other_scrap_quantity` 为不同原因的报废数量，IPQC 完成后回写给报工单。后端强制校验：**三类报废数量之和不能超过不合格品数量**。
⑤ `critical_rate`/`major_rate`/`minor_rate` 和 `critical_quantity`/`major_quantity`/`minor_quantity` 为缺陷统计数据，**由系统根据缺陷记录自动汇总更新**（通过 `recalculateDefectStats` 方法）。
⑥ `check_result` 为检验结果，枚举 MesQcCheckResultEnum（1=通过，2=不通过）。由检验员手动填写。
⑦ `status` 为检验单状态，枚举 MesQcStatusEnum（0=草稿，4=已完成）：
| 状态值 | 枚举名 | 说明 | 可执行操作 |
| --- | --- | --- | --- |
| 0 | DRAFT | 草稿 | 编辑、删除、录入检测结果/缺陷记录、填写检验结论、完成 |
| 4 | FINISHED | 已完成 | — |
状态流转说明
创建 ──→ 草稿(0) ──录入检测结果──→ (按需)录入缺陷记录 ──→ 填写检验结论 ──完成──→ 已完成(4)
├── 有来源单据 → 回写报工单据
└── 无来源单据 → 仅更新自身状态
检测结果、缺陷记录均可在草稿阶段按需维护，缺陷记录不是完成前的必经步骤。
- **创建**（`createIpqc`）：校验工单已确认、工位存在、检验员存在。通过工单产品 + IPQC 类型自动匹配质检方案。校验来源产出行为「待检验」状态。从方案检测项克隆生成检验行。
- **完成**（`finishIpqc`）：校验 `checkResult` 已填写，且至少存在一条检测结果。状态变为「已完成」，随后按来源单据分两种情况处理： **有来源单据**（`sourceDocType` 非空，即从待检任务创建的 IPQC）：**回写报工单据**——将合格数量、不合格数量、各类报废数量回传给报工服务，触发：产出行质量状态更新（待检验 → 合格/不合格）、合格品自动完成产出入库（入虚拟线边库）、报工状态和工单/任务进度更新。
- **无来源单据**（`sourceDocType` 为空，即从 IPQC 菜单独立创建的检验单）：仅更新自身状态为已完成，**不触发任何来源回写**。
该表包含一个子表：
- `mes_qc_ipqc_line`（IPQC 检验行）：由方案自动生成，记录每个检测项的检测方法和标准值/阈值。
### # 1.2 管理后台
对应 [MES 系统 -> 质量管理 -> 过程检验] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/mes/qc/ipqc` 目录。
#### # 列表
支持按检验单编码、检验类型、生产工单、产品物料、检测结果等条件搜索。
![管理后台 - 过程检验列表](../../images/img_e1d79f60.png) 
#### # 新增
IPQC 检验单有两个创建入口，预填行为不同：
- **从待检任务创建**（推荐）：在 [待检任务](/mes/qc/pending-inspect/) 页面点击「过程检验」按钮，系统自动预填来源单据信息（来源类型、来源单据编号）、生产关联（工单、工位、任务）、检测数量、检验日期和检验单名称。预填后，**来源单据区域、生产关联字段（工单、工位、任务）和检测数量均为禁用状态**，不可修改；检验员仍需手动选择**检验类型（`type`）**、检验单编码、检测人员、合格/不合格品数量、检测结果等。
- **从 IPQC 菜单独立创建**：在过程检验列表页点击【新增】按钮，弹出空白新增表单。此时无来源单据信息，需手动填写生产工单（必填）、工作站（必填）、检验类型（必填）、检验单编码、检验单名称、检测人员、检测数量、报废数量、检验日期等。独立创建的 IPQC 完成后不会触发来源回写。
注意：来源单据区域（来源类型、来源编号）仅在有预填来源时显示，且始终为只读禁用状态，不支持用户手动填写。
![管理后台 - 过程检验新增](../../images/img_33a78fa0.png) 
#### # 修改
点击编码链接查看只读详情，点击【编辑】按钮（仅草稿状态可见）进入可编辑的修改表单。表单上方展示基本信息、生产关联、检测情况和缺陷统计（只读汇总），下方通过 `el-divider` 分隔展示两个 Tab 页：**「检验项」和**「检测结果」。缺陷记录不是独立的第三个 Tab，而是在「检验项」Tab 的每一行检验项上提供「缺陷列表」按钮，点击后弹出 `DefectRecordInlineList.vue` 弹窗进行逐行维护。
![管理后台 - 过程检验修改](../../images/img_6296ccfd.png) ★ **检验行**（编辑弹窗下方）：由 `mes_qc_ipqc_line` 表存储，从质检方案自动生成。由 MesQcIpqcLineController 提供接口。
mes_qc_ipqc_line 表结构 CREATE TABLE `mes_qc_ipqc_line` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
`ipqc_id` bigint NOT NULL COMMENT '检验单ID',
`indicator_id` bigint NOT NULL COMMENT '检测项ID',
`tool` varchar(255) DEFAULT NULL COMMENT '检测工具',
`check_method` varchar(500) DEFAULT NULL COMMENT '检测方法',
`standard_value` decimal(14,4) DEFAULT NULL COMMENT '标准值',
`unit_measure_id` bigint DEFAULT NULL COMMENT '计量单位ID',
`max_threshold` decimal(14,4) DEFAULT NULL COMMENT '上限值',
`min_threshold` decimal(14,4) DEFAULT NULL COMMENT '下限值',
`critical_quantity` int DEFAULT '0' COMMENT '致命缺陷数',
`major_quantity` int DEFAULT '0' COMMENT '严重缺陷数',
`minor_quantity` int DEFAULT '0' COMMENT '轻微缺陷数',
`remark` varchar(500) DEFAULT NULL COMMENT '备注',
PRIMARY KEY (`id`)
) ENGINE=InnoDB COMMENT='MES 过程检验行';
① `ipqc_id` 关联主表 `mes_qc_ipqc` 的 `id` 字段。
② `indicator_id` 关联 `mes_qc_indicator` 表的 `id` 字段（详见 [《【质量】检测项设置、常见缺陷》](/mes/qc/base/)）。
其余字段（`tool`、`check_method`、`standard_value`、`unit_measure_id`、`max_threshold`、`min_threshold`）均为**说明性字段**，从质检方案检测项克隆而来（详见 [《【质量】质检方案》](/mes/qc/template/)），后端不参与业务逻辑判定，供检验员在前端页面中参考。
③ `critical_quantity`、`major_quantity`、`minor_quantity` 为该检测项维度的缺陷数统计，**由系统根据缺陷记录自动汇总**。
#### # 检测结果
在编辑弹窗中录入每个检测项的实际检测结果值。检测结果采用“主表 + 明细表”两层存储：**样品头信息**存 `mes_qc_indicator_result` 表（记录样品编号、关联质检单、物料等），**每个检测项的实际检测值**存 `mes_qc_indicator_result_detail` 表（关联检验结果主表和检测项，记录具体检测值）。详见 [《【质量】待检任务、检验结果、缺陷记录》](/mes/qc/pending-inspect/)。
#### # 缺陷记录
在编辑弹窗中记录检验过程中发现的缺陷。选择缺陷类型（来自常见缺陷）、缺陷等级（致命/严重/轻微）、缺陷数量。
缺陷记录变更时，系统通过 MesQcIpqcServiceImpl 的 `recalculateDefectStats` 方法自动按等级汇总缺陷数量和缺陷率到检验行和主表。
#### # 完成
在编辑弹窗中填写检验结论（通过/不通过）后，点击【完成】按钮。系统校验至少存在一条检测结果，状态变为「已完成」。**仅当存在来源单据时**，才会回写报工单据，触发产出入库和进度更新；独立创建的检验单仅更新自身状态，不触发任何来源回写。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[【质量】来料检验（IQC）](/mes/qc/iqc/) [【质量】出货检验（OQC）](/mes/qc/oqc/) 
←
[【质量】来料检验（IQC）](/mes/qc/iqc/) [【质量】出货检验（OQC）](/mes/qc/oqc/)→
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