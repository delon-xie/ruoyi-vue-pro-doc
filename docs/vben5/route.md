# 菜单路由

前端项目基于 Vben Admin 5.x 实现，它已经内置了路由、菜单、权限等功能。
官方文档
强烈建议先阅读 Vben Admin 官方文档，了解框架的基础概念和使用方式：
- [《路由和菜单》](https://doc.vben.pro/guide/essentials/route.html)
- [《权限》](https://doc.vben.pro/guide/in-depth/access.html)【项目采用“后端访问控制”】
## # 1. 路由
项目的路由分为两种：静态路由、动态路由。
### # 1.1 静态路由
静态路由，是指在前端代码中直接定义的路由，不依赖后端接口返回。适用于一些固定的页面，如首页、个人中心等。
静态路由文件位于 `src/router/routes/modules` 目录下：
| 路由模块 | antd 版本 | ele 版本 |
| --- | --- | --- |
| 首页 | [`dashboard.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/dashboard.ts) | [`dashboard.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/dashboard.ts) |
| 系统管理 | [`system.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/system.ts) | [`system.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/system.ts) |
| 基础设施 | [`infra.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/infra.ts) | [`infra.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/infra.ts) |
| AI 大模型 | [`ai.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/ai.ts) | [`ai.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/ai.ts) |
| 工作流程 | [`bpm.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/bpm.ts) | [`bpm.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/bpm.ts) |
| CRM 系统 | [`crm.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/crm.ts) | [`crm.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/crm.ts) |
| 商城系统 | [`mall.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/mall.ts) | [`mall.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/mall.ts) |
| 会员系统 | [`member.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/member.ts) | [`member.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/member.ts) |
| 支付系统 | [`pay.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/routes/modules/pay.ts) | [`pay.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/router/routes/modules/pay.ts) |
### # 1.2 动态路由
动态路由，代表那些需要根据用户动态判断权限，并通过 [addRoutes](https://router.vuejs.org/guide/advanced/dynamic-routing.html#adding-routes) 动态添加的页面，如用户管理、角色管理等功能页面。
在用户登录成功后，会触发 [`@/store/auth.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/store/auth.ts) 的 `fetchUserInfo` 方法，请求后端的菜单 RESTful API 接口，获取用户**有权限**的菜单列表，并存储到 `accessStore` 中。
之后，[`@/router/access.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/access.ts) 的 `generateAccess` 方法，会将菜单转化为路由并动态添加。
友情提示：
1. 动态路由可以在 [系统管理 -> 菜单管理] 进行新增和修改操作，请求的后端 RESTful API 接口是 [`/admin-api/system/auth/get-permission-info`](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/controller/admin/auth/AuthController.java#L107-L110)
1. 动态路由使用 `import.meta.glob` 实现路由懒加载，参考 [`@/router/access.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/router/access.ts) 中的 `pageMap` 定义
### # 1.3 路由跳转
使用 `useRouter` 的 `push` 方法，可以实现跳转到不同的页面。
import { useRouter } from 'vue-router';
const { push } = useRouter();
// 方式一：使用 path 跳转
push('/system/user');
// 方式二：使用 path 跳转，并设置 query 参数
push('/bpm/process-instance/detail?id=' + row.processInstance.id);
// 方式三（推荐）：使用 name 跳转，并设置 query 参数
push({ name: 'BpmProcessInstanceDetail', query: { id: row.processInstance.id } });
推荐使用 `name` 方式跳转，因为 `path` 方式在路由路径变更时需要同步修改，而 `name` 方式更加稳定。
## # 2. 菜单管理
项目的菜单在 [系统管理 -> 菜单管理] 进行管理，支持**无限**层级，提供目录、菜单、按钮三种类型。如下图所示：
![系统管理 -> 菜单管理](../images/03.png) 菜单可在 [系统管理 -> 角色管理] 被分配给角色。如下图所示：
![系统管理 -> 角色管理](../images/04.png) 
### # 2.1 新增目录
① 大多数情况下，目录是作为菜单的【分类】：
![新增目录 —— 菜单的分类](../images/05.png) ② 目录也提供实现【外链】的能力：
![新增目录 —— 外链](../images/06.png) 注意，默认会在【新窗口】打开外链接！如果希望通过 iframe 内嵌打开，则可以在外链拼接上 `?_iframe` 参数即可。
### # 2.2 新增菜单
![新增菜单](../images/07.png) 注意，“路由地址”可以通过 `?` 拼接[查询参数](https://doc.vben.pro/guide/essentials/route.html#query)，实现传递参数的功能。
### # 2.3 新增按钮
![新增按钮](../images/08.png) 
## # 3. 权限控制
前端通过权限控制，隐藏用户没有权限的按钮等，实现功能级别的权限。
友情提示：前端的权限控制，主要是提升用户体验，避免操作后发现没有权限。
最终在请求到后端时，还是会进行一次权限的校验。
更多可阅读 [《权限》](https://doc.vben.pro/guide/in-depth/access.html#%E6%8C%89%E9%92%AE%E7%BB%86%E7%B2%92%E5%BA%A6%E6%8E%A7%E5%88%B6) 的「按钮细粒度控制」。
另外，项目的 TableAction 组件的 `auth` 属性，可进行按钮级别的权限控制。示例如下：
- 实战案例（antd）：[apps/web-antd/src/views/system/post/index.vue](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-antd/src/views/system/post/index.vue)
- 实战案例（ele）：[apps/web-ele/src/views/system/post/index.vue](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/apps/web-ele/src/views/system/post/index.vue)
## # 4. 页面缓存
开启缓存时，需要将 `keepAlive` 设置为 `true`，如下所示：
友情提示：页面缓存是什么？
简单来说，Tab 切换时，开启页面缓存的 Tab 保持原本的状态，不进行刷新。
详细可见 [Vue 文档 —— KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)
### # 4.1 静态路由的示例
router 路由的 `keepAlive` 声明如下：
{
path: '/system/notify-message',
component: () => import('#/views/system/notify/my/index.vue'),
name: 'MyNotifyMessage',
meta: {
title: '我的站内信',
icon: 'ant-design:message-filled',
keepAlive: true, // 开启页面缓存
},
}
### # 4.2 动态路由的示例
![示例](../images/09.png) 
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[开发规范](/vben5/dev-spec/) [图标、主题、国际化](/vben5/icon-theme/) 
←
[开发规范](/vben5/dev-spec/) [图标、主题、国际化](/vben5/icon-theme/)→
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