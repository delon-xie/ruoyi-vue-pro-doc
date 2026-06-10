# 功能开启

进度说明：
- 管理后台，请使用 [https://gitee.com/yudaocode/yudao-ui-admin-vue3 (opens new window)](https://gitee.com/yudaocode/yudao-ui-admin-vue3) 仓库的 `master` 分支
- 后端项目，请使用 [https://gitee.com/zhijiantianya/ruoyi-vue-pro (opens new window)](https://gitee.com/zhijiantianya/ruoyi-vue-pro) 仓库的 `master-jdk17` 分支
注意！仅支持 JDK 17/21 使用，因为基于 [Spring AI (opens new window)](https://spring.io/projects/spring-ai) 实现，它基于 Spring Boot 3.X 构建，所以最低要求 JDK 17！！！
AI 系统，后端由 `yudao-module-ai` 模块实现，前端由 `yudao-ui-admin-vue3` 的 `ai` 目录实现。
考虑到编译速度，默认 `yudao-module-ai` 模块是关闭的，需要手动开启。步骤如下：
- 第一步，开启 `yudao-module-ai` 模块
- 第二步，导入 AI 系统的 SQL 数据库脚本
- 第三步，重启后端项目，确认功能是否生效
## # 1. 第一步，开启模块
① 修改根目录的 [`pom.xml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/pom.xml) 文件，取消 `yudao-module-ai` 模块的注释。如下图所示：
![取消 模块的注释](../images/img_1261abff.png) ② 修改 `yudao-server` 目录的 [`pom.xml` (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/pom.xml) 文件，引入 `yudao-module-ai` 模块。如下图所示：
![引入 模块](../images/img_a91e096a.png) ③ 点击 IDEA 右上角的【Reload All Maven Projects】，刷新 Maven 依赖。如下图所示：
![刷新 Maven 依赖](../images/img_feccec72.png) 
## # 2. 第二步，导入 SQL
点击 [`ai-2025-08-29.sql.zip` (opens new window)](https://t.zsxq.com/09F92) 下载附件，解压出 SQL 文件，然后导入到数据库中。
友情提示：↑↑↑ ai.sql 是可以点击下载的！ ↑↑↑
重要说明：该 SQL 仅芋道星球成员可使用和商用，否则视为侵权（索赔 100 万，永久追溯）【下载即视为同意】。
所以表名字，都使用 `ai_` 作为前缀。
## # 3. 第三步，重启项目
重启后端项目，然后访问前端的 AI 菜单，确认功能是否生效。如下图所示：
![确认功能是否生效](../images/img_6a5934bf.png) 至此，我们就成功开启了 AI 的功能 🙂
可以访问 [AI 大模型 -> AI 对话] 菜单，点击左上角的【新建对话】按钮后，确认右上角的模型是“deepseek”后，就可以和 AI 大模型聊起来了！
友情提示：
如果聊天报错，可能是 API 密钥配置不正确，或者 API 密钥欠费了，可以参考下面的「666. 使用必读」小节，配置你自己申请的密钥。
## # 4. 使用必读！！！
目前 AI 系统下的功能，是基于 [LLM 大模型 (opens new window)](https://www.redhat.com/zh/topics/ai/what-are-large-language-models)，从而实现对话、绘图等一系列功能。
使用时，需要进行 API 密钥、模型的配置。下面，我们来了解下。
### # 4.1 API 秘钥表
`ai_api_key`：API 秘钥表，顾名思义，就是存储 AI 大模型的 API 密钥的表。
#### # 4.1.1 表结构
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
CREATE TABLE `ai_api_key` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
`name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
`platform` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '平台',
`api_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密钥',
`url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '自定义 API 地址',
`status` int NOT NULL COMMENT '状态',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI API 密钥表';
① `platform` 字段：表示平台，对应 AiPlatformEnum 枚举，目前支持多个 AI 大模型：
- 国内：【阿里】通义千问、【深度求索】DeepSeek、【字节】豆包、【腾讯】混元、【百度】文心一言、【SiliconFlow】硅基流动、【讯飞】星火、【智谱】GLM
- 国外：【OpenAI】GPT、【Meta】Llama、【Google】Gemini、【Stability】Stable Diffusion
通过 `platform` 字段，可以区分不同的平台，从而创建对应的 Spring AI Model 对象，调用对应的平台，具体可见 AiModelFactoryImpl 类下的一系列方法。
② `api_key` 字段：表示 API 密钥，对应不同的平台的密钥，例如说 OpenAI 的 API KEY。但是要注意，有些平台是多个值，例如说文心一言是 `appKey` + `secretKey` 组合，那它在 `api_key` 就是 `${appKey}|${secretKey}`。
`url` 字段：表示自定义 API 地址。一般情况下不需要配置，除非你有自定义的需求，例如说 OpenAI 使用 API 中转。
具体它们怎么配置，或者怎么部署，可见对应的文档：
- 国内模型：[《通义千问》](/ai/tongyi)、[《DeepSeek》](/ai/deep-seek)、[《豆包》](/ai/doubao)、[《混元》](/ai/hunyuan)、[《文心一言》](/ai/yiyan)、[《硅基流动》](/ai/siliconflow)、[《讯飞星火》](/ai/xinghuo)、[《智谱 GLM》](/ai/glm)、[《月之月面》](/ai/moonshot)、[《MiniMax》](/ai/minimax)、[《百川智能》](/ai/baichuan)
- 国外模型：[《OpenAI（ChatGPT）》](/ai/openai)、[《Anthropic（Claude）》](/ai/claude)、[《LLAMA》](/ai/llama)、[《微软 OpenAI（ChatGPT）》](/ai/azure-openai)、[《谷歌 Gemini》](/ai/gemini)
友情提示：
一般情况下，建议先使用 [《DeepSeek》](/ai/deep-seek) 模型，因为免费送了一些 tokens，可以先体验一下。
#### # 4.1.2 管理后台
前端对应 [AI 大模型 -> 控制台 -> API 密钥] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/ai/model/apiKey` 目录。
![API 密钥](../images/img_d88f9cac.png) 它的后端 HTTP 接口，由 `yudao-module-ai` 模块的 `model` 包的 AiApiKeyController 实现。
### # 4.2 模型表
`ai_model`：模型表，配置每个平台下有哪些可用的模型。
#### # 4.2.1 表结构
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
CREATE TABLE `ai_model` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
`name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模型名字',
`sort` int NOT NULL COMMENT '排序',
`status` tinyint NOT NULL COMMENT '状态',
`key_id` bigint NOT NULL COMMENT 'API 秘钥编号',
`platform` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模型平台',
`model` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模型标识',
`temperature` double DEFAULT NULL COMMENT '温度参数',
`max_tokens` int DEFAULT NULL COMMENT '单条回复的最大 Token 数量',
`max_contexts` int DEFAULT NULL COMMENT '上下文的最大 Message 数量',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI 模型表';
① `key_id` 字段：表示 API 秘钥编号，对应 `ai_api_key` 表的 `id` 字段。
`platform` 字段：表示模型平台，冗余 `ai_api_key` 表的 `platform` 字段。
② `model` 字段：表示模型标识，对应不同的平台的模型标识，例如说 OpenAI 的 `gpt-3.5-turbo`、`gpt-4-turbo`，通义千问的 `qwen-plus`、`qwen-max` 等等。
③ `type` 字段：模型类型，对应 AiModelTypeEnum 枚举，对应有 CHAT、IMAGE、VOICE、VIDEO、EMBEDDING、RERANK 等。
例如说，CHAT 可用于文本生成，IMAGE 可用于图片生成，VOICE 可用于语音生成，VIDEO 可用于视频生成。
④ `temperature` 字段：表示温度参数，对应不同的平台的温度参数，例如说 OpenAI 的 `temperature`。
`max_tokens` 字段：表示单条回复的最大 Token 数量，对应不同的平台的最大 Token 数量，例如说 OpenAI 的 `gpt-3.5-turbo` 为 4096，`gpt-4` 为 8192。
`max_contexts` 字段：表示上下文的最大 Message 数量。因为模型的上下文是有上限的，所以和模型对话时，不会把历史的所有消息都发送过去，而是选择最近的 `max_contexts` 组消息。会有一些难理解，具体可以看看 AiChatMessageServiceImpl 的 `#filterContextMessages(...)` 方法。
疑问：为什么 ai_api_key 和 ai_chat_model 表是分开的？
一个平台有多个模型，它们会共用一个 API 密钥，所以是分开的，方便管理。
#### # 4.2.2 管理后台
前端对应 [AI 大模型 -> 控制台 -> 模型配置] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/ai/model/model` 目录。
![模型配置](../images/img_b5791448.png) 它的后端 HTTP 接口，由 `yudao-module-ai` 模块的 `model` 包的 AiModelController 实现。
注意：新建模型时，需要正确选择 `type` 模型类型，否则会导致调用不到对应的模型！！！
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[AI 大模型演示](/ai-preview/) [AI 聊天对话](/ai/chat/) 
←
[AI 大模型演示](/ai-preview/) [AI 聊天对话](/ai/chat/)→
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