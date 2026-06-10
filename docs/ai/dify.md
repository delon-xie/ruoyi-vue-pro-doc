# Dify 工作流

## # 1. Dify 是什么？
Dify 是一个开源的 LLM 应用开发平台。其直观的界面结合了 AI 工作流、RAG 管道、Agent、模型管理、可观测性功能等，让您可以快速从原型到生产。
它的官网是 [https://dify.ai/ (opens new window)](https://dify.ai/)，可直接申请使用。
同时，它也是个开源项目，地址是 [https://github.com/langgenius/dify (opens new window)](https://github.com/langgenius/dify)，可以自行部署。
## # 2. 如何接入？
由于 Dify 的 [对话接口 (opens new window)](https://docs.dify.ai/zh-hans/guides/application-publishing/developing-with-apis) 不兼容 GPT 的接口，所以无法使用 [《【模型接入】OpenAI》](/ai/openai) 的方式，无法通过 OpenAIChatModel 进行接入。
不过，社区里有人提供了 [https://github.com/fatwang2/dify2openai (opens new window)](https://github.com/fatwang2/dify2openai) 项目，可以将 Dify 的对话接口转换为 OpenAI 的接口，这样就可以使用 OpenAIChatModel 进行接入了。
下面，我们讲解下，如何把我们系统中的 [《AI 对话聊天》](/ai/chat/) ，接入到 Dify 的工作室（聊天助手、Agent、工作流等）。
### # 2.1 第一步：创建 Dify 应用
① 在 [https://cloud.dify.ai/apps (opens new window)](https://cloud.dify.ai/apps) 工作室，点击【创建空白应用】按钮，创建一个应用。具体怎么创建，可见 [https://docs.dify.ai/zh-hans/guides/application-orchestrate/creating-an-application (opens new window)](https://docs.dify.ai/zh-hans/guides/application-orchestrate/creating-an-application) 文档。
![新建应用](../images/img_6fb8420b.png) ② 点击应用，切换到【访问 API】选项，再点击【API 密钥】按钮，之后点击【创建密钥】按钮，生成一个 API 密钥。
![新建 API 密钥](../images/img_bcb1b2b1.png) 
### # 2.2 第二步：配置 API 密钥与模型
〇 本地搭建 [https://github.com/fatwang2/dify2openai (opens new window)](https://github.com/fatwang2/dify2openai) 项目，将 Dify 的对话接口转换为 OpenAI 的接口。
① 在我们系统的 [AI 大模型 -> 控制台 -> API 密钥] 菜单，新建一个 Dify 的 API 密钥，填写上面的“密钥”，并设置 URL 为 `http://127.0.0.1:3000` 。如下图所示：
![API 密钥](../images/img_d88f9cac.png) ② 在我们系统的 [AI 大模型 -> 控制台 -> 模型配置] 菜单，新建一个 Dify 的聊天模型，填写上面的“模型名称” + “API 密钥” + “API URL”。如下图所示：
![模型配置](../images/img_b5791448.png) 
### # 2.3 第三步：AI 对话聊天
在 [AI 大模型 -> AI 对话] 菜单，选择 Dify 的聊天模型，即可开始对话。如下图所示：
![AI 对话](../images/img_f1573722.png) 
## # 3. 常见问题？
① 如果你想使用 Dify 知识库接口，可参考 [https://docs.dify.ai/zh-hans/guides/knowledge-base/external-knowledge-api-documentation (opens new window)](https://docs.dify.ai/zh-hans/guides/knowledge-base/external-knowledge-api-documentation) 进行对接。
当然，我们系统已经提供了 [《AI 知识库》](/ai/knowledge) 功能。
② 如果使用 Dify 对话接口时，需要传递 `input`、`files` 等参数，无法采用上述方式接入。
此时，只能参考 OpenAiChatModel 的源码，实现类似 DifyChatModel 的接入，甚至要修改 `dify2openai` 源码。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[AI 工作流](/ai/workflow/) [FastGPT 工作流](/ai/fastgpt/) 
←
[AI 工作流](/ai/workflow/) [FastGPT 工作流](/ai/fastgpt/)→
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