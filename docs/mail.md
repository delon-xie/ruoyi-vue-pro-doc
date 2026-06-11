# 邮件配置

本章节，介绍项目的邮件功能。它在管理后台有三个菜单，分别是：
**① 邮箱账号：配置邮件的发送账号**
![邮箱账号](/images/img_71e388ea.png) **② 邮件模版：管理邮件的内容模版**
![邮件模版](/images/img_fd806dde.png) **③ 邮件记录：查看邮件的发送记录**
![邮件记录](/images/img_1acd6ab0.png) 
## # 1. 表结构
![表结构](/images/img_3dfe2f1c.png) 
## # 2. 实现原理
邮件功能提供统一的 API 给其它模块，使它们可以快速实现发送邮件的功能，无需关心不同邮件平台的具体对接。
邮件采用异步发送，基于 [消息队列](/message-queue/event)，如下图所示：
![实现原理](/images/img_816e4aa6.png) 
- 前端代码：[views/system/mail](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/system/mail/)
- 后端代码：[controller/admin/mail](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/controller/admin/mail/)
最终使用 Hutool 的 [MailUtil](https://apidoc.gitee.com/loolly/hutool/cn/hutool/extra/mail/MailUtil.html) 发送邮件。
## # 3. 邮箱配置
本小节，讲解如何配置邮件功能，整个过程如下：
1. 新建一个邮箱【账号】，配置邮件的发送账号
1. 新建一个邮件【模版】，配置邮件的内容模版
1. 测试该邮件模板，查看对应的邮件【日志】，确认是否发送成功
### # 3.1 新建邮箱账号
① 点击 [系统管理 -> 消息中心 -> 邮件管理 -> 邮箱账号] 菜单，查看邮箱账号的列表。如下图所示：
![邮箱账号](/images/img_71e388ea.png) ② 点击 [新增] 按钮，添加一个邮箱账号，并填写信息如下图：
![新增邮箱账号](/images/img_1213cb5e.png) 友情提示：
邮件发送基于 [SMTP](https://baike.baidu.com/item/SMTP/175887) 协议实现，需要开通账号的 SMTP 服务。例如说：
![网易 163 邮箱的 SMTP 服务](/images/img_8f79df06.png) 不同邮件平台的 SMTP 配置，可见 [「5. 邮箱平台附录」](#_5-%E9%82%AE%E7%AE%B1%E5%B9%B3%E5%8F%B0%E9%99%84%E5%BD%95) 小节。
③ 新增完成后，确认你的邮箱账号是否可以发送邮件，可通过如下代码：
import cn.hutool.extra.mail.MailAccount;
import cn.hutool.extra.mail.MailUtil;
@Test
public void testDemo() {
MailAccount mailAccount = new MailAccount()
//                .setFrom("奥特曼 ")
.setFrom("ydym_test@163.com") // 邮箱地址
.setHost("smtp.163.com").setPort(465).setSslEnable(true) // SMTP 服务器
.setAuth(true).setUser("ydym_test@163.com").setPass("WBZTEINMIFVRYSOE"); // 登录账号密码
String messageId = MailUtil.send(mailAccount, "7685413@qq.com", "主题", "内容", false);
System.out.println("发送结果：" + messageId);
}
### # 3.2 新建邮箱模版
① 点击 [系统管理 -> 消息中心 -> 邮箱管理 -> 邮件模板] 菜单，查看邮件模板的列表。如下图所示：
![邮件模版](/images/img_fd806dde.png) ② 点击 [新增] 按钮，选择刚创建的邮箱账号，并填写信息如下图：
![邮件模板的新增](/images/img_d24b2ac8.png) 
- 邮箱账号：发送该邮件模板时，使用的邮件账号，即使用哪个邮箱进行发送邮件
- 模版编号：邮件模板的唯一标识，使用邮件 API 时，通过它标识使用的邮件模板
- 发件人名称：发送邮件显示的发件人名字
- 模板内容：邮件模板的内容，使用 `{var}` 作为占位符，例如说 `{name}`、`{code}` 等
- 开启状态：邮件模板被禁用时，该邮件模板将不发送邮件，只记录邮件日志
疑问：为什么设计邮件模板的功能？
在一些场景下，产品会希望修改发送邮件的标题、内容，甚至邮箱账号，此时只需要修改邮件模版的对应属性，无需重启应用。
### # 3.3 查看邮件日志
① 点击 [测试] 按钮，输入测试的收件邮箱地址，进行该邮件模板的模拟发送。如下图所示：
![测试邮件](/images/img_38994c46.png) ② 打开收件邮箱，查看邮件是否发送成功。如下图所示：
![邮件箱](/images/img_daaebafb.png) ③ 点击 [系统管理 -> 消息中心 -> 邮箱管理 -> 邮件日志] 采单，可以查看到每条邮件的发送状态。如下图所示：
![邮件发送日志](/images/img_9462e35c.png) 
## # 4. 邮件发送
### # 4.1 MailSendApi
[邮箱配置](#_3-%E9%82%AE%E7%AE%B1%E9%85%8D%E7%BD%AE)完成后，可使用 [MailSendApi](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/api/mail/MailSendApi.java) 进行邮件的发送，支持多种用户类型。它的方法如下：
![MailSendApi](/images/img_cb5c7c0c.png) 
### # 4.2 接入示例
以 `yudao-module-bpm` 模块，需要发邮件为例子，讲解 MailSendApi 的使用。
① 在 `yudao-module-bpm` 模块的 [`pom.xml`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-bpm/pom.xml) 引入 `yudao-module-system` 依赖，如所示：
cn.iocoder.boot
yudao-module-system
${revision}
② 在代码中注入 MailSendApi Bean，并调用发送邮件的方法。代码如下：
public class TestDemoServiceImpl implements TestDemoService {
// 0. 注入 MailSendApi Bean
@Resource
private MailSendApi mailSendApi;
public void sendDemo() {
// 1. 准备参数
Long userId = 1L; // 示例中写死，你可以改成你业务中的 userId 噢
String templateCode = "test_01"; // 邮件模版，记得在【邮箱管理】中配置噢
Map templateParams = new HashMap<>();
templateParams.put("key1", "奥特曼");
templateParams.put("key2", "变身");
// 2. 发送邮件
mailSendApi.sendSingleMailToAdmin(new MailSendSingleToUserReqDTO()
.setUserId(userId).setTemplateCode(templateCode).setTemplateParams(templateParams));
}
}
## # 5. 邮箱平台附录
- [《QQ 邮箱的 SMTP 设置》](http://t.zoukankan.com/kimsbo-p-10671851.html)
- [《网易 163 邮箱的 SMTP 设置》](https://blog.csdn.net/qq_39933045/article/details/126957074)
- [《QQ 邮箱、网易邮箱、腾讯企业邮箱、网易企业邮箱的 SMTP 设置》](https://zhuanlan.zhihu.com/p/551399559)
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[短信配置](/sms/) [站内信配置](/notify/) 
←
[短信配置](/sms/) [站内信配置](/notify/)→
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