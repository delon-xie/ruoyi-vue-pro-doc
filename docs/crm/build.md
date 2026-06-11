# 功能开启

进度说明：
- 管理后台，请使用 [https://gitee.com/yudaocode/yudao-ui-admin-vue3](https://gitee.com/yudaocode/yudao-ui-admin-vue3) 仓库的 `master` 分支
- 后端项目，请使用 [https://gitee.com/zhijiantianya/ruoyi-vue-pro](https://gitee.com/zhijiantianya/ruoyi-vue-pro) 仓库的 `master`（JDK8） 或 `master-jdk17`（JDK17//21） 分支
CRM 系统，后端由 `yudao-module-crm` 模块实现，前端由 `yudao-ui-admin-vue3` 的 `crm` 目录实现。
考虑到编译速度，默认 `yudao-module-crm` 模块是关闭的，需要手动开启。步骤如下：
- 第一步，开启 `yudao-module-crm` 模块
- 第二步，导入 CRM 系统的 SQL 数据库脚本
- 第三步，重启后端项目，确认功能是否生效
补充说明：
由于 CRM 合同、回款使用到 BPM 的审批功能，所以你需要先看 [《工作流》](/bpm/) 文档，将工作流开启！
## # 1. 第一步，开启模块
① 修改根目录的 [`pom.xml`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/pom.xml) 文件，取消 `yudao-module-crm` 模块的注释。如下图所示：
![取消 模块的注释](../images/img_1261abff.png) ② 修改 `yudao-server` 目录的 [`pom.xml`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/pom.xml) 文件，引入 `yudao-module-crm` 模块。如下图所示：
![引入 模块](../images/img_a91e096a.png) ③ 点击 IDEA 右上角的【Reload All Maven Projects】，刷新 Maven 依赖。如下图所示：
![刷新 Maven 依赖](../images/img_feccec72.png) 
## # 2. 第二步，导入 SQL
点击 [`crm-2024-09-30.sql.zip`](https://t.zsxq.com/15v3qYyNi) 下载附件，解压出 SQL 文件，然后导入到数据库中。
友情提示：↑↑↑ crm.sql 是可以点击下载的！ ↑↑↑
重要说明：该 SQL 仅芋道星球成员可使用和商用，否则视为侵权（索赔 100 万，永久追溯）【下载即视为同意】。
所以表名字，都使用 `crm_` 作为前缀。
## # 3. 第三步，重启项目
重启后端项目，然后访问前端的 CRM 菜单，确认功能是否生效。如下图所示：
![确认功能是否生效](../images/img_6a5934bf.png) 至此，我们就成功开启了 CRM 的功能 🙂
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[CRM 演示](/crm-preview/) [【线索】线索管理](/crm/clue/) 
←
[CRM 演示](/crm-preview/) [【线索】线索管理](/crm/clue/)→
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