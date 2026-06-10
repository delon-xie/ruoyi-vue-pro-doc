# 新建模块

本章节，将介绍如何新建名字为 `yudao-module-demo` 的示例模块，并添加 RESTful API 接口。
虽然内容看起来比较长，是因为艿艿写的比较详细，大量截图，保姆级教程！其实只有五个步骤，保持耐心，跟着艿艿一点点来。🙂 完成之后，你会对整个 [项目结构](/project-intro/) 有更充分的了解。
## # 👍 相关视频教程
- [从零开始 06：如何 5 分钟，创建一个新模块？ (opens new window)](https://t.zsxq.com/07EUrZrNV)
## # 1. 新建 Maven 模块
### # 1.1 新建 demo 模块
① 选择 File -> New -> Module 菜单，如下图所示：
![打开 New Module](/images/img_72a5d66a.png) ② 选择 Maven 类型，选择父模块为 `yudao`，输入名字为 `yudao-module-demo`，并点击 Create 按钮，如下图所示：
![填写 Module 信息](/images/img_c2c893d9.png) ③ 打开 `yudao-module-demo` 模块，删除 src 和 test 下多余的文件，如下图所示：
![删除多余的文件](/images/img_b1de525b.png) 
### # 1.2 添加 demo 依赖
① 打开 `yudao-module-demo` 模块的 `pom.xml` 文件，修改内容如下：
提示
`` 部分，只是注释，不需要写到 XML 中。
cn.iocoder.boot
yudao
${revision} 
4.0.0
yudao-module-demo
jar 
${project.artifactId} 
demo 模块，主要实现 XXX、YYY、ZZZ 等功能。
cn.iocoder.boot
yudao-spring-boot-starter-web
cn.iocoder.boot
yudao-spring-boot-starter-security
cn.iocoder.boot
yudao-spring-boot-starter-mybatis
cn.iocoder.boot
yudao-spring-boot-starter-test
② 打开 Maven 菜单，点击刷新按钮，让引入的 Maven 依赖生效。如下图所示：
![刷新 Maven 依赖](/images/img_c46f97d1.png) ③ 新建 `cn.iocoder.yudao.module.demo` **基础**包，其中 `demo` 为模块名。之后，新建 `controller.admin` 和 `controller.app` 等包。如下图所示：
![新建基础包](/images/img_e278db8f.png) 
## # 2. 新建 RESTful API 接口
① 在 `controller.admin` 包，新建一个 DemoTestController 类，并新建一个 `/demo/test/get` 接口。代码如下：
package cn.iocoder.yudao.module.demo.controller.admin;
import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;
@Tag(name = "管理后台 - Test")
@RestController
@RequestMapping("/demo/test")
@Validated
public class DemoTestController {
// 这个构造方法，只是方便大家，验证 Controller 有生效
public DemoTestController() {
System.out.println(getClass() + "生效啦！！！");
}
@GetMapping("/get")
@Operation(summary = "获取 test 信息")
public CommonResult get() {
return success("true");
}
}
**注意**，`/demo` 是该模块所有 RESTful API 的基础路径，`/test` 是 Test 功能的基础路径。
② 在 `controller.app` 包，新建一个 AppDemoTestController 类，并新建一个 `/demo/test/get` 接口。代码如下：
package cn.iocoder.yudao.module.demo.controller.app;
import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;
@Tag(name = "用户 App - Test")
@RestController
@RequestMapping("/demo/test")
@Validated
public class AppDemoTestController {
// 这个构造方法，只是方便大家，验证 Controller 有生效
public AppDemoTestController() {
System.out.println(getClass() + "生效啦！！！");
}
@GetMapping("/get")
@Operation(summary = "获取 test 信息")
public CommonResult get() {
return success("true");
}
}
在 Controller 的命名上，额外增加 **App** 作为前缀，一方面区分是管理后台还是用户 App 的 Controller，另一方面避免 Spring Bean 的名字冲突。
可能你会奇怪，这里我们定义了两个 `/demo/test/get` 接口，会不会存在重复导致冲突呢？答案，当然是并不会。原因是：
- `controller.admin` 包下的接口，默认会增加 `/admin-api`，即最终的访问地址是 `/admin-api/demo/test/get`
- `controller.app` 包下的接口，默认会增加 `/app-api`，即最终的访问地址是 `/app-api/demo/test/get`
## # 3. 引入 demo 模块
① 在 `yudao-server` 模块的 `pom.xml` 文件，引入 `yudao-module-demo` 模块，并点击 Maven 刷新。如下图所示：
![引入模块](/images/img_a6cb51e1.png) ② 运行 YudaoServerApplication 类，将后端项目进行启动。启动完成后，可以看到如下日志：
class cn.iocoder.yudao.module.demo.controller.admin.DemoTestController生效啦！！！
class cn.iocoder.yudao.module.demo.controller.app.AppDemoTestController生效啦！！！
## # 4. 测试接口
使用浏览器打开 [http://127.0.0.1:48080/doc.html (opens new window)](http://127.0.0.1:48080/doc.html) 地址，进入 Swagger 接口文档。
① 打开“管理后台 - Test”接口，进行 `/admin-api/demo/test/get` 接口的调试，如下图所示：
![测试 接口](/images/img_e5f96d66.png) ② 打开“用户 App - Test”接口，进行 `/app-api/demo/test/get` 接口的调试，如下图所示：
![测试  接口](/images/img_61adb80b.png) 
## # 5. 常见问题
### # 5.1 访问接口返回 404？
请检查，你新建的模块的 `package` 包名是不是在 `cn.iocoder.yudao.module` 下！
如果不是，修改 [YudaoServerApplication (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/src/main/java/cn/iocoder/yudao/server/YudaoServerApplication.java) 类，增加新建的模块的 `package` 包名。例如说：
@SpringBootApplication(scanBasePackages = {"${yudao.info.base-package}.server", "${yudao.info.base-package}.module",
"xxx.yyy.zzz"}) // xxx.yyy.zzz 是你新建的模块的 `package` 包名
### # 5.2 接口分组
如果你想 Swagger 有该模块的接口分组，则需要新建 GroupedOpenApi Bean。如下图所示：
![接口分组](/images/img_3f9d9a51.png) 
### # 5.3 MyBatis 日志
如果你希望新模块的 MyBatis 查询会打印 SQL 日志，需要在 `logging.level` 配置对应的 Logger。如下图所示：
![MyBatis 日志](/images/img_e76033d2.png) 
### # 5.4 如何自定义 API 前缀
- [https://t.zsxq.com/B64Q2 (opens new window)](https://t.zsxq.com/B64Q2)
- [https://t.zsxq.com/6xS5q (opens new window)](https://t.zsxq.com/6xS5q)
### # 5.5 每个模块，独立工程
- [https://t.zsxq.com/73b2Q (opens new window)](https://t.zsxq.com/73b2Q)
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[项目外包](/waibao/) [代码生成【单表】（新增功能）](/new-feature/) 
←
[项目外包](/waibao/) [代码生成【单表】（新增功能）](/new-feature/)→
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