# 验证码

项目基于 [AJ-Captcha (opens new window)](https://gitee.com/anji-plus/captcha) 实现行为验证码，包含滑动拼图、文字点选两种方式，UI 支持弹出和嵌入两种方式。如下图所示：
滑动拼图 文字点选 ![滑动拼图](/images/img_81f73ce4.gif) ![点选文字](/images/img_221623d5.gif) 
疑问：为什么采用行为验证码？
相比传统的「传统字符型验证码」的“展示验证码-填写字符-比对答案”的流程来说，「行为验证码」的“展示验证码-操作-比对答案”的流程，用户只需要使用鼠标产生指定的行为轨迹，不需要键盘手动输入，用户体验更好，更加难以被机器识别，更加安全可靠。
## # 1. 交互流程
![交互流程](/images/shixu.png) 
- ① 用户访问应用页面，请求显示行为验证码
- ② 用户按照提示要求完成验证码拼图/点击
- ③ 用户提交表单，前端将第二步的输出一同提交到后台
- ④ 验证数据随表单提交到后台后，后台需要调用 [captchaService.verification (opens new window)](https://gitee.com/anji-plus/captcha/blob/master/core/captcha/src/main/java/com/anji/captcha/service/CaptchaService.java#L39-44) 做二次校验
- ⑤ 第 4 步返回校验通过/失败到产品应用后端，再返回到前端
## # 2. 如何关闭验证码
管理后台的登录界面，默认开启验证码。如果需要关闭验证码，操作如下：
① 后端的 `application-local.yaml` 配置文件中，将 [`yudao.captcha.enable` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/src/main/resources/application-local.yaml#L225-L227) 设置为 `false`。
② 如果前端使用 `yudao-ui-admin-vue2` 项目，将环境对应的 `.env` 配置文件中，将 [`VUE_APP_DOC_ENABLE` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/.env.local#L17-L18) 设置为 `false`。
如果前端使用 `yudao-ui-admin-vue3` 项目，将环境对应的 `.env` 配置文件中，将 [`VITE_APP_CAPTCHA_ENABLE` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3/blob/master/.env#L13-L14) 设置为 `false`。
ps：如果你不知道环境对应的 `.env` 配置文件是哪个，就全部改成 `false` 吧！
## # 3. 接入场景
### # 3.1 后端接入
`yudao-module-system` 模块，默认在 [`pom.xml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/pom.xml#L104-L107)) 已经引入 `captcha-spring-boot-starter` 依赖，代码如下：
com.anji-plus
captcha-spring-boot-starter
② 验证码的配置，在 [`application.yaml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/src/main/resources/application.yaml#L64-L81) 配置文件中，配置项如下：
aj:
captcha:
jigsaw: classpath:images/jigsaw # 滑动验证，底图路径，不配置将使用默认图片；以 classpath: 开头，取 resource 目录下路径
pic-click: classpath:images/pic-click # 滑动验证，底图路径，不配置将使用默认图片；以 classpath: 开头，取 resource 目录下路径
cache-type: redis # 缓存 local/redis...
cache-number: 1000 # local 缓存的阈值,达到这个值，清除缓存
timing-clear: 180 # local定时清除过期缓存(单位秒),设置为0代表不执行
type: blockPuzzle # 验证码类型 default 三种都实例化。blockPuzzle 滑块拼图、clickWord 文字点选、pictureWord 文本输入
water-mark: 芋道源码 # 右下角水印文字(我的水印)，可使用 https://tool.chinaz.com/tools/unicode.aspx 中文转 Unicode，Linux 可能需要转 unicode
interference-options: 0 # 滑动干扰项(0/1/2)
req-frequency-limit-enable: false # 接口请求次数一分钟限制是否开启 true|false
req-get-lock-limit: 5 # 验证失败 5 次，get接口锁定
req-get-lock-seconds: 10 # 验证失败后，锁定时间间隔
req-get-minute-limit: 30 # get 接口一分钟内请求数限制
req-check-minute-limit: 60 # check 接口一分钟内请求数限制
req-verify-minute-limit: 60 # verify 接口一分钟内请求数限制
如果你想修改验证码的 **图片**，修改 [resources/images (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-module-system/src/main/resources/images) 目录即可。
③ 验证码的使用，可以参考 [CaptchaController (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/controller/admin/captcha/CaptchaController.java) 和 [AuthController (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/controller/admin/auth/AuthController.java#L61-L67) 两个类的实现代码。
### # 3.2 Vue2.X 管理后台
① 验证码组件：[Verifition (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/components/Verifition/)
② 登录界面的接入：[login.vue (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/login.vue#L91-L93)
### # 3.3 Vue3.X 管理后台
① 验证码组件：[Verifition (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3/blob/master/src/components/Verifition/)
② 登录界面的接入：[LoginForm.vue (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3/blob/master/src/views/Login/components/LoginForm.vue#L77-L83)
### # 3.4 uni-app 用户 App
① 验证码组件：[verifition (opens new window)](https://github.com/yudaocode/yudao-ui-admin-uniapp/tree/master/components/verifition)
② 登录界面的接入：[login.vue (opens new window)](https://github.com/yudaocode/yudao-ui-admin-uniapp/blob/master/pages/login.vue#L17-L18)
## # 4. 如何使用传统的文字输入验证码
① `application.yaml` 配置文件中，将 `aj.captcha.type` 改成 `default` 。
② 前端项目，全局搜 `captchaType` 或者 `'blockPuzzle'`，改成 `pictureWord` 值。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[单元测试](/unit-test/) [工具类 Util](/util/) 
←
[单元测试](/unit-test/) [工具类 Util](/util/)→
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