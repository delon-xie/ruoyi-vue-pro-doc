# 快速启动（前端项目）

星球高频问题！！！
[《这么多前端项目，我应该选择使用哪个？？？》](https://t.zsxq.com/1UnGl)
目标：将项目 [ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) 的前端项目运行起来 🛫
整个过程非常简单，预计 5 分钟就可以完成，取决于大家的网速。
↓↓↓ 技术交流群，一起苦练技术基本功，每日精进 30 公里！↓↓↓
![交流群](/images/mp_yudaoyuanma3.png) 友情提示：可能胖友本地没有安装 Node.js 的环境，导致报错。可以参考如下文档安装：
- Windows 安装 Node.js 指南：[http://www.iocoder.cn/NodeJS/windows-install](http://www.iocoder.cn/NodeJS/windows-install)
- Mac 安装 Node.js 指南：[http://www.iocoder.cn/NodeJS/mac-install](http://www.iocoder.cn/NodeJS/mac-install)
## # 👍 相关视频教程
- [从零开始 02：在 Windows 环境下，如何运行前后端项目？](https://t.zsxq.com/07BeiEA6Q)
- [从零开始 03：在 MacOS 环境下，如何运行前后端项目？](https://t.zsxq.com/07FUNnYFm)
## # 1. 管理后台
项目的管理后台有 4 个版本：
- [`yudao-ui-admin-vue3`](https://github.com/yudaocode/yudao-ui-admin-vue3/)：基于 Vue3 + element-plus
- [`yudao-ui-admin-vben`](https://github.com/yudaocode/yudao-ui-admin-vben/)：基于 Vue3 + vben5(ant-design-vue)
- [`yudao-ui-admin-vue2`](https://github.com/yudaocode/yudao-ui-admin-vue2/)：基于 Vue2 + element-ui
- [`yudao-ui-admin-uniapp`](https://github.com/yudaocode/yudao-ui-admin-uniapp/)：基于 Vue3 + uni-app
### # 1.1 Vue3 + element-plus 版本
[`yudao-ui-admin-vue3`](https://github.com/yudaocode/yudao-ui-admin-vue3/) 是前端 Vue3 管理后台项目。
① 克隆 [https://github.com/yudaocode/yudao-ui-admin-vue3.git](https://github.com/yudaocode/yudao-ui-admin-vue3.git) 项目，并 Star 关注下该项目。
② 在根目录执行如下命令，进行启动：
# 安装 pnpm，提升依赖的安装速度
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
# 安装依赖
pnpm install
# 启动服务
npm run dev
③ 启动完成后，浏览器会自动打开 [http://localhost:80](http://localhost:80) 地址，可以看到前端界面。
![前端界面](/images/img_4491.png) 友情提示：Vue3 使用 Vite 构建，所以它存在如下的情况，都是正常的：
1. 项目启动很快，浏览器打开需要等待 1 分钟左右，请保持耐心。
1. 点击菜单，感觉会有一点卡顿，因为 Vite 采用懒加载机制。不用担心，最终部署到生产环境，就不存在这个问题了。
详细说明，可见 [《为什么有人说 Vite 快，有人却说 Vite 慢？》](https://juejin.cn/post/7129041114174062628) 文章。
疑问：我是前端工程师，不想启动后端项目，怎么办？
参考 [《快速启动【后端】》](/quick-start) 文档，启动起来非常容易！未来可能是 AI + 全栈！
### # 1.2 Vue3 + vben5(ant-design-vue、element-plus) 版本
[`yudao-ui-admin-vben`](https://github.com/yudaocode/yudao-ui-admin-vben/) 是前端 Vue3 + vben5(ant-design-vue、element-plus) 管理后台项目。
① 克隆 [https://github.com/yudaocode/yudao-ui-admin-vben.git](https://github.com/yudaocode/yudao-ui-admin-vben.git) 项目，并 Star 关注下该项目。
② 在根目录执行如下命令，进行启动：
# 安装 pnpm，提升依赖的安装速度
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
# 安装依赖
pnpm install
# 如下命令，二选一即可，启动对应的前端模版：
# 启动服务（ant-design-vue）
npm run dev:antd
# 启动服务（element-plus）
npm run dev:ele
③ 启动完成后，浏览器会自动打开 [http://localhost:5666](http://localhost:5666) 或 [http://localhost:5777](http://localhost:5777) 地址，可以看到前端界面。
![前端界面](/images/img_b4227c50.png) 疑问：我是前端工程师，不想启动后端项目，怎么办？
参考 [《快速启动【后端】》](/quick-start) 文档，启动起来非常容易！未来可能是 AI + 全栈！
### # 1.3 Vue2 + element-ui 版本
[`yudao-ui-admin-vue2`](https://github.com/yudaocode/yudao-ui-admin-vue2/) 是前端 Vue2 管理后台项目。
① 克隆 [https://github.com/yudaocode/yudao-ui-admin-vue2.git](https://github.com/yudaocode/yudao-ui-admin-vue2.git) 项目，并 Star 关注下该项目。
② 在根目录执行如下命令，进行启动：
# 安装 Yarn，提升依赖的安装速度
npm install --global yarn
# 安装依赖
yarn install
# 启动服务
npm run local
![启动前端项目](/images/img_466.png) ② 启动完成后，浏览器会自动打开 [http://localhost:1024](http://localhost:1024) 地址，可以看到前端界面。
![前端界面](/images/img_9967.png) 疑问：我是前端工程师，不想启动后端项目，怎么办？
参考 [《快速启动【后端】》](/quick-start) 文档，启动起来非常容易！未来可能是 AI + 全栈！
### # 1.4 Vue3 + uni-app 版本
[`yudao-ui-admin-uniapp`](https://github.com/yudaocode/yudao-ui-admin-uniapp/) 是前端 uni-app 管理后台项目。
① 克隆 [https://github.com/yudaocode/yudao-ui-admin-uniapp.git](https://github.com/yudaocode/yudao-ui-admin-uniapp.git) 项目，并 Star 关注下该项目。
② 执行如下命令，安装 npm 依赖：
# 安装 pnpm，提升依赖的安装速度
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
# 安装依赖
pnpm install
# 启动 h5 平台
npm run dev
# （可选）启动 wx 小程序平台
npm run dev:mp-weixin
③ 启动完成后，浏览器会自动打开 [http://localhost:9000](http://localhost:9000) 地址，可以看到前端界面。
疑问：我是前端工程师，不想启动后端项目，怎么办？
参考 [《快速启动【后端】》](/quick-start) 文档，启动起来非常容易！未来可能是 AI + 全栈！
另外，如果要使用工作流，需要阅读 [《工作流手册》](/bpm/) ！！！
## # 2. uni-app 商城移动端
[`yudao-mall-uniapp`](https://github.com/yudaocode/yudao-mall-uniapp) 是前端 uni-app 商城移动端项目。
前置任务：
需要参考 [《商城手册 —— 功能开启》](/mall/build/) 文档，将商城的后端启动。
另外，也可以阅读下 HBuilder 的官方文档 [https://zh.uniapp.dcloud.io/quickstart-hx.html](https://zh.uniapp.dcloud.io/quickstart-hx.html) 的「运行 uni-app」小节。
① 克隆 [https://github.com/yudaocode/yudao-mall-uniapp](https://github.com/yudaocode/yudao-mall-uniapp) 项目，并 Star 关注下该项目。
② 下载 [HBuilder](https://www.dcloud.io/hbuilderx.html) 工具，并进行安装。
③ 点击 HBuilder 的 [文件 -> 导入 -> 从本地项目导入...] 菜单，选择克隆的 `yudao-mall-uniapp` 目录
④ 执行如下命令，安装 npm 依赖：
# 安装 npm 依赖
npm i
# 【非必须】如果报错，可以在尝试，执行下如下命令
npm install --legacy-peer-deps
### # 2.1 浏览器运行
点击 HBuilder 的 [运行 -> 运行到浏览器 -> Chrome] 菜单，进行运行。成功后，界面如下图所示：
![前端界面](/images/img_92d70b2e.png) 疑问：我是前端工程师，不想启动后端项目，怎么办？
参考 [《快速启动【后端】》](/quick-start) 文档，启动起来非常容易！未来可能是 AI + 全栈！
### # 2.2 小程序运行
① 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，并进行安装。
安装完成后，打开微信开发工具，并进行微信登录。
② 在 HBuilder 中，选择项目根目录的 `manifest.json` 文件，选择「微信小程序」配置，填写你的微信小程序 AppID。如下图所示：
![配置 ](/images/img_fb8e019f.png) 如果你没有微信小程序的 AppID，可以参考 [https://developers.weixin.qq.com/miniprogram/dev/devtools/sandbox.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/sandbox.html) 申请一个测试号。
③ 点击 HBuilder 的 [运行 -> 运行到小程序模拟器 -> 微信开发者工具] 菜单，进行运行。成功后，界面如下图所示：
![微信小程序界面](/images/img_88c8702e.png) 如果出现请求后端失败，需要把勾选上“不校验合法域名、web-view(业务域名)、tls 版本以及 https 证书”！！！
另外，如果你要体验微信小程序登录，可参考 [《微信小程序登录》](/member/weixin-lite-login/) 文档进行配置。
= = 不要觉得麻烦，我开发的时候更麻烦、更痛苦！都是一路踩坑过来的。。。
## # 666. 参与项目
如果你想参与到前端项目的开发，可以微信 wangwenbin-server 噢。
近期，重点开发 Vue3 管理后台、uniapp 商城，欢迎大家参与进来。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[快速启动（后端项目）](/quick-start/) [接口文档](/api-doc/) 
←
[快速启动（后端项目）](/quick-start/) [接口文档](/api-doc/)→
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