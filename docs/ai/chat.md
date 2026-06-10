# AI 聊天对话

AI 对话，基于 LLM 大模型，实现智能聊天的功能。
说白了，就是和机器人聊天。高级点，就是智能问答！
![AI 聊天](../images/img_144514db.png) 整个功能，涉及到 5 个表（上图可以看到 4 个）：
- 【配置】`ai_api_key`：API 秘钥表
- 【配置】`ai_model`：模型表
- 【配置】`ai_chat_role`：聊天角色表
- 【对话】`ai_chat_conversation`：聊天对话表
- 【对话】`ai_chat_message`：聊天消息表
补充说明：
`ai_api_key`、`ai_model` 已经在 [《功能开启》](/ai/build/) 讲解，就不重复赘述。
下面，我们逐个表进行介绍，这个过程中也会讲讲对应的功能。
## # 1. 前置准备
你想使用哪个模型聊天，可以参考对应的文档，进行配置：
- 国内模型：[《通义千问》](/ai/tongyi)、[《DeepSeek》](/ai/deep-seek)、[《豆包》](/ai/doubao)、[《混元》](/ai/hunyuan)、[《文心一言》](/ai/yiyan)、[《硅基流动》](/ai/siliconflow)、[《讯飞星火》](/ai/xinghuo)、[《智谱 GLM》](/ai/glm)、[《月之月面》](/ai/moonshot)、[《MiniMax》](/ai/minimax)、[《百川智能》](/ai/baichuan)
- 国外模型：[《OpenAI（ChatGPT）》](/ai/openai)、[《Anthropic（Claude）》](/ai/claude)、[《LLAMA》](/ai/llama)、[《【微软 OpenAI】ChatGPT》](/ai/azure-openai) 、[《谷歌 Gemini》](/ai/gemini)
友情提示：
一般情况下，建议先使用 [《DeepSeek》](/ai/deep-seek) 模块，因为免费送了一些 tokens，可以先体验一下。
## # 2. 聊天角色表
聊天角色表，配置机器人扮演怎么样的角色，例如说：通用 AI 助手、Python 专家、客服小姐姐等等。
### # 2.1 表结构
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
CREATE TABLE `ai_chat_role` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色编号',
`name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
`avatar` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '头像',
`description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色描述',
`status` tinyint DEFAULT NULL COMMENT '状态',
`sort` int NOT NULL DEFAULT '0' COMMENT '角色排序',
`user_id` bigint DEFAULT NULL COMMENT '用户编号',
`public_status` bit(1) NOT NULL COMMENT '是否公开',
`category` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色类别',
`model_id` bigint DEFAULT NULL COMMENT '模型编号',
`system_message` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色上下文',
`knowledge_ids` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '关联的知识库编号数组',
`tool_ids` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '关联的工具编号数组',
`mcp_client_names` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '引用的 MCP Client 名字列表',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI 聊天角色表';
① `user_id` 字段：对应 `system_users` 表的 `id` 字段，表示哪个用户创建的角色。
`public_status` 字段：表示是否公开。如果是公开，那么其他用户也可以使用这个角色，一般由管理员创建。如果是私有，那么只有创建者 `user_id` 可以使用。
`category` 字段：公开角色的所属类别，例如说：助手、编程开发、娱乐等等。
② `model_id` 字段：表示角色绑定的默认模型，对应 `ai_model` 表的 `id` 字段。当然，也可以不绑定，此时使用 `ai_model` 排序 `sort` 最小的模型。
③ `system_message` 字段：表示角色上下文，或者说角色设定。例如说 “Python 专家” 对应如下
“
我希望你能作为一名 python 专家。 
我将向你提供有关我的技术问题的所有信息，而你的角色是解决我的问题。
你应该用你的计算机科学、网络基础设施和 IT 安全知识来解决我的问题。在你的回答中，使用聪明的、简单的、为各种层次的人所理解的语言会有帮助。
逐步解释你的解决方案并使用要点是很有帮助的。尽量避免过多的技术细节，但在必要时使用它们。我希望你用解决方案来回答，而不是写任何解释。
”
④ `knowledge_ids` 字段：关联的知识库编号数组，对应 `ai_knowledge` 表的 `id` 字段。后续使用，可见 [《AI 知识库》](/ai/knowledge) 文档。
⑤ `tool_ids` 字段：关联的工具编号数组，对应 `ai_tool` 表的 `id` 字段。后续使用，可见 [《AI 工具库》](/ai/tool) 文档。
⑥ `mcp_client_names` 字段：引用的 MCP Client 名字列表。后续使用，可见 [《MCP Client 客户端》](/ai/mcp-client) 文档。
### # 2.2 管理后台
① 前端对应 [AI 大模型 -> 控制台 -> 聊天角色] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/ai/model/chatRole` 目录，提供给管理员使用，创建公开角色。
![聊天角色](../images/img_f98ee911.png) 它的后端 HTTP 接口，由 `yudao-module-ai` 模块的 `model` 包的 AiChatRoleController 实现。
② 前端聊天界面的【角色仓库】，对应 `yudao-ui-admin-vue3` 项目的 TODO 目录，提供给用户使用，创建私有角色。
![角色仓库](../images/img_8abdc6aa.png) 
- 可以点击【使用】按钮，使用对应的角色创建对话
- 也可以点击【公共角色】标签，按分类查看公开角色列表，也支持【使用】按钮
## # 3. 聊天对话
聊天对话，一共有 2 个表，分别是 `ai_chat_conversation` 和 `ai_chat_message`。前者是对话的基本信息，后者是对话的消息列表。
### # 3.1 表结构【聊天对话表】
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
CREATE TABLE `ai_chat_conversation` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '对话编号',
`title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '对话标题',
`pinned` bit(1) NOT NULL COMMENT '是否置顶',
`pinned_time` datetime DEFAULT NULL COMMENT '置顶时间',
`user_id` bigint NOT NULL COMMENT '用户编号',
`role_id` bigint DEFAULT NULL COMMENT '聊天角色',
`model_id` bigint NOT NULL COMMENT '模型编号',
`model` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模型标识',
`system_message` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色设定',
`temperature` double NOT NULL COMMENT '温度参数',
`max_tokens` int NOT NULL COMMENT '单条回复的最大 Token 数量',
`max_contexts` int NOT NULL COMMENT '上下文的最大 Message 数量',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1781604279872581716 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI 聊天对话表';
① `user_id` 字段：对应 `system_users` 表的 `id` 字段，表示哪个用户创建的对话。
② `role_id` 字段：表示对话使用的角色，对应 `ai_chat_role` 表的 `id` 字段。如果没有使用角色，则为空，此时是点击聊天界面的【新建对话】产生的。
③ `model_id` 字段：表示对话使用的模型，对应 `ai_model` 表的 `id` 字段。每个对话可以随时切换它所使用的模型。
`model` 字段：表示模型标识，冗余 `ai_model` 表的 `model` 字段。
![修改模型](../images/img_ef90f583.png) `system_message`、`temperature`、`max_tokens`、`max_contexts` 字段：就是对话的配置，上图也已经看到。
### # 3.2 表结构【聊天消息表】
省略 creator/create_time/updater/update_time/deleted/tenant_id 等通用字段
CREATE TABLE `ai_chat_message` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '消息编号',
`conversation_id` bigint NOT NULL COMMENT '对话编号',
`user_id` bigint NOT NULL COMMENT '用户编号',
`role_id` bigint DEFAULT NULL COMMENT '角色编号',
`model` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模型标识',
`model_id` bigint NOT NULL COMMENT '模型编号',  
`type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '消息类型',  
`reply_id` bigint DEFAULT NULL COMMENT '回复编号',
`content` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '消息内容',
`reason_content` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '推理内容',
`use_context` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否携带上下文',
`segment_ids` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '段落编号数组',
`web_search_pages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '联网搜索的网页内容数组',
PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI 聊天消息表';
① `conversation_id`、`user_id`、`role_id` 字段：关联到 `ai_chat_conversation` 表的相关字段。
② `model`、`model_id` 字段：该消息所使用的模型。因为对话可以随时切换模型，所以消息也需要记录。
③ `type` 字段：消息类型，对应 Spring AI 提供的 MessageType 枚举类，目前表里有 `user` 用户发送、`assistant` 模型回复。
`reply_id` 字段：表示回复的消息编号。用户每次发送消息，会记录一条 `user` 类型的消息，然后模型回复的消息，会记录一条 `assistant` 类型的消息，这两条消息通过 `reply_id` 对应的。
④ `content` 字段：消息内容，对应用户发送的消息或者模型回复的消息。
`reason_content` 字段：推理内容，对应支持推理模式（thinking）的模型，模型在输出最终回答之前，先输出的思维链内容。对应 [《推理模式（thinking）》](/ai/thinking/) 文档。
⑤ `use_context` 字段：表示是否携带上下文。如果为 `true` 时，表示这条消息会携带上下文，此时调用模型时，会带该会话的最后 `max_contexts` 组消息。
注意，它是在消息发送框的左下角的蓝色 switch 【上下文】小按钮噢！
⑥ `segment_ids` 字段：知识库找回的段落编号数组，对应 `ai_knowledge_segment` 表的 `id` 字段，可见 [《AI 知识库》](/ai/knowledge) 文档。
⑦ `web_search_pages` 字段：联网搜索的网页内容数组，对应 [《AI 联网搜索》](/ai/web-search) 文档。
### # 3.3 管理后台
① 前端对应 [AI 大模型 -> AI 对话] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/ai/chat/index` 目录。上面已经有很多图了，就不重复截图了！
它的后端 HTTP 接口，由 `yudao-module-ai` 模块的 `chat` 包的 AiChatConversationController、AiChatMessageController 实现。
最最最关键的代码！！！大家可以重点看看！！！
AiChatMessageController 提供的 `#sendChatMessageStream(...)` 流式消息接口。
它的内部，调用 Spring AI 的 StreamingChatClient 来实现大模型的调用。
② 前端对应 [AI 大模型 -> 控制台 -> 聊天管理] 菜单，对应 `yudao-ui-admin-vue3` 项目的 `@/views/ai/chat/manager` 目录，提供给管理员使用，查看对话列表、消息列表。
![聊天管理](../images/img_8be40c2e.png) 
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[功能开启](/ai/build/) [AI 绘画创作](/ai/image/) 
←
[功能开启](/ai/build/) [AI 绘画创作](/ai/image/)→
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