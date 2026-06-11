# 服务监控

系统使用 Spring Boot Admin 和 SkyWalking 实现后端服务的监控。
## # 1. Spring Boot Admin
阅读 [《芋道 Spring Boot 监控工具 Admin 入门》](https://www.iocoder.cn/Spring-Boot/Admin/?yudao) 文章，入门 Spring Boot Admin。
注意，Spring Boot Admin 是内嵌在 `yudao-server` 后端项目中，无需单独启动。
### # 1.1 如何配置？
① 【开启 Spring Boot Admin Client 客户端】修改 `yudao-spring-boot-starter-monitor` 模块的 `pom.xml` 依赖，将如下依赖打开（去掉 `true` 部分）：
de.codecentric
spring-boot-admin-starter-client 
② 【开启 Spring Boot Admin Server 服务端】修改 `yudao-module-infra` 模块的 `pom.xml` 依赖，将如下依赖打开（去掉 `true` 部分）：
de.codecentric
spring-boot-admin-starter-server 
true
之后，使用 IDEA 刷新下 Maven 依赖！！！
### # 1.2 如何使用？
::: tip：默认登录账号、密码都是 admin
如果需要修改 Spring Boot 配置文件中，`spring.boot.admin.client.username` 和 `spring.boot.admin.client.password` 配置项（对应的 AdminServerConfiguration 配置类）。
注意：生产环境下，一定要修改登录账号、密码！！！
::: 
① 访问 [http://127.0.0.1:48080/admin/applications](http://127.0.0.1:48080/admin/applications) 地址，可以在 Spring Boot Admin 中，查看到应用与实例的列表。如下图所示：
![应用 - 列表](/images/02.png) ② 点击 `yudao-server` 应用，再点击实例，可以查看到该实例的细节信息。如下图所示：
![应用 - 明细](/images/03.png) ③ 点击 [日志 -> 日志文件] 菜单，查看该示例的日志内容。如下图所示：
![应用 - 日志](/images/04.png) 点击 [日志 -> 日志文件] 菜单，可动态修改 Logger 的日志级别，方便排查线上的某些 BUG。如下图所示：
![应用 - 日志](/images/05.png) 补充说明：也可以通过前端的 [基础设施 -> 监控中心 -> Java 监控] 菜单。
前端 [基础设施 -> 监控中心 -> Java 监控] 菜单，通过 iframe 内嵌后端 `/admin/applications` 路径。
如果你想自定义地址，可以前往 [基础设置 -> 配置管理] 菜单，设置 key 为 `url.spring-boot-admin` 配置项。
### # 1.3 常见问题？
#### # 1.3.1 如何开启登录？
生产环境下，建议 Spring Boot Admin 开启“安全认证”的功能，避免出现安全事故。
由于项目本身已经使用 Spring Security 做安全认证，再额外配置 Spring Boot Admin 的“安全认证”有点麻烦。我自己是拓展 Spring Security 解决，预计[需要改 2-3 个类](https://yunai1024.notion.site/druid-admin-9d856cf606a74e5e9f07438b03b0142b?pvs=4)，不是很建议。
那么怎么办呢？可以参考 [《芋道 Spring Boot 监控工具 Admin 入门》](https://www.iocoder.cn/Spring-Boot/Admin/) 文档，额外搭建一个 Spring Boot Admin 进程，然后项目接入它使用！
#### # 1.3.2 prod 生产环境下，后端部署多个 JVM 进程时，spring.boot.admin.client.url 填写哪个 IP？
- 第一步，在 Nginx 中配置 `/admin` 路径，转发到多个 JVM 的 IP 上，使用 [`backup`](https://blog.csdn.net/bolg_hero/article/details/73382117) 参数实现主备。注意，该转发只允许内网访问，避免安全问题！！！
- 第二步，设置 `spring.boot.admin.client.url` 配置项，为 Nginx 的 `内置 IP/admin` 地址。
#### # 1.3.3 Spring Boot Admin Server 是否可以独立？
确实，也是非常推荐 Spring Boot Admin Server 的。推荐阅读 [《芋道 Spring Boot 监控工具 Admin 入门》](https://www.iocoder.cn/Spring-Boot/Admin/?yudao) 文章，单独搭建 Spring Boot Admin Server 服务端。
然后，参考「1.3.2」问题，将 `spring.boot.admin.client.url` 配置项，为 Spring Boot Admin Server 的地址即可。
当然，原本项目只需要引入 `spring-boot-admin-starter-client` 依赖，不用引入 `spring-boot-admin-starter-server` 依赖！！！
## # 2. SkyWalking
阅读 [《芋道 SkyWalking 极简入门》](https://www.iocoder.cn/SkyWalking/install/?yudao) 文章，入门 SkyWalking。
注意，SkyWalking 需要单独启动，预计需要 4 核 8G 的硬件资源。
### # 2.1 如何配置？
① 修改 `yudao-spring-boot-starter-monitor` 模块的 `pom.xml` 依赖，将如下依赖打开（去掉 `true` 部分）：
io.opentracing
opentracing-util
org.apache.skywalking
apm-toolkit-trace
org.apache.skywalking
apm-toolkit-logback-1.x
org.apache.skywalking
apm-toolkit-opentracing
② 修改所有 `logback-spring.xml` 日志配置中，添加 SkyWalking 收集日志的 appender 配置。如下图所示：
![ 配置](/images/img_0b80ff03.png) 【可选】补充说明：
默认情况下，控制台 `STDOUT` 和 `FILE` 的 Appender 日志输出，是不带 `tid` 链路追踪编号。
可以参考 `SKYWALKING` Appender 的 `encoder` 部分的配置，添加上 LayoutWrappingEncoder、TraceIdPatternLogbackLayout 部分，就是如下：
[%tid] ${FILE_LOG_PATTERN}
- `` 里面的重点是 `[%tid]` 部分，并且要写对 `CONSOLE_LOG_PATTERN` 或 `FILE_LOG_PATTERN` 噢！！！
③ 修改 SkyWalking 在前端项目的 [基础设施 -> 监控中心 -> 链路追踪] 对应的 [`skywaling/index.vue`](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/infra/skywalking/index.vue#L11) 文件，调整为你 SkyWalking 的访问地址。如下图所示：
![ 文件](/images/11.png) 
### # 2.2 如何使用？
① 点击 [基础设施 -> 监控中心 -> 链路追踪] 菜单，可以看到 SkyWalking 提供的链路追踪。如下图所示：
![基础设施 -> 链路追踪](/images/21.png) ② 点击 `yudao-server` 服务，查看该服务的监控信息。如下图所示：
![ 服务](/images/22.png) 补充说明：
前端 [基础设施 -> 监控中心 -> 链路追踪] 菜单，通过 iframe 内嵌 `http://skywalking.iocoder.cn` 路径。
如果你想自定义地址，可以前往 [基础设置 -> 配置管理] 菜单，设置 key 为 `url.skywalking` 配置项。
## # 3. 更多监控系统
### # 3.1 Prometheus
参见 [《芋道 Prometheus + Grafana + Alertmanager 极简入门 》](https://www.iocoder.cn/Prometheus/install/?yudao) 文章。
注意，修改项目的 `yudao-spring-boot-starter-monitor` 模块的 `pom.xml` 依赖，将如下依赖打开（去掉 `true` 部分）：
io.micrometer
micrometer-registry-prometheus
true
### # 3.2 ELK
参见 [芋道 ELK(Elasticsearch + Logstash + Kibana) 极简入门](https://www.iocoder.cn/Elasticsearch/ELK-install/?yudao) 文章。
### # 3.3 Sentry
参见 [《Sentry 极简入门 》](https://www.iocoder.cn/Sentry/install/?yudao) 文章。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[HTTPS 证书](/https/) [Tomcat WAR 部署](/deployment-war/) 
←
[HTTPS 证书](/https/) [Tomcat WAR 部署](/deployment-war/)→
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