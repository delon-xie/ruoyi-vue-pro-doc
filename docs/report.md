# 报表设计器

数据可视化，一般可以通过报表设计器、或者大屏设计器来实现。本小节，我们来讲解报表设计器的功能开启。
报表设计器，指的是使用 Web 版设计器，通过类似于 Excel 操作风格，通过拖拽完成报表设计。如下图所示：
![报表设计器](/images/img_b3ca8edb.gif) 在项目中，通过集成市面上的报表引擎，实现了报表设计器的能力。目前使用如下：
|  | 是否集成 | 是否开源 |
| --- | --- | --- |
| [JimuReport (opens new window)](https://github.com/jeecgboot/JimuReport) | 已集成 | 不开源 |
| [AJ-Report (opens new window)](https://gitee.com/anji-plus/report) | 集成中 | 开源 |
| [UReport2 (opens new window)](https://github.com/youseries/ureport) | 不集成 | 开源 |
为什么不使用 UReport2 报表引擎呢？
UReport2 基本处于不维护的状态，最后发版时间是 2018 年！
## # 1. 功能开启
`yudao-module-report` 实现了报表设计器的能力，考虑到编译速度，默认是关闭的。开启步骤如下：
- 第一步，开启 `yudao-report-report` 模块
- 第二步，导入报表的 SQL 数据库脚本
- 第三步，启动后端项目，确认功能是否生效
- 第四步，启动报表设计器的前端项目
### # 1.1 第一步，开启模块
① 修改根目录的 [`pom.xml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/pom.xml) 文件，取消 `yudao-module-report` 模块的注释。
![引入 模块](/images/img_1261abff.png) ② 修改 `yudao-server` 目录的 [`pom.xml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/pom.xml) 文件，引入 `yudao-module-report` 模块。如下图所示：
![引入 依赖](/images/img_a91e096a.png) ③ 点击 IDEA 右上角的【Reload All Maven Projects】，刷新 Maven 依赖。如下图所示：
![刷新 Maven 依赖](/images/img_feccec72.png) 
### # 1.2 第二步，导入 SQL
下载 [`jimureport.mysql5.7.create.sql` (opens new window)](https://raw.gitcode.com/jeecgboot/jimureport/raw/master/db/jimureport.mysql5.7.create.sql) 脚本，并导入数据库，初始化 JimuReport 相关的表结构和数据。如果你是 Oracle、PostgreSQL 等其它数据库，需要自己使用 Navicat 进行转换。
友情提示：↑↑↑ jimureport.mysql5.7.create.sql 是可以点击下载的！ ↑↑↑
![导入 SQL 脚本](/images/img_32da36e2.png) 
### # 1.3 第三步，启动后端项目
启动后端项目，看到 `"Init JimuReport Config [ 线程池 ] "` 说明开启成功。
### # 1.4 第四步，启动前端项目（AJ-Report）
TODO 开发中，预计 4 月份左右。
### # 1.4 第四步，启动前端项目（JimuReport）
① JimuReport 前端项目内置在后端项目中，无需启动。
② 访问 [报表管理 -> 报表设计器] 菜单，可以查看对应的功能。如下图所示：
![报表设计](/images/img_747f4ae4.png) 可以看到，JimuReport 支持数据报表、图形报表、打印设计等能力。
## # 2. 如何使用？
### # 2.1 AJ-Report 报表设计器
TODO 开发中，预计 4 月份左右。
### # 2.2 JimuReport 报表设计器
可以查看 JimuReport 的官方文档，主要是：
- [快速入门 (opens new window)](http://report.jeecg.com/2075805)
- [操作手册（报表设计器） (opens new window)](https://help.jimureport.com/base/new)
注意，JimuReport 是商业化的产品，分成免费版、商业版，需要关注下它的 [价格 (opens new window)](https://jimureport.com/vip) ！！！
集成 JimuReport 的代码实现？
① 后端：在 [`jmreport` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-module-report/src/main/java/cn/iocoder/yudao/module/report/framework/jmreport) 包下，进行 JimuReport 的集成。
② 前端：在 [`@/views/report/jmreport/index.vue` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/report/jmreport/index.vue) 文件，通过 IFrame 嵌入 JimuReport 界面。
星球里，不错的问题：
- [《我想问下积木报表集成里，官方的 yaml 配置参数维护在哪里呀？》 (opens new window)](https://t.zsxq.com/19s87CV2J)
- [《GoView 使用全局配置设置请求地址为第三方时，出现 404 的 BUG？》 (opens new window)](https://t.zsxq.com/Mg9GM)
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[流程审批通知](/bpm/message/) [大屏设计器](/report/screen/) 
←
[流程审批通知](/bpm/message/) [大屏设计器](/report/screen/)→
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