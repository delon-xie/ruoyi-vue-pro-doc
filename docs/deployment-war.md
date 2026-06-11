# Tomcat WAR 部署

# # Tomcat 部署
友情提示：
参考 [《Spring Boot 打包为 war 包，部署 tomcat》](https://blog.csdn.net/qq_37559701/article/details/138492755)，已验证可行。
① 修改 `yudao-server` 目录的 `pom.xml` 文件，添加 `war` 包的打包配置：
jar -->
war
继续修改该 `pom.xml` 文件，添加 `spring-boot-starter-tomcat` 依赖：
org.springframework.boot
spring-boot-starter-web
org.springframework.boot
spring-boot-starter-tomcat
org.springframework.boot
spring-boot-starter-tomcat
provided
② 修改 YudaoServerApplication 类，实现 SpringBootServletInitializer 接口，并重写 `configure` 方法：
/**
* 用于 WAR 包部署到外部 Tomcat
*/
@Override
protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
return application.sources(YudaoServerApplication.class);
}
③ 根目录执行打包命令：
mvn clean package -Dmaven.test.skip=true
后续，部署到 Tomcat 的时候，使用 `yudao-server/target/yudao-server.war` 文件。
注意，`context-path` 需要为 `/` 噢！
# # 国产 TongWeb 部署
友情提示：最好上面的 Tomcat 部署先跑通！！！
手头暂时没有 TongWeb 的环境，无法验证是否可行。目前找了几篇看着还行的文档：
- [《国产化：springboot 项目 TongWeb 替换 tomcat 踩坑实录 》](https://www.cnblogs.com/datangguanjunhou/p/18388120)
- [《Springboot 集成东方通等中间件打包和部署》](http://juejin.cn/post/7329206771565625371)
- [《信创改造：tongweb 部署 Springboot 项目方案>》](https://juejin.cn/post/7321526403434528803)