# 配置读取

在 [基础设施 -> 配置管理] 菜单，可以动态修改配置，无需重启服务器即可生效。
![配置管理](../images/01.png) 提示
对应 [《后端手册 —— 配置中心》](/config-center/) 文档。
## # 1. 读取配置
前端调用 [`#/api/infra/config/index.ts` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/api/infra/config/index.ts#L36-L41) 的 `getConfigKey(configKey)` 方法，获取指定 key 对应的配置的值。代码如下：
/** 根据参数键名查询参数值 */
export function getConfigKey(configKey: string) {
return requestClient.get(
`/infra/config/get-value-by-key?key=${configKey}`,
);
}
## # 2. 实战案例
在 [`apps/web-antd/src/views/infra/skywalking/index.vue` (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/views/infra/skywalking/index.vue) 页面中，获取 key 为 `"url.skywalking"` 的配置的值。代码如下：
![Skywalking 配置](../images/02.png) 
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[通用方法](/vben5/util/) [IDE 调试](/vben5/debugger/) 
←
[通用方法](/vben5/util/) [IDE 调试](/vben5/debugger/)→
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