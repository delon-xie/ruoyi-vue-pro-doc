# 技术选型

## # 技术架构图
![架构图](/images/ruoyi-vue-pro-architecture.png) 
## # 👍 相关视频教程
- [从零开始 01：视频课程导读：项目简介、功能列表、技术选型 (opens new window)](https://t.zsxq.com/07rbyjM7A)
- [从零开始 04：自顶向下，讲解项目的整体结构（上） (opens new window)](https://t.zsxq.com/07FiIaQr3)
- [从零开始 04：自顶向下，讲解项目的整体结构（下） (opens new window)](https://t.zsxq.com/07yNfE6un)
## # 👻 后端
### # 系统环境
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| JDK | Java 开发工具包 | JDK 17 或者 JDK8 | [书单 (opens new window)](https://www.iocoder.cn/Architecture/books-recommended/?yudao) |
| Maven | Java 管理与构建工具 | `>=` 3.5.4 | [书单 (opens new window)](https://www.iocoder.cn/Books/Maven-books-recommended/?yudao) |
| Nginx | 高性能 Web 服务器 | - | [文档 (opens new window)](https://www.iocoder.cn/categories/Nginx/?yudao) |
### # 主框架
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [Spring Boot (opens new window)](https://spring.io/projects/spring-boot) | 应用开发框架 | 3.3.1 | [文档 (opens new window)](https://github.com/YunaiV/SpringBoot-Labs) |
| [Spring MVC (opens new window)](https://github.com/spring-projects/spring-framework/tree/master/spring-webmvc) | MVC 框架 | 6.1.10 | [文档 (opens new window)](http://www.iocoder.cn/SpringMVC/MVC/?yudao) |
| [Spring Security (opens new window)](https://github.com/spring-projects/spring-security) | Spring 安全框架 | 6.3.1 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/Spring-Security/?yudao) |
| [Hibernate Validator (opens new window)](https://github.com/hibernate/hibernate-validator) | 参数校验组件 | 8.0.1 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/Validation/?yudao) |
### # 存储层
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [MySQL (opens new window)](https://www.mysql.com/cn/) | 数据库服务器 | `>=` 5.7 | [书单 (opens new window)](https://www.iocoder.cn/Books/MySQL-books-recommended/?yudao) |
| [Druid (opens new window)](https://github.com/alibaba/druid) | JDBC 连接池、监控组件 | 1.2.23 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/datasource-pool/?yudao) |
| [MyBatis Plus (opens new window)](https://mp.baomidou.com/) | MyBatis 增强工具包 | 3.5.7 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/MyBatis/?yudao) |
| [Dynamic Datasource (opens new window)](https://dynamic-datasource.com/) | 动态数据源 | 4.3.1 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/datasource-pool/?yudao) |
| [Redis (opens new window)](https://redis.io/) | key-value 数据库 | `>=` 5.0 | [书单 (opens new window)](https://www.iocoder.cn/Redis/good-collection/?yudao) |
| [Redisson (opens new window)](https://github.com/redisson/redisson) | Redis 客户端 | 3.32.0 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/Redis/?yudao) |
### # 中间件
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [Flowable (opens new window)](https://github.com/flowable/flowable-engine) | 工作流引擎 | 7.0.0 | [文档 (opens new window)](https://doc.iocoder.cn/bpm/) |
| [Quartz (opens new window)](https://github.com/quartz-scheduler) | 任务调度组件 | 2.3.2 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/Job/?yudao) |
### # 系统监控
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [Spring Boot Admin (opens new window)](https://github.com/codecentric/spring-boot-admin) | Spring Boot 监控平台 | 3.3.2 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/Admin/?yudao) |
| [SkyWalking (opens new window)](https://skywalking.apache.org/) | 分布式应用追踪系统 | 9.0.0 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/SkyWalking/?yudao) |
### # 单元测试
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [JUnit (opens new window)](https://junit.org/junit5/) | Java 单元测试框架 | 5.10.1 | - |
| [Mockito (opens new window)](https://github.com/mockito/mockito) | Java Mock 框架 | 5.7.0 | - |
### # 其它工具
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [Springdoc (opens new window)](https://springdoc.org/) | Swagger 文档 | 2.3.0 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/Swagger/?yudao) |
| [Jackson (opens new window)](https://github.com/FasterXML/jackson) | JSON 工具库 | 2.17.1 |  |
| [MapStruct (opens new window)](https://mapstruct.org/) | Java Bean 转换 | 1.5.5.Final | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/MapStruct/?yudao) |
| [Lombok (opens new window)](https://projectlombok.org/) | 消除冗长的 Java 代码 | 1.18.34 | [文档 (opens new window)](http://www.iocoder.cn/Spring-Boot/Lombok/?yudao) |
## # 👾 前端
### # 管理后台（Vue3 + ElementPlus）
| 框架 | 说明 | 版本 |
| --- | --- | --- |
| [Vue (opens new window)](https://staging-cn.vuejs.org/) | vue 框架 | 3.2.45 |
| [Vite (opens new window)](https://cn.vitejs.dev//) | 开发与构建工具 | 4.0.1 |
| [Element Plus (opens new window)](https://element-plus.org/zh-CN/) | Element Plus | 2.2.26 |
| [TypeScript (opens new window)](https://www.typescriptlang.org/docs/) | JavaScript 的超集 | 4.9.4 |
| [pinia (opens new window)](https://pinia.vuejs.org/) | Vue 存储库 替代 vuex5 | 2.0.28 |
| [vueuse (opens new window)](https://vueuse.org/) | 常用工具集 | 9.6.0 |
| [vxe-table (opens new window)](https://vxetable.cn/) | vue 最强表单 | 4.3.7 |
| [vue-i18n (opens new window)](https://kazupon.github.io/vue-i18n/zh/introduction.html/) | 国际化 | 9.2.2 |
| [vue-router (opens new window)](https://router.vuejs.org/) | vue 路由 | 4.1.6 |
| [UnoCSS (opens new window)](https://unocss.dev/) | 下一代工具优先的 CSS 框架 | 0.58.9 |
| [iconify (opens new window)](https://icon-sets.iconify.design/) | 在线图标库 | 3.0.0 |
| [wangeditor (opens new window)](https://www.wangeditor.com/) | 富文本编辑器 | 5.1.23 |
### # 管理后台（Vue3 + Vben + Ant-Design-Vue）
| 框架 | 说明 | 版本 |
| --- | --- | --- |
| [Vue (opens new window)](https://staging-cn.vuejs.org/) | Vue 框架 | 3.2.47 |
| [Vite (opens new window)](https://cn.vitejs.dev//) | 开发与构建工具 | 4.3.0 |
| [ant-design-vue (opens new window)](https://antdv.com/) | ant-design-vue | 3.2.17 |
| [TypeScript (opens new window)](https://www.typescriptlang.org/docs/) | JavaScript 的超集 | 5.0.4 |
| [pinia (opens new window)](https://pinia.vuejs.org/) | Vue 存储库 替代 vuex5 | 2.0.34 |
| [vueuse (opens new window)](https://vueuse.org/) | 常用工具集 | 9.13.0 |
| [vue-i18n (opens new window)](https://kazupon.github.io/vue-i18n/zh/introduction.html/) | 国际化 | 9.2.2 |
| [vue-router (opens new window)](https://router.vuejs.org/) | Vue 路由 | 4.1.6 |
| [UnoCSS (opens new window)](https://unocss.dev/) | 下一代工具优先的 CSS 框架 | 0.58.9 |
| [iconify (opens new window)](https://icon-sets.iconify.design/) | 在线图标库 | 3.1.0 |
### # 管理后台（Vue2）
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [Node (opens new window)](https://nodejs.org/zh-cn/) | JavaScript 运行时环境 | >= 12 | - |
| [Vue (opens new window)](https://cn.vuejs.org/index.html) | JavaScript 框架 | 2.7.14 | [书单 (opens new window)](https://www.iocoder.cn/Books/Vue-books-recommended/?yudao) |
| [Vue Element Admin (opens new window)](https://panjiachen.github.io/vue-element-admin-site/zh/guide/) | 后台前端解决方案 | 2.5.10 |  |
### # 管理后台（uni-app）
| 框架 | 说明 | 版本 |
| --- | --- | --- |
| [uni-app (opens new window)](https://github.com/dcloudio/uni-app) | 跨平台框架 | 2.0.0 |
| [uni-ui (opens new window)](https://github.com/dcloudio/uni-ui) | 基于 uni-app 的 UI 框架 | 1.4.20 |
### # 用户 App
| 框架 | 说明 | 版本 | 学习指南 |
| --- | --- | --- | --- |
| [Vue (opens new window)](https://cn.vuejs.org/index.html) | JavaScript 框架 | 2.6.12 | [书单 (opens new window)](https://www.iocoder.cn/Books/Vue-books-recommended/) |
| [UniApp (opens new window)](https://github.com/dcloudio/uni-app) | 小程序、H5、App 的统一框架 | - | - |
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[接口文档](/api-doc/) [项目结构](/project-intro/) 
←
[接口文档](/api-doc/) [项目结构](/project-intro/)→
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