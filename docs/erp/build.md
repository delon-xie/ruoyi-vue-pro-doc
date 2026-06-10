# 功能开启

进度说明：
- 管理后台，请使用 [https://gitee.com/yudaocode/yudao-ui-admin-vue3 (opens new window)](https://gitee.com/yudaocode/yudao-ui-admin-vue3) 仓库的 `master` 分支
- 后端项目，请使用 [https://gitee.com/zhijiantianya/ruoyi-vue-pro (opens new window)](https://gitee.com/zhijiantianya/ruoyi-vue-pro) 仓库的 `master`（JDK8） 或 `master-jdk17`（JDK17//21） 分支
ERP 系统，后端由 `yudao-module-erp` 模块实现，前端由 `yudao-ui-admin-vue3` 的 `erp` 目录实现。
考虑到编译速度，默认 `yudao-module-erp` 模块是关闭的，需要手动开启。步骤如下：
- 第一步，开启 `yudao-module-erp` 模块
- 第二步，导入 ERP 系统的 SQL 数据库脚本
- 第三步，重启后端项目，确认功能是否生效
## # 1. 第一步，开启模块
① 修改根目录的 [`pom.xml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/pom.xml) 文件，取消 `yudao-module-erp` 模块的注释。如下图所示：
![取消 模块的注释](../images/img_1261abff.png) ② 修改 `yudao-server` 目录的 [`pom.xml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/pom.xml) 文件，引入 `yudao-module-erp` 模块。如下图所示：
![引入 模块](../images/img_a91e096a.png) ③ 点击 IDEA 右上角的【Reload All Maven Projects】，刷新 Maven 依赖。如下图所示：
![刷新 Maven 依赖](../images/img_feccec72.png) 
## # 2. 第二步，导入 SQL
点击 [`erp-2024-05-03.sql.zip` (opens new window)](https://t.zsxq.com/17iEOp1oE) 下载附件，解压出 SQL 文件，然后导入到数据库中。 如下图所示：
友情提示：↑↑↑ erp.sql 是可以点击下载的！ ↑↑↑
重要说明：该 SQL 仅芋道星球成员可使用和商用，否则视为侵权（索赔 100 万，永久追溯）【下载即视为同意】。
![导入数据库](../images/img_32da36e2.png) 以 `erp_` 作为前缀的表，就是 ERP 模块的表。
## # 3. 第三步，重启项目
重启后端项目，然后访问前端的 ERP 菜单，确认功能是否生效。如下图所示：
![确认功能是否生效](../images/img_6a5934bf.png) 至此，我们就成功开启了 ERP 的功能 🙂
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[ERP 演示](/erp-preview/) [【产品】产品信息、分类、单位](/erp/product/) 
←
[ERP 演示](/erp-preview/) [【产品】产品信息、分类、单位](/erp/product/)→
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