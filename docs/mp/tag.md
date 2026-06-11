# 公众号标签

本章节，讲解公众号标签的相关内容，支持对标签进行创建、查询、修改、删除等操作，也可以对用户进行打标签、取消标签等操作，对应 [《微信公众号官方文档 —— 用户标签管理》](https://developers.weixin.qq.com/doc/offiaccount/User_Management/User_Tag_Management.html) 文档。
![标签管理](../images/img_f77ad9a9.png) 
## # 1. 表结构
公众号粉丝对应 `mp_tag` 表，结构如下图所示：
![表结构](../images/img_3dfe2f1c.png) 而给用户打上标签后，存储在 `mp_user` 表的 `tag_ids` 字段中（多个标签之间用 `,` 分隔），不单独存储关联表。
## # 2. 标签管理界面
- 前端：[/@views/mp/tag](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/mp/tag/index.vue)
- 后端：[MpTagController](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-mp/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/tag/MpTagController.java)
## # 3. 同步标签
点击标签管理界面的【同步】按钮，可以从公众号同步所有的标签信息，存储到 `mp_tag` 表中。
对应后端的 [MpTagServiceImpl](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-mp/src/main/java/cn/iocoder/yudao/module/mp/service/tag/MpTagServiceImpl.java#L124-L157) 的 `syncTag` 方法。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[公众号粉丝](/mp/user/) [公众号消息](/mp/message/) 
←
[公众号粉丝](/mp/user/) [公众号消息](/mp/message/)→
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