# 一键改包

项目提供了 [ProjectReactor](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-server/src/test/java/cn/iocoder/yudao/ProjectReactor.java) 程序，支持一键改包，包括 Maven 的 `groupId`、`artifactId`、Java 的根 `package`、前端的 `title`、数据库的 SQL 配置、应用的 `application.yaml` 配置文件等等。效果如下图所示：
![效果](/images/01.png) 友情提示：修改包名后，未来合并最新的代码可能会有一定的成本。
主要有两点原因：
- ① 改包后，无法继续通过 git pull 拉取最新代码
- ② 市面上没有合适的工具，合并改包后的代码
这个存在于所有开源项目，不属于本项目的问题，希望可以理解！
这里，也有球友分享了 [https://t.zsxq.com/MovSn](https://t.zsxq.com/MovSn) 合并策略，大家可以参考下。
## # 👍 相关视频教程
- [08、如何实现一键改包？](https://t.zsxq.com/07yzBuZFu)
## # 操作步骤
① 第一步，使用 [IDEA](http://www.iocoder.cn/categories/IDEA/?self) 克隆 [https://github.com/YunaiV/ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) 仓库的最新代码，并给该仓库一个 [Star](https://github.com/YunaiV/ruoyi-vue-pro)。
② 第二步，打开 ProjectReactor 类，填写 `groupIdNew`、`artifactIdNew`、`packageNameNew`、`titleNew` 属性。如下图所示：
![效果](/images/02.png) ③ 第三步，执行 ProjectReactor 的 `#main(String[] args)` 方法，它会基于当前项目，**复制**一个新项目到 `projectBaseDirNew` 目录，并进行相关的改名逻辑。
13:02:36.765 [main] INFO cn.iocoder.yudao.ProjectReactor - [main][开始获得需要重写的文件]
13:02:41.530 [main] INFO cn.iocoder.yudao.ProjectReactor - [main][需要重写的文件数量：2825，预计需要 5-10 秒]
13:02:45.799 [main] INFO cn.iocoder.yudao.ProjectReactor - [main][重写完成]
常见问题：打印日志包含“存在冲突名称”，怎么办？
一般来说，是因为当前目录包含了 yudao 关键字。例如说：克隆的是 yudao-boot-mini、yudao-cloud、yudao-cloud-mini 等。
这个时候，只需要文件重命名下，把 yudao 先改成其他的名称，例如说：tmp-boot-mini、tmp-cloud、tmp-cloud-mini 等。然后，重新执行即可。
④ 第四步，使用 IDEA 打开 `projectBaseDirNew` 目录，参考 [《开发指南 —— 快速启动》](/quick-start) 文档，进行项目的启动。
**注意**，一定要重新执行 SQL 的导入！！！然后，Redis 缓存也需要清空！！！
整个过程非常简单，如果碰到问题，请添加项目的技术交流群。
↓↓↓ 技术交流群，一起苦练技术基本功，每日精进 30 公里！↓↓↓
![交流群](/images/mp_yudaoyuanma3.png) 如果启动过程中，碰到 Redis 报错，可见 [https://t.zsxq.com/R3iAM](https://t.zsxq.com/R3iAM) 帖子！
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[代码热加载](/dev-hot-swap/) [迁移模块（适合新项目）](/migrate-module/) 
←
[代码热加载](/dev-hot-swap/) [迁移模块（适合新项目）](/migrate-module/)→
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