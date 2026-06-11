# AI 大模型演示

## # 1. 演示地址
### # 1.1 管理后台
- 演示地址：[http://dashboard-vue3.yudao.iocoder.cn/](http://dashboard-vue3.yudao.iocoder.cn/)
- 菜单：“AI 大模型”下的「AI 聊天」「AI 绘画」「AI 知识库」「AI 工具」「AI 写作」「AI 脑图」「AI 音乐」「控制台」等等
- 仓库：[https://github.com/yudaocode/yudao-ui-admin-vue3](https://github.com/yudaocode/yudao-ui-admin-vue3) 的 `ai` 目录，基于 Vue3 + Element Plus 实现
![管理后台](/images/img_6a5934bf.png) 
### # 1.2 AI 后端
支持 Spring Boot 单体、Spring Cloud 微服务架构
- 单体仓库： [https://github.com/YunaiV/ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) 的 `yudao-module-ai` 模块
- 微服务仓库： [https://github.com/YunaiV/yudao-cloud](https://github.com/YunaiV/yudao-cloud) 的 `yudao-module-ai` 服务
## # 2. AI 启动
参见 [《AI 手册 —— 功能开启》](/ai/build/) 文档，一般 3 分钟就可以启动完成。
已经内置多个 AI 大模型（相关密钥已配置）：
- 国内：【阿里】通义千问、【深度求索】DeepSeek、【字节】豆包、【腾讯】混元、【百度】文心一言、【SiliconFlow】硅基流动、【讯飞】星火、【智谱】GLM、【月之月面】Moonshot、【MiniMax】MiniMax
- 国外：【OpenAI】GPT、【Anthropic】Claude、【Meta】Llama、【Google】Gemini、【Stability】Stable Diffusion
## # 3. AI 交流群
专属交流社区，欢迎扫码加入。
![交流群](/images/zsxq_ai.png) 
## # 4. 功能描述
主要分为 8 个核心模块：对话、绘画、知识库、工具、工作流、写作、脑图、音乐。
目前正在增加新的 4 个模块：语音、视频、翻译、PPT。
### # 4.1 模型接入
![模型接入](/images/img_2e2104e0.png) 模型（可点击链接，查看申请/部署文档） 国内/国外 是否开源（私有化部署） [《【阿里】通义千问》](/ai/tongyi) 国内 √ [《【深度求索】DeepSeek》](/ai/deep-seek) 国内 √ [《【字节】豆包》](/ai/doubao) 国内 √ [《【腾讯】混元》](/ai/hunyuan) 国内 √ [《【百度】文心一言》](/ai/yiyan) 国内 [《【SiliconFlow】硅基流动》](/ai/siliconflow) 国内 [《【讯飞】星火认知》](/ai/xinghuo) 国内 [《【智谱】GLM》](/ai/glm/) 国内 √ [《【讯飞】星火认知》](/ai/xinghuo) 国内 [《【月之月面】Moonshot》](/ai/moonshot) 国内 [《【MiniMax】MiniMax》](/ai/minimax) 国内 √ [《【百创智能】BaiChuan》](/ai/baichuan) 国内 √ [《【OpenAI】ChatGPT》](/ai/openai) 国外 [《【OpenAI】Claude》](/ai/openai) 国外 [《【Anthropic】LLAMA》](/ai/claude) 国外 √ [《【微软 OpenAI】ChatGPT》](/ai/azure-openai) 国外 [《【谷歌】Gemini》](/ai/yiyan) 国外 √(Gemma) [《【Stability】Stable Diffusion》](/ai/stable-diffusion) 国外 √ [《【Midjourney】Midjourney》](/ai/midjourney) 国外 √ [《【Suno AI】Suno》](/ai/midjourney) 国外 模型推理增强：
- [《推理模式（thinking）》](/ai/thinking/)
- [《联网搜索》](/ai/web-search/)
### # 4.2 AI 对话聊天
详细说明，可见 [《AI 对话聊天》](/ai/chat/) 文档
![AI 聊天](/images/img_144514db.png) 
### # 4.3 AI 绘画创作
详细说明，可见 [《AI 绘画创作》](/ai/image/) 文档
![AI 绘画](/images/img_d6149401.png) 
### # 4.4 AI 知识库
详细说明，可见 [《AI 知识库》](/ai/knowledge/) 文档
![AI 知识库](/images/img_56774b05.png) 
### # 4.5 AI 工作流
- [《AI 工作流》](/ai/workflow/)
- [《接入 Dify 工作流》](/ai/dify)
- [《接入 FastGPT 工作流》](/ai/fastgpt)
- [《接入 Coze 工作流》](/ai/coze)
## # 4.6 AI 工具调用
- [《AI 工具调用（function calling）》](/ai/tool)
- [《MCP Client 客户端》](/ai/mcp-client/)
- [《MCP Server 服务端》](/ai/mcp-server/)
### # 4.7 AI 音乐创作
详细可见，可见 [《AI 音乐创作》](/ai/music/) 文档
### # 4.8 AI 写作助手
详细可见，可见 [《AI 写作助手》](/ai/write/) 文档
![AI 写作](/images/img_18c8d9ba.png) 
### # 4.9 AI 思维导图
详细可见，可见 [《AI 思维导图》](/ai/mindmap/) 文档
![思维导图](/images/img_f78bda21.png) 
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[【通用】跟进记录、待办事项](/crm/follow-up/) [功能开启](/ai/build/) 
←
[【通用】跟进记录、待办事项](/crm/follow-up/) [功能开启](/ai/build/)→
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