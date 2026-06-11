# 分布式锁

[`yudao-spring-boot-starter-protection`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-protection/) 技术组件，使用 Redis 实现分布式锁的功能，它有 2 种使用方式：
- 编程式锁：基于 [Redisson](https://github.com/redisson/redisson) 框架提供的[各种](https://github.com/redisson/redisson/wiki/8.-%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81%E5%92%8C%E5%90%8C%E6%AD%A5%E5%99%A8)分布式锁
- 声明式锁：基于 [Lock4j](https://github.com/baomidou/lock4j) 框架的 `@Lock4j` 注解
Redis 分布式锁的实现原理？
参见 [《Redis 实现原理与源码解析系列》](https://www.iocoder.cn/Redis/good-collection/?yudao) 文章。
## # 1. 编程式锁
org.redisson
redisson-spring-boot-starter
### # 1.1 Redisson 配置
无需配置。因为在 [Redis 缓存](/redis-cache) 中，进行了 Spring Data Redis + Redisson 的配置。
### # 1.2 实战案例
`yudao-module-pay` 模块的 [`notify`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-pay/src/main/java/cn/iocoder/yudao/module/pay/service/notify/PayNotifyServiceImpl.java#L155-L174) 功能，使用到分布式锁，确保**每个**支付通知任务有且仅有一个在执行。下面，来看看这个案例是如何实现的。
友情提示：
建议你已经阅读过 [《开发指南 —— Redis 缓存》](/redis-cache) 文档。
① 在 [RedisKeyConstants](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-pay/src/main/java/cn/iocoder/yudao/module/pay/dal/redis/RedisKeyConstants.java) 类中，定义通知任务使用的分布式锁的 Redis Key。如下图所示：
![PAY_NOTIFY_LOCK](/images/01.png) ② 创建 [PayNotifyLockRedisDAO](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-pay/src/main/java/cn/iocoder/yudao/module/pay/dal/redis/notify/PayNotifyLockRedisDAO.java) 类，使用 RedisClient 实现分布式锁的加锁与解锁。如下图所示：
![PayNotifyLockRedisDAO](/images/02.png) ③ 在 [PayNotifyServiceImpl](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-pay/src/main/java/cn/iocoder/yudao/module/pay/service/notify/PayNotifyServiceImpl.java#L155-L174) 执行指定的支付通知任务时，通过 PayNotifyLockRedisDAO 获得分布式锁。如下图所示：
![PayNotifyLockRedisDAO](/images/03.png) 技术选型：为什么不使用 Lock4j 提供的 LockTemplate 实现编程式锁？
两者各有优势，选择 Redisson 主要考虑它支持的 Redis 分布式锁的类型较多：可靠性较高的红锁、性能较好的读写锁等等。
Lock4j 的 LockTemplate 也是不错的选择，一方面不强依赖 Redisson 框架，一方面支持 ZooKeeper 等等。
## # 2. 声明式锁
考虑到不是所有人都会使用 Lock4j 组件，所以默认项目未引入 `lock4j-redisson-spring-boot-starter`。如果你想要实用，可按照下图进行引入：
![引入依赖](/images/05.png) 
### # 2.1 Lock4j 配置
在 [`application-local.yaml`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/src/main/resources/application-local.yaml#L111-L114) 配置文件中，通过 `lock4j` 配置项，添加 Lock4j 全局默认的分布式锁配置。如下图所示：
![配置文件](/images/04.png) 
### # 2.2 使用案例
在需要使用到分布式锁的方法上，添加 `@Lock4j` 注解，非常方便。示例代码如下：
@Service
public class DemoService {
// 默认使用 lock4j 配置项
@Lock4j
public void simple() {
//do something
}
// 完全配置，支持 Spring EL 表达式
@Lock4j(keys = {"#user.id", "#user.name"}, expire = 60000, acquireTimeout = 1000)
public User customMethod(User user) {
return user;
}
}
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[异步任务](/async-task/) [幂等性（防重复提交）](/idempotent/) 
←
[异步任务](/async-task/) [幂等性（防重复提交）](/idempotent/)→
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