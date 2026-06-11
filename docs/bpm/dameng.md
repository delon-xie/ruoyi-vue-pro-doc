# 工作流（达梦适配）

达梦的适配，分成两种版本，按需使用：
- 如果你是 `master` 分支，参考「1. 适配 `分支`」小节。
- 如果你是 `master-jdk17` 分支，参考「2. 适配 `master-jdk17` 分支」小节。
## # 1. 适配 `master` 分支
友情提示：
本文参考 [《Flowable6.8(6.x 版本通用)整合集成达梦 8 数据库(DM8)详解，解决自动生成表时 dmn 相关表语法报错问题》](https://blog.csdn.net/TangBoBoa/article/details/130392495) 博客，由开发者（微信号 `barry82`）所贡献！
### # 1.1 覆盖 Flowable Liquibase 相关代码
把项目的 `sql/dm/flowable-patch/src` 下的文件，复制到 `yudao-module-bpm` 项目的 `src` 目录中。
### # 1.2 关于 flowable.database-schema-update 配置
① 首次运行，全局搜 `flowable.database-schema-update` 配置项，修改为 `true`，以便生成 Flowable 数据库表。
② 再次运行，全局搜 `flowable.database-schema-update` 配置项，修改为 `false`，避免如下报错：
Object [FLW_EV_DATABASECHANGELOG] already exists
ps：😭 MacBook 从 Intel 平台迁移到 M1 平台，达梦数据库的环境坏了，先暂时把相关的操作写到文档里，算是给大家做适配一个方向！
## # 2. 适配 `master-jdk17` 分支
如果你是 `master-jdk17` 分支，需要额外参考 [https://t.zsxq.com/sXvQ8](https://t.zsxq.com/sXvQ8) 文档，保持耐心~
另外，也可以直接合并 [https://gitee.com/zhijiantianya/ruoyi-vue-pro/tree/master-dm8-jdk17](https://gitee.com/zhijiantianya/ruoyi-vue-pro/tree/master-dm8-jdk17) 分支，已经验证过。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[功能开启](/bpm/) [审批接入（流程表单）](/bpm/use-bpm-form/) 
←
[功能开启](/bpm/) [审批接入（流程表单）](/bpm/use-bpm-form/)→
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