# SaaS 多租户【字段隔离】

本章节，将介绍多租户的基础知识、以及怎样使用多租户的功能。
相关的视频教程：
- [01、如何实现多租户的 DB 封装？](https://t.zsxq.com/06ufyFAeM)
- [02、如何实现多租户的 Redis 封装？](https://t.zsxq.com/067eQfAQN)
- [03、如何实现多租户的 Web 与 Security 封装？](https://t.zsxq.com/06Nnm6QBE)
- [04、如何实现多租户的 Job 封装？](https://t.zsxq.com/06AYJUR3V)
- [05、如何实现多租户的 MQ 与 Async 封装？](https://t.zsxq.com/06aq3nuNF)
- [06、如何实现多租户的 AOP 与 Util 封装？](https://t.zsxq.com/06vFQVJIe)
- [07、如何实现多租户的管理？](https://t.zsxq.com/063bqRrNZ)
- [08、如何实现多租户的套餐？](https://t.zsxq.com/06rBI66yV)
## # 1. 多租户是什么？
多租户，简单来说是指**一个**业务系统，可以为**多个**组织服务，并且组织之间的数据是**隔离**的。
例如说，在服务上部署了一个 [`ruoyi-vue-pro`](https://github.com/YunaiV/ruoyi-vue-pro) 系统，可以支持多个不同的公司使用。这里的**一个公司就是一个租户**，每个用户必然属于某个租户。因此，用户也只能看见自己租户下面的内容，其它租户的内容对他是不可见的。
## # 2. 数据隔离方案
多租户的数据隔离方案，可以分成分成三种：
1. DATASOURCE 模式：独立数据库
1. SCHEMA 模式：共享数据库，独立 Schema
1. COLUMN 模式：共享数据库，共享 Schema，共享数据表
### # 2.1 DATASOURCE 模式
一个租户一个数据库，这种方案的用户数据隔离级别最高，安全性最好，但成本也高。
![DATASOURCE 模式](/images/img_111c03d7.png) 
- 优点：为不同的租户提供独立的数据库，有助于简化数据模型的扩展设计，满足不同租户的独特需求；如果出现故障，恢复数据比较简单。
- 缺点：增大了数据库的安装数量，随之带来维护成本和购置成本的增加。
### # 2.2 SCHEMA 模式
多个或所有租户共享数据库，但一个租户一个表。
![SCHEMA 模式](/images/img_6e3610b4.png) 
- 优点：为安全性要求较高的租户提供了一定程度的逻辑数据隔离，并不是完全隔离；每个数据库可以支持更多的租户数量。
- 缺点：如果出现故障，数据恢复比较困难，因为恢复数据库将牵扯到其他租户的数据； 如果需要跨租户统计数据，存在一定困难。
### # 2.3 COLUMN 模式
共享数据库，共享数据架构。租户共享同一个数据库、同一个表，但在表中通过 `tenant_id` 字段区分租户的数据。这是共享程度最高、隔离级别最低的模式。
![COLUMN 模式](/images/img_635950b6.png) 
- 优点：维护和购置成本最低，允许每个数据库支持的租户数量最多。
- 缺点：隔离级别最低，安全性最低，需要在设计开发时加大对安全的开发量；数据备份和恢复最困难，需要逐表逐条备份和还原。
### # 2.4 方案选择
![模式选择](/images/img_62d70cce.png) 
- 一般情况下，可以考虑采用 COLUMN 模式，开发、运维简单，以最少的服务器为最多的租户提供服务。
- 租户规模比较大，或者一些租户对安全性要求较高，可以考虑采用 DATASOURCE 模式，当然它也相对复杂的多。
- 不推荐采用 SCHEMA 模式，因为它的优点并不明显，而且它的缺点也很明显，同时对复杂 SQL 支持一般。
提问：项目支持哪些模式？
目前支持最主流的 DATASOURCE 和 COLUMN 两种模式。而 SCHEMA 模式不推荐使用，所以暂时不考虑实现。
考虑到让大家更好的理解 DATASOURCE 和 COLUMN 模式，拆成了两篇文章：
- [《SaaS 多租户【字段隔离】》](/saas-tenant)：讲解 COLUMN 模式
- [《SaaS 多租户【数据库隔离】》](/saas-tenant/dynamic)：讲解 DATASOURCE 模式
## # 3. 多租户的开关
系统有两个配置项，设置为 `true` 时开启多租户，设置为 `false` 时关闭多租户。
注意，两者需要保持一致，否则会报错！
配置项 说明 配置文件 `yudao.server.tenant` 后端开关 ![示例](/images/01.png) `VUE_APP_TENANT_ENABLE` 前端开关 ![示例](/images/02.png) 
疑问：为什么要设置两个配置项？
前端登录界面需要使用到多租户的配置项，从后端加载配置项的话，体验会比较差。
## # 4. 多租户的业务功能
多租户主要有两个业务功能：
业务功能 说明 界面 代码 租户管理 配置系统租户，创建对应的租户管理员 ![租户管理](/images/03.png) [后端](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/service/tenant/TenantServiceImpl.java) [前端](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/system/tenant/index.vue) 租户套餐 配置租户套餐，自定每个租户的菜单、操作、按钮的权限 ![租户套餐](/images/04.png) [后端](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/service/tenant/TenantPackageServiceImpl.java) [前端](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/system/tenantPackage/index.vue) 
**下面，我们来新增一个租户，它使用 COLUMN 模式。**
① 点击 [租户管理] 菜单，点击 [新增] 按钮，填写租户的信息。
![新增租户](/images/05.png) ② 点击 [确认] 按钮，完成租户的创建，它会自动创建对应的租户管理员、角色等信息。
![租户的管理员、角色](/images/06.png) ③ 退出系统，登录刚创建的租户。
![登录界面](/images/07.png) 至此，我们已经完成了租户的创建。
疑问：支持绑定多个域名？或者绑定微信小程序吗？
都支持的。输入域名后，回车即可。
如果是微信小程序，可以输入微信小程序的 appId，也是敲回车。更多可见 [《商城手册》](//mall/build) 文档。
## # 5. 多租户的技术组件
技术组件 [`yudao-spring-boot-starter-biz-tenant`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/)，实现透明化的多租户能力，针对 Web、Security、DB、Redis、AOP、Job、MQ、Async 等多个层面进行封装。
### # 5.1 租户上下文
[TenantContextHolder](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/context/TenantContextHolder.java) 是租户上下文，通过 ThreadLocal 实现租户编号的共享与传递。
通过调用 TenantContextHolder 的 `#getTenantId()` **静态**方法，获得当前的租户编号。绝绝绝大多数情况下，并不需要。
### # 5.2 Web 层【重要】
实现可见 [`web`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/web) 包。
默认情况下，前端的每个请求 Header **必须**带上 `tenant-id`，值为租户编号，即 `system_tenant` 表的主键编号。
![请求示例](/images/08.png) 如果不带该请求头，会报“租户的请求未传递，请进行排查”错误提示。
😜 方式一：通过 `yudao.tenant.ignore-urls` 配置项，可以设置哪些 URL 无需带该请求头。例如说：
![ 配置项](/images/09.png) 😆 方式二：【推荐】在 Controller 方法上，使用 `@TenantIgnore` 注解，忽略该方法的租户校验。例如说：
// TenantController.java
@GetMapping("/get-id-by-name")
@TenantIgnore //  getTenantIdByName(@RequestParam("name") String name) {
// ...
}
### # 5.3 Security 层
实现可见 [`security`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/security) 包。
主要是校验登录的用户，校验是否有权限访问该租户，避免越权问题。
### # 5.4 DB 层【重要】
实现可见 [`db`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/db) 包。
COLUMN 模式，基于 MyBatis Plus 自带的[多租户](https://baomidou.com/plugins/tenant/)功能实现。
核心：每次对数据库操作时，它会**自动**拼接 `WHERE tenant_id = ?` 条件来进行租户的过滤，并且基本支持所有的 SQL 场景。
如下是具体方式：
① **需要**开启多租户的表，必须添加 `tenant_id` 字段。例如说 `system_users`、`system_role` 等表。
CREATE TABLE `system_role` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
`name` varchar(30) CHARACTER NOT NULL COMMENT '角色名称',
`tenant_id` bigint NOT NULL DEFAULT '0' COMMENT '租户编号',
PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 COMMENT='角色信息表';
并且该表对应的 DO 需要使用到 `tenantId` 属性时，建议继承 [TenantBaseDO](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/db/TenantBaseDO.java) 类。
② **无需**开启多租户的表，需要添加表名到 `yudao.tenant.ignore-tables` 配置项目。例如说：
![ 配置项](/images/10.png) 如果不配置的话，MyBatis Plus 会自动拼接 `WHERE tenant_id = ?` 条件，导致报 `tenant_id` 字段不存在的错误。
友情提示：MyBatis Plus 的多租户方案，在我们在 MyBatis XML 手写 SQL 时，是不生效的，即不会拼接 `tenant_id` 字段！！！
解决方案：需要手动自己拼接，可见 `ErpPurchaseStatisticsMapper.xml` 案例，如下所示：
tenant_id = ${@cn.iocoder.yudao.framework.tenant.core.context.TenantContextHolder@getRequiredTenantId()}
- 其中，后面 `${@...}` 一串，是 MyBatis 调用静态方法的方式，即使用 TenantContextHolder 的 `#getRequiredTenantId()` 方法，获得当前的租户编号。
补充说明：后续和球友沟通下来，部分简单 SQL 情况下，MyBatis Plus 还是会拼接。可见 [https://t.zsxq.com/O8ys4](https://t.zsxq.com/O8ys4) 帖子，欢迎讨论！
③ 另外，**无需**开启多租户的表，也可以通过在 DO 实体类上，添加 `@TenantIgnore` 注解，忽略该表的租户过滤。例如说：
@TableName("system_dict_data")
@TenantIgnore // 
### # 5.5 Redis 层【重要】
实现可见 [`redis`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/redis) 包。
由于 Redis 不同于 DB 有 `tenant_id` 字段，无法通过类似 `WHERE tenant_id` = ? 的方式过滤，所以需要通过在 Redis Key 上增加 `:t{tenantId}` 后缀的方式，进行租户之间的隔离。
例如说，假设 Redis Key 是 `user:%d`，示例是 `user:1024`；对应到多租户 1 的 Redis Key 是 `user:t1:1024`。
为什么 Redis Key 要多租户隔离呢？
- ① 在使用 DATASOURCE 模式时，不同库的相同表的 id 可能相同，例如说 A 库的用户，和 B 库的用户都是 1024，直接缓存会存在 Redis Key 的冲突。
- ② 在所有模式下，跨租户可能存在相同的需要唯一的数据，例如说用户的手机号，直接缓存会存在 Redis Key 的冲突。
#### # 使用方式一：基于 Spring Cache + Redis【推荐】
只需要一步，在方法上添加 Spring Cache 注解，例如说 `@Cachable`、`@CachePut`、`@CacheEvict`。
具体的实现原理，可见 [TenantRedisCacheManager](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/redis/TenantRedisCacheManager.java) 的源码。
注意！！！默认配置下，Spring Cache 都开启 Redis Key 的多租户隔离。如果不需要，可以将 Key 添加到 `yudao.tenant.ignore-caches` 配置项中。如下图所示：
![ 配置项](/images/img_a3cf5da4.png) 
#### # 使用方式二：基于 RedisTemplate + TenantRedisKeyDefine
暂时没有合适的封装，需要在自己 format Redis Key 的时候，手动将 `:t{tenantId}` 后缀拼接上。
这也是为什么，我推荐你使用 Spring Cache + Redis 的原因！
### # 5.6 AOP【重要】
实现可见 [`aop`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/aop) 包。
① 声明 [`@TenantIgnore`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/aop/TenantIgnore.java) 注解在方法上，标记指定方法不进行租户的自动过滤，避免**自动**拼接 `WHERE tenant_id = ?` 条件等等。
例如说：[RoleServiceImpl](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/service/permission/RoleServiceImpl.java) 的 [`#initLocalCache()`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/service/permission/RoleServiceImpl.java#L83-L100) 方法，加载**所有**租户的角色到内存进行缓存，如果不声明 `@TenantIgnore` 注解，会导致租户的自动过滤，只加载了某个租户的角色。
// RoleServiceImpl.java
public class RoleServiceImpl implements RoleService {
@Resource
@Lazy // 注入自己，所以延迟加载
private RoleService self;
@Override
@PostConstruct
@TenantIgnore // 忽略自动多租户，全局初始化缓存
public void initLocalCache() {
// ... 从数据库中，加载角色
}
@Scheduled(fixedDelay = SCHEDULER_PERIOD, initialDelay = SCHEDULER_PERIOD)
public void schedulePeriodicRefresh() {
self.initLocalCache(); //  通过 self 引用到 Spring 代理对象
}
}
有一点要格外注意，由于 `@TenantIgnore` 注解是基于 Spring AOP 实现，如果是**方法内部的调用**，避免使用 `this` 导致不生效，可以采用上述示例的 `` 处的 `self` 方式。
② 使用 [TenantUtils](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/util/TenantUtils.java) 的 `#execute(Long tenantId, Runnable runnable)` 方法，模拟指定租户( `tenantId` )，执行某段业务逻辑( `runnable` )。
例如说：在 [TenantServiceImpl](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/service/tenant/TenantServiceImpl.java) 的 `#createTenant(...)` 方法，在创建完租户时，需要模拟该租户，进行用户和角色的创建。如下图所示：
![TenantUtils 模拟租户](/images/11.png) 
### # 5.7 Job【重要】
实现可见 [`job`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/job) 包。
声明 [`@TenantJob`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/job/TenantJob.java) 注解在 Job 方法上，实现**并行**遍历每个租户，执行定时任务的逻辑。
### # 5.8 MQ
实现可见 [`mq`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-tenant/src/main/java/cn/iocoder/yudao/framework/tenant/core/mq) 包。
通过租户对 MQ 层面的封装，实现租户上下文，可以继续传递到 MQ 消费的逻辑中，避免丢失的问题。实现原理是：
- 发送消息时，MQ 会将租户上下文的租户编号，记录到 Message 消息头 `tenant-id` 上。
- 消费消息时，MQ 会将 Message 消息头 `tenant-id`，设置到租户上下文的租户编号。
### # 5.9 Async
实现可见 [`YudaoAsyncAutoConfiguration`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-job/src/main/java/cn/iocoder/yudao/framework/quartz/config/YudaoAsyncAutoConfiguration.java) 类。
通过使用阿里开源的 [TransmittableThreadLocal](https://github.com/alibaba/transmittable-thread-local) 组件，实现 Spring Async 执行异步逻辑时，租户上下文可以继续传递，避免丢失的问题。
## # 6. 租户独立域名
在我们使用 SaaS 云产品的时候，每个租户会拥有 **独立的子域名**，例如说：租户 A 对应 `a.iocoder.cn`，租户 B 对应 `b.iocoder.cn`。
目前管理后台已经提供类似的能力，更多大家可以基于它去拓展。实现方式：
1. 在 `system_tenant` 表里，有个 `website` 字段为该租户的独立域名，你可以填写你希望分配给它的子域名。
1. 在 Nginx 上做 **泛域名解析** 到你的前端项目，例如说 Nginx 的 `server_name` `*.iocoder.cn` 解析到 Vue3 管理后台。
这样用户在访问管理后台的登录界面，会自动根据当前访问域名的 `host`，向后端获得对应的 `tenant-id` 编号，后续请求都带上它！
ps：商城 uniapp 暂时还没做，感兴趣可以 pull request 贡献下噢！
## # 7. 租户切换
① 拥有 `system:tenant:visit` 权限的用户，支持切换租户，从而查看和操作其它租户的数据。如下图所示：
![切换租户](/images/img_33f1833b.png) `system:tenant:visit` 权限的分配，可以在角色管理时，分配 [系统管理 -> 租户管理 -> 租户切换] 权限。
② 注意：如果你的 HTTP 接口是查询个人相关的信息，不能进行租户的切换，例如说：登录用户的个人信息等。此时，`yudao.tenant.ignore-urls` 配置项进行添加。
yudao:
tenant:
ignore-urls:
- /admin-api/system/user/profile/**
- /admin-api/system/auth/**
③ 如果你要拓展这块的实现，最好阅读如下代码：
- 前端：[https://gitee.com/yudaocode/yudao-ui-admin-vue3/commit/c6898c0a99b00fb08863295d7fb1adb06cf66113](https://gitee.com/yudaocode/yudao-ui-admin-vue3/commit/c6898c0a99b00fb08863295d7fb1adb06cf66113)
- Boot 后端：[https://gitee.com/zhijiantianya/ruoyi-vue-pro/commit/59234e1eeade300a68adc8183d58f616c14e90f1](https://gitee.com/zhijiantianya/ruoyi-vue-pro/commit/59234e1eeade300a68adc8183d58f616c14e90f1)
- Cloud 后端：[https://gitee.com/zhijiantianya/yudao-cloud/commit/a07963335549da0e49f13c98cb79adc11df1524b](https://gitee.com/zhijiantianya/yudao-cloud/commit/a07963335549da0e49f13c98cb79adc11df1524b)
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[OAuth 2.0（SSO 单点登录)](/oauth2/) [SaaS 多租户【数据库隔离】](/saas-tenant/dynamic/) 
←
[OAuth 2.0（SSO 单点登录)](/oauth2/) [SaaS 多租户【数据库隔离】](/saas-tenant/dynamic/)→
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