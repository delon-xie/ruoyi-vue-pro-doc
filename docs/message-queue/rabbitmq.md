# 消息队列（RabbitMQ）

## # RabbitMQ-Spring
[`yudao-spring-boot-starter-mq` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-mq/) 技术组件，基于 RabbitMQ 实现分布式消息队列。
如果你对 RabbitMQ 不太了解，可以看看 [《芋道 Spring Boot 消息队列 RabbitMQ 入门》 (opens new window)](https://www.iocoder.cn/Spring-Boot/RabbitMQ/?yudao) 文档。
如何安装一个 RabbitMQ 服务？
参考 [《芋道 RabbitMQ 极简入门 》 (opens new window)](https://www.iocoder.cn/RabbitMQ/install/?yudao) 文档。
## # 2. 使用示例
以【短信发送】举例子，改造使用 RabbitMQ 作为消息队列。
## # 2.0 引入依赖与配置
① 在 `yudao-module-system` 模块中，引入 `yudao-spring-boot-starter-mq` 技术组件。如下所示：
cn.iocoder.boot
yudao-spring-boot-starter-mq
② 修改 `yudao-spring-boot-starter-mq` 的 `pom.xml` 文件，引入 `spring-rabbit` 依赖。如下所示：
true 部分即可 -->
org.springframework.amqp
spring-rabbit
记得需要手动在 IDEA 刷新下 Maven 依赖。
③ 修改 `application-local.xml` 配置文件，添加 RabbitMQ 配置。如下所示：
spring:
# RabbitMQ 配置项，对应 RabbitProperties 配置类
rabbitmq:
host: 127.0.0.1 # RabbitMQ 服务的地址
port: 5672 # RabbitMQ 服务的端口
username: guest # RabbitMQ 服务的账号
password: guest # RabbitMQ 服务的密码
ps：默认已经添加，无需操作。
### # 2.1 Message 消息
① 在 `message` 包下，修改 SmsSendMessage 类，短信发送消息。代码如下：
@Data
public class SmsSendMessage implements Serializable { // 重点：需要添加 Serializable 接口 
public static final String QUEUE = "SEND_MESSAGE_QUEUE"; // 重点：需要增加消息对应的 Queue
/**
* 短信日志编号
*/
@NotNull(message = "短信日志编号不能为空")
private Long logId;
/**
* 手机号
*/
@NotNull(message = "手机号不能为空")
private String mobile;
/**
* 短信渠道编号
*/
@NotNull(message = "短信渠道编号不能为空")
private Long channelId;
/**
* 短信 API 的模板编号
*/
@NotNull(message = "短信 API 的模板编号不能为空")
private String apiTemplateId;
/**
* 短信模板参数
*/
private List> templateParams;
}
② 在 RabbitMQ 控制台，新增 `"SEND_MESSAGE_QUEUE"` 队列。如下图所示：
![新建 Queue](../images/img_3dad0b3b.png) 
### # 2.2 SmsProducer 生产者
在 `producer` 包下，修改 SmsProducer 类，Sms 短信相关消息的生产者。代码如下：
@Slf4j
@Component
public class SmsProducer {
@Resource
private RabbitTemplate rabbitTemplate; // 重点：注入 RabbitTemplate 对象
/**
* 发送 {@link SmsSendMessage} 消息
*
* @param logId 短信日志编号
* @param mobile 手机号
* @param channelId 渠道编号
* @param apiTemplateId 短信模板编号
* @param templateParams 短信模板参数
*/
public void sendSmsSendMessage(Long logId, String mobile,
Long channelId, String apiTemplateId, List> templateParams) {
SmsSendMessage message = new SmsSendMessage().setLogId(logId).setMobile(mobile);
message.setChannelId(channelId).setApiTemplateId(apiTemplateId).setTemplateParams(templateParams);
rabbitTemplate.convertAndSend(SmsSendMessage.QUEUE, message); // 重点：使用 RabbitTemplate 发送消息
}
}
### # 2.3 SmsSendConsumer 消费者
在 `consumer` 包下，修改 SmsSendConsumer 类，SmsSendMessage 的消费者。代码如下：
@Component
@RabbitListener(queues = SmsSendMessage.QUEUE) // 重点：添加 @RabbitListener 注解，声明消费的 queue
@Slf4j
public class SmsSendConsumer {
@Resource
private SmsSendService smsSendService;
@RabbitHandler // 重点：添加 @RabbitHandler 注解，实现消息的消费
public void onMessage(SmsSendMessage message) {
log.info("[onMessage][消息内容({})]", message);
smsSendService.doSendSms(message);
}
}
### # 2.4 简单测试
① Debug 启动后端项目，可以在 SmsProducer 和 SmsSendConsumer 上面打上断点，稍微调试下。
② 打开 `SmsTemplateController.http` 文件，使用 IDEA httpclient 发起请求，发送短信。如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![简单测试](../images/img_248ebe40.png) 如果 IDEA 控制台看到 `[onMessage][消息内容` 日志内容，说明消息的发送和消费成功。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[消息队列（RocketMQ）](/message-queue/rocketmq/) [消息队列（Kafka）](/message-queue/kafka/) 
←
[消息队列（RocketMQ）](/message-queue/rocketmq/) [消息队列（Kafka）](/message-queue/kafka/)→
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