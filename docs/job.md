# 定时任务

定时任务的使用场景主要如下：
- 时间驱动处理场景：每分钟扫描超时支付的订单，活动状态刷新，整点发送优惠券。
- 批量处理数据：按月批量统计报表数据，批量更新短信状态，实时性要求不高。
年度最佳定时任务：每个月初的工资单的推送！！！
如果你对定时任务了解不多，可以后续阅读 [《芋道 Spring Boot 定时任务入门》](http://www.iocoder.cn/Spring-Boot/Job/?yudao) 文章。
项目基于 Quartz + MySQL 实现分布式定时任务，并提供 [基础设施 -> 定时任务] 菜单，进行定时任务的统一管理，支持动态控制任务的添加、修改、开启、暂停、删除、执行一次等操作。
![定时任务](/images/01.png) 
- [`yudao-spring-boot-starter-job`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-job/) 技术组件：基于 Quartz 框架的封装，提供简便的 [JobHandler](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-job/src/main/java/cn/iocoder/yudao/framework/quartz/core/handler/JobHandler.java) 接入，任务的执行、重试，执行日志的记录。
- `yudao-module-infra` 的 [`job`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-infra/src/main/java/cn/iocoder/yudao/module/infra/service/job/) 业务模块，提供任务的动态管理，执行日志的存储。
## # 1. 如何开启？
① 导入 `sql` 目录下，对应数据库的 `quartz.sql` 文件，初始化 Quartz 表结构。如下图所示：
![导入数据库](/images/img_8eb8542e.png) ② 在 [`application-local.yaml`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/src/main/resources/application-local.yaml#L66-L93) 配置文件中，通过 `spring.quartz` 配置项，设置 Quartz 使用 MySQL 实现集群。如下图所示：
![配置文件](/images/02.png) 考虑到 `local` 本地和 `dev` 测试环境使用相同的数据库，如果 `local` 也跑定时任务，可能会影响 `dev` 测试环境的执行。所以默认配置下，`local` 禁用了定时任务。
重要！！！如果你要开启 `local` 的定时任务，可以删除 `- org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration` 那一行即可开启。
③ 启动项目后，调用 JobController 提供的 `#syncJob()` 接口，将 `infra_job` 表的任务同步到 Quartz 中。如下图所示：
图片纠错：最新版本不区分 yudao-module-infra-api 和 yudao-module-infra-biz 子模块，代码直接合并到 yudao-module-infra 模块的 src 目录下，更适合单体项目
![同步任务](/images/img_54ab8176.png) 
## # 2. 实战案例
以用户 Session 超时的定时任务举例子，讲解在项目中使用定时任务。
### # 2.1 引入依赖
在 `yudao-module-system` 模块中，引入 `yudao-spring-boot-starter-job` 技术组件。如下所示：
cn.iocoder.boot
yudao-spring-boot-starter-job
### # 2.2 编写 Job 类
每个 `yudao-module-xxx` 模块的 `job` 包，用于定义定时任务的 Job 类。
因此，在 `yudao-module-system` 模块的 `job` 包下，创建 UserSessionTimeoutJob 类，实现 [JobHandler](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-job/src/main/java/cn/iocoder/yudao/framework/quartz/core/handler/JobHandler.java#L8) 接口，执行用户 Session 超时 Job。如下图所示：
![UserSessionTimeoutJob 类](/images/03.png) 疑问：为什么添加 @TenantJob 注解？
声明 [`@TenantJob`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/job/TenantJob.java) 注解在 Job 类上，实现**并行**遍历每个租户，执行定时任务的逻辑。
更多多租户的内容，可见 [《开发指南 —— SaaS 多租户》](https://doc.iocoder.cn/saas-tenant/) 文档。
### # 2.3 配置任务
① 点击 [新增] 按钮，填写定时任务 UserSessionTimeoutJob 的信息。如下图所示：
![新建任务](/images/04.png) 
- 处理器的名字：对应的 Spring Bean 名字。例如说 UserSessionTimeoutJob 对应 userSessionTimeoutJob
- Cron 表达式：执行周期，可通过 [生成表达式] 功能，进行生成 ![新建任务](/images/08.png) 重试次数、重试间隔：执行失败后，立即重试的次数以及重试的间隔时间
- 超时时间监控：执行超过该时间后，发送告警邮件给开发【暂不支持，未来实现】
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