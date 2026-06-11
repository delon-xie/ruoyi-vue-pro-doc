# 敏感词

友情提示：
最新版本的代码，已经移除“敏感词”功能。原因是，该功能比较小众，可能只有极少数的用户需要~
如果你系统里需要，可以参考 [9a31613（后端）](https://gitee.com/zhijiantianya/ruoyi-vue-pro/commit/9a31613e5b766977df62a4977a40ef08bdeefa0b)、[0925253（前端）](https://gitee.com/yudaocode/yudao-ui-admin-vue3/commit/0925253a9dd0e3d9502178fc5c8f4a907eaeb852) 把代码复制、粘贴回来。
本章节，介绍项目的敏感词功能，可用于文本检测，高效过滤色情、广告、敏感、暴恐等违规内容。例如说，用户昵称、评论、私信等文本内容，都可以使用敏感词功能进行过滤。
## # 1. 实现原理
敏感词采用 [前缀树](https://zh.m.wikipedia.org/zh-hans/Trie) 算法，，核心代码见 [SimpleTrie](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/util/collection/SimpleTrie.java) 类。
## # 2. 使用教程
对应的管理后台，可以在 [系统管理 -> 敏感词] 菜单，进行敏感词的管理。如下图所示：
![敏感词管理](/images/img_4ef7a772.png) 
- 前端实现：[sensitiveWord/index.vue](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/system/sensitiveWord/index.vue)
- 后端实现：[SensitiveWordController](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sensitiveword/SensitiveWordController.java)
### # 2.1 添加敏感词
![添加敏感词](/images/img_099cb7ab.png) 
- 标签：用于敏感词分组，不同的场景会需要使用不同的敏感词，通过标签进行分组。
添加完敏感词后，刷新下界面。
### # 2.2 测试敏感词
① 输入检测文本为“你是白痴么？”，选择标签为“测试”，检测到有敏感词：
![测试敏感词](/images/img_f327ac4d.png) ② 选择标签为“蔬菜”，检测到米有敏感词：
![测试敏感词](/images/img_041de288.png) 
## # 3. 敏感词的使用
[SensitiveWordApi](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/yudao-module-system-api/src/main/java/cn/iocoder/yudao/module/system/api/sensitiveword/SensitiveWordApi.java) 提供了敏感词的 API 接口，可以在任意地方使用。方法如下：
public interface SensitiveWordApi {
/**
* 获得文本所包含的不合法的敏感词数组
*
* @param text 文本
* @param tags 标签数组
* @return 不合法的敏感词数组
*/
List validateText(String text, List tags);
/**
* 判断文本是否包含敏感词
*
* @param text 文本
* @param tags 表述数组
* @return 是否包含
*/
boolean isTextValid(String text, List tags);
}
使用步骤如下：
① 在需要使用的 `yudao-module-*` 模块的 `pom.xml` 中，引入 `yudao-module-system` 依赖。代码如下：
cn.iocoder.boot
yudao-module-system
${revision}
② 注入 SensitiveWordApi Bean，调用对应的方法即可。例如说：
@Service
public class DemoService {
@Resource
private SensitiveWordApi sensitiveWordApi;
public void demo() {
sensitiveWordApi.validateText("你是白痴吗", Collections.singletonList("测试"));
sensitiveWordApi.isTextValid("你是白痴吗", Collections.singletonList("蔬菜"));
}
}
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[数据脱敏、字段权限](/desensitize/) [地区 & IP 库](/area-and-ip/) 
←
[数据脱敏、字段权限](/desensitize/) [地区 & IP 库](/area-and-ip/)→
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