# 商城演示

## # 1. 演示地址
### # 1.1 商城移动端
- 演示地址：[http://mall.yudao.iocoder.cn/ (opens new window)](http://mall.yudao.iocoder.cn/)
- 账号：可使用账号 15601691300，验证码 9999 进行登录
- 仓库：[https://github.com/yudaocode/yudao-mall-uniapp (opens new window)](https://github.com/yudaocode/yudao-mall-uniapp) 仓库，目前是基于 Vue3 + uni-app 实现
### # 1.2 商城管理后台
- 演示地址：[http://dashboard-vue3.yudao.iocoder.cn/ (opens new window)](http://dashboard-vue3.yudao.iocoder.cn/)
- 菜单：「会员中心」「商品中心」「订单中心」「营销中心」「统计中心」「支付中心」
- 仓库：[https://github.com/yudaocode/yudao-ui-admin-vue3 (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3)，基于 Vue3 + Element Plus 实现
### # 1.3 商城后端
支持 Spring Boot 单体、Spring Cloud 微服务架构
- 单体仓库： [https://github.com/YunaiV/ruoyi-vue-pro (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro)
- 微服务仓库： [https://github.com/YunaiV/yudao-cloud (opens new window)](https://github.com/YunaiV/yudao-cloud)
## # 2. 商城启动
参见 [《商城手册 —— 功能开启》](/mall/build/) 文档，一般 3 分钟就可以启动完成。
## # 3. 商城交流
专属交流社区，欢迎扫码加入。
![交流群](/images/zsxq_mall.png) 
## # 4. 功能概述
主要分为 4 个核心模块（商品、订单、营销、统计）、2 个基础模块（会员、支付）。
目前已经比较完善，可以支持一整套电商流程，不少公司已经在生产中使用。
![订单流程](/images/img_05b3edae.png) 
### # 4.1 商城管理后台
![商城管理后台](/images/img_ec18c3c0.png) 
### # 4.2 商城移动端
![商城移动端](/images/img_92d70b2e.png) 
## # 5. 表结构
商城一共有 **70+** 张表，具备一定的业务复杂度，对提升技术能力会有不错的帮助，平时做项目也可以参考参考。
### # 5.1 商品模块（中心）
以 `product_` 作为前缀的表，表结构如下：
![商品表](/images/img_68a97bf6.png) 可学习文档：
- [《【商品】商品分类》](/mall/product-category/)
- [《【商品】商品属性》](/mall/product-property/)
- [《【商品】商品 SPU 与 SKU》](/mall/product-spu-sku/)
- [《【商品】商品评价》](/mall/product-comment/)
### # 5.2 交易模块（中心）
以 `trade_` 作为前缀的表，表结构如下：
![交易表](/images/img_912b5a02.png) 可学习文档：
- [《【交易】购物车》](/mall/trade-cart/)
- [《【交易】商品订单》](/mall/trade-order/)
- [《【交易】售后退款》](/mall/trade-aftersale/)
- [《【交易】快递发货》](/mall/trade-delivery-express/)
- [《【交易】门店自提》](/mall/trade-delivery-pickup/)
- [《【交易】分销返佣》](/mall/trade-brokerage/)
### # 5.3 营销模块（中心）
以 `promotion_` 作为前缀的表，表结构如下：
![营销表](/images/img_eb51ff0c.png) 可学习文档：
- [《店铺装修》](/mall/diy/)
- [《【营销】优惠劵》](/mall/promotion-coupon/)
- [《【营销】积分商城》](/mall/point-activity/)
- [《【营销】拼团活动》](/mall/promotion-combination/)
- [《【营销】秒杀活动》](/mall/seckill-combination/)
- [《【营销】砍价活动》](/mall/seckill-bargain/)
- [《【营销】满减送》](/mall/promotion-record/)
- [《【营销】限时折扣》](/mall/promotion-discount/)
- [《【营销】内容管理》](/mall/promotion-content/)
### # 5.4 统计模块（中心）
以 `_statistics` 作为后缀的表，表结构如下：
![统计表](/images/img_f25c8aaa.png) 
- [《【统计】会员、商品、交易统计》](/mall/statistics/)
### # 5.5 会员模块（中心）
以 `member_` 作为前缀的表，表结构如下：
![会员表](/images/img_150b7403.png) 
### # 5.6 支付模块（中心）
以 `pay_` 作为前缀的表，表结构如下：
![支付表](/images/img_02ff45cd.png) 
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[会员等级、积分、签到](/member/level/) [功能开启](/mall/build/) 
←
[会员等级、积分、签到](/member/level/) [功能开启](/mall/build/)→
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