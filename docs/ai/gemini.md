# 【模型接入】谷歌 Gemini

项目基于 Spring AI + 自己实现的 `models/gemini`，实现 [Google Gemini](https://ai.google.dev/gemini-api/docs/models) 的接入，基于它提供的 OpenAI 兼容性方案：
疑问：
为什么不使用 [`spring-ai-vertex-ai-gemini`](https://github.com/spring-projects/spring-ai/tree/main/models/spring-ai-vertex-ai-gemini) 呢？
因为它的 [API 认证方式](https://cloud.google.com/docs/authentication/provide-credentials-adc?hl=zh-cn#local-dev) 很奇怪（和主流大模型 API 差异很大），没跑通，所以暂时放弃。
另外，社区也有 [https://github.com/spring-projects/spring-ai/issues/1252](https://github.com/spring-projects/spring-ai/issues/1252) 讨论，建议采用和项目中类似的方式接入。
| 功能 | 模型 | Spring AI 客户端 |
| --- | --- | --- |
| AI 对话 | gemini-2.5-pro、gemini-2.5-flash 等 | GeminiChatModel |
| AI 绘画 | [imagen-4.0-generate-001](https://ai.google.dev/gemini-api/docs/imagen?hl=zh-cn) 等 | 暂未接入 |
## # 1. 申请密钥
由于腾讯混元是非开源的模型，所以无法私有化部署，需要去官网申请 API Key，然后通过 Spring AI 提供的客户端接入。
### # 1.1 申请 Google Gemini 密钥
① 在 [Google AI Studio](https://aistudio.google.com/app/apikey) 上，点击「创建 API 密钥」，创建一个 API Key 密钥。
申请完成后，可以在我们系统的 [AI 大模型 -> 控制台 -> API 密钥] 菜单，进行密钥的配置。只需要填写“密钥”，不需要填写“自定义 API URL”（因为 Spring AI 默认官方地址）。如下图所示：
![官方的密钥配置](../images/img_d53d1ca1.png) 
## # 2. 模型配置
友情提示：
目前 `ai_model` 表中，已经预置了一些模型，可以直接使用！！！
### # 2.1 AI 对话
使用 [《AI 对话》](/ai/chat/) 时，需要在 [AI 大模型 -> 控制台 -> 模型配置] 菜单，配置对应的聊天模型。
模型有：`gemini-2.5-pro`、`gemini-2.5-flash` 等等，可以点击 [Gemini](https://ai.google.dev/gemini-api/docs/models) 进行查看。
注意，每个模型标识的 `max_tokens`（回复数 Token 数）一般是 4096 或 8192，具体也是看上述链接。
### # 2.2 AI 绘图
TODO 等待 Imagen ImageModel 客户端！
## # 3. 如何使用？
① 如果你的项目里需要直接通过 `@Resource` 注入 GeminiChatModel 等对象，需要把 `application.yaml` 配置文件里的 `yudao.ai.hunyuan` 配置项，替换成你的！
yudao:
ai:
gemini: # 谷歌 Gemini
enable: true
api-key: AIzaSyAVoBxgoFvvte820vEQMma2LKBnC98bqMQ
model: gemini-2.5-flash
② 如果你希望使用 [AI 大模型 -> 控制台 -> API 密钥] 菜单的密钥配置，则可以通过 AiModelService 的 `#getChatModel(...)` 方法，获取对应的模型对象。
① 和 ② 这两者的后续使用，就是标准的 Spring AI 客户端的使用，调用对应的方法即可。
另外，GeminiChatModelTests 里有对应的测试用例，可以参考。
## # 666. Gemma 如何接入？
Gemma 是 Gemini 的[开源版本](https://github.com/google-deepmind/gemma)，可以进行私有化部署。
整个的接入，类似 [《【模型接入】LLAMA》](/ai/llama)。下面，我简单写下，有疑问可以星球提问哈！主要是，貌似也没听说哪个团队或者朋友在使用~
① 访问 [Ollama 官网](https://ollama.ai/download)，下载对应系统 Ollama 客户端，然后安装。
② 安装完成后，在命令中执行 `ollama run gemma` 命令，一键部署 `gemma` 模型。
③ 之后，需要使用 Spring AI 的 [`spring-ai-ollama`](https://github.com/spring-projects/spring-ai/tree/main/models/spring-ai-ollama) 进行接入。
不知道它怎么使用的话，可以看看 [《Spring AI : Java Integration with Large Language Models Simplified》](https://medium.com/@freeyecheng/spring-ai-java-integration-with-large-language-models-simplified-04873df6a538) 博客。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[【模型接入】微软 OpenAI](/ai/azure-openai/) [【模型接入】Stable Diffusion](/ai/stable-diffusion/) 
←
[【模型接入】微软 OpenAI](/ai/azure-openai/) [【模型接入】Stable Diffusion](/ai/stable-diffusion/)→
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