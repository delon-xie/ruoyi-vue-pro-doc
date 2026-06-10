# 【营销】积分商城

积分商城，主要由 `yudao-module-promotion` 后端模块的 `point` 实现，支持纯积分兑换商品、或者积分 + 金额兑换商品。
![表关系](../images/img_0b2f6003.png) 
## # 1. 表结构
一个积分活动，对应一条 `promotion_point_activity` 表记录，对应一个商品 SPU。而每个商品 SKU 在该活动下可以单独配置兑换价格，所以会有多条 `promotion_point_product` 子表记录。
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
CREATE TABLE `promotion_point_activity` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '积分商城活动编号',
`remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
`sort` int NOT NULL COMMENT '排序',
`spu_id` bigint NOT NULL COMMENT '商品 SPU ID',
`status` int NOT NULL COMMENT '活动状态',
`stock` int NOT NULL COMMENT '积分商城活动库存(剩余库存积分兑换时扣减)',
`total_stock` int NOT NULL COMMENT '积分商城活动总库存',
PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='积分商城活动';
① `spu_id` 字段：商品 SPU ID，对应商品 SPU 表的 `id` 字段。
注意：一个积分活动，只能对应一个商品 SPU，不能对应多个商品 SPU！！！
② `status` 字段：活动状态，由 CommonStatusEnum 枚举，只有开启、禁用两个状态。禁用时，无法参与积分兑换。
③ `stock`、`total_stock` 字段：积分商城活动库存，自定义参与积分兑换的数量。目前它是 `promotion_point_product` 表的 `stock` 字段的总和。
CREATE TABLE `promotion_point_product` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '积分商城商品编号',
`activity_id` bigint NOT NULL COMMENT '积分商城活动 id',  
`activity_status` int NOT NULL COMMENT '积分商城商品状态',
`spu_id` bigint NOT NULL COMMENT '商品 SPU 编号',
`sku_id` bigint NOT NULL COMMENT '商品 SKU 编号',
`count` int NOT NULL COMMENT '可兑换次数',
`stock` int NOT NULL COMMENT '积分商城商品库存',
`point` int NOT NULL COMMENT '所需兑换积分',
`price` int NOT NULL COMMENT '所需兑换金额，单位：分',
PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='积分商城商品';
① 【活动信息】`activity_id` 字段：积分商城活动 id，对应 `promotion_point_activity` 表的 `id` 字段。
② 【SKU 信息】`spu_id`、`sku_id` 字段：商品 SPU 编号、商品 SKU 编号。
- `count` 字段：可兑换次数，例如说，每个用户最多兑换 1 次。`stock` 字段：积分商城商品库存。
- `point` 字段：所需兑换积分。`price` 字段：所需兑换金额，单位：分。
如果想要支持纯积分兑换商品，那么 `price` 字段可以设置为 0。
## # 2. 管理后台
对应 [商城系统 -> 营销中心 -> 优惠活动 -> 积分商城] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `src/views/mall/promotion/pointActivity` 目录。如下图所示：
![管理后台](../images/img_6a5934bf.png) ![管理后台](../images/img_fad6cafd.png) 
## # 3. 移动端
① 在 uni-app 的个人中心，点击 [积分商城] 菜单，进入积分商品列表页，对应 `yudao-mall-uniapp` 的 `pages/activity/point/list.vue` 文件。如下图所示：
![积分商品列表](../images/img_34979394.png) ② 点击商品，进入商品详情页，对应 `pages/goods/point.vue` 文件。如下图所示：
![积分商品详情](../images/img_e4e8d1d1.png) ③ 点击 [立即兑换] 按钮，选择商品后，进入确认订单页，如下图所示：
![确认订单](../images/img_36bd1623.png) 点击「提交订单」按钮后，会创建一条 `trade_order` 订单记录：
- `trade_order` 的 `type` 字段为积分商城类型，`point_activity_id` 字段为积分活动编号
- 积分优惠金额的计算，由 TradePointOrderHandler 类实现
- 积分在订单的自定义处理逻辑，由 TradePointActivityPriceCalculator 类实现
后续的逻辑，就是普通订单的流程，就不重复赘述了~
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[【营销】优惠劵](/mall/promotion-coupon/) [【营销】拼团活动](/mall/promotion-combination/) 
←
[【营销】优惠劵](/mall/promotion-coupon/) [【营销】拼团活动](/mall/promotion-combination/)→
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