# Icon 图标

Element UI 内置多种 Icon 图标，可参考 [Element Icon 图标](https://element.eleme.cn/#/zh-CN/component/icon) 的文档。
在项目的 [`/src/assets/icons/svg`](https://github.com/yudaocode/yudao-ui-admin-vue2/tree/master/src/assets/icons/svg) 目录下，自定义了 Icon 图标，默认注册到全局中，可以在项目中任意地方使用。如下图所示：
![ 目录](../images/01.png) 
## # 1. 使用方式
新增
新增
## # 2. 自定义图标
① 访问 [https://www.iconfont.cn/](https://www.iconfont.cn/) 地址，搜索你想要的图标，下载 SVG 格式。如下图所示：
友情提示：其它 SVG 图标网站也可以。
![下载 SVG 格式](../images/02.png) ② 将 SVG 图标添加到 [`@/icons/svg`](https://github.com/yudaocode/yudao-ui-admin-vue2/tree/master/src/assets/icons/svg) 目录下，然后进行使用。
## # 3. 改变颜色
`` 默认会读取其父级的 color `fill: currentColor;` 。
你可以改变父级的 `color` ，或者直接改变 `fill` 的颜色即可。
疑问：
如果你遇到图标颜色不对，可以参照本 [issue](https://github.com/PanJiaChen/vue-element-admin/issues/330) 进行修改
## # 4. 离线 Icon 改造
参考 [https://t.zsxq.com/gOKlQ](https://t.zsxq.com/gOKlQ) 文档。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[菜单路由](/vue2/route/) [字典数据](/vue2/dict/) 
←
[菜单路由](/vue2/route/) [字典数据](/vue2/dict/)→
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