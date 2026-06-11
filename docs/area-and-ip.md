# 地区 &amp; IP 库

[`yudao-spring-boot-starter-biz-ip`](https://github.com/YunaiV/ruoyi-vue-pro/tree/master/yudao-framework/yudao-spring-boot-starter-biz-ip) 业务组件，提供地区 & IP 库的封装。
## # 1. 地区
[AreaUtils](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-ip/src/main/java/cn/iocoder/yudao/framework/ip/core/utils/AreaUtils.java) 是地区工具类，可以查询中国的省、市、区县，也可以查询国外的国家。
数据来源：
原数据来自 [Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China) 项目；由于该项目已停止更新（数据停留在 2023 年版本），现已切换为兼容 [AreaCity-JsSpider-StatsGov](https://github.com/xiangyuecn/AreaCity-JsSpider-StatsGov) 的 csv 数据：
- 当前版本：`2025.251231.260403`（2026-04-03 发布）
- 整合数据源：国家地名信息库 2025-12-31、腾讯地图行政区划 2025-11-19、高德地图行政区划（采集当天）
- csv 转换脚本：[yudao-cloud#247](https://gitee.com/zhijiantianya/yudao-cloud/pulls/247)
它的数据最终整理到项目的 [area.csv](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-ip/src/main/resources/area.csv) 文件。每一行的数据，对应 [Area](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-ip/src/main/java/cn/iocoder/yudao/framework/ip/core/Area.java) 对象。代码所示：
public class Area {
/**
* 编号
*/
private Integer id;
/**
* 名字
*/
private String name;
/**
* 类型
*
* 枚举 {@link AreaTypeEnum}
* 1 - 国家
* 2 - 省份
* 3 - 城市
* 4 - 地区, 例如说县、镇、区等
*/
private Integer type;
/**
* 父节点
*/
private Area parent;
/**
* 子节点
*/
private List children;
}
AreaUtils 主要有如下两个方法：
// AreaUtils.java
/**
* 获得指定编号对应的区域
*
* @param id 区域编号
* @return 区域
*/
public static Area getArea(Integer id) {
// ... 省略具体实现
}
/**
* 格式化区域
*
* 例如说：
*      1. id = “静安区”时：上海 上海市 静安区
*      2. id = “上海市”时：上海 上海市
*      3. id = “上海”时：上海
*      4. id = “美国”时：美国
* 当区域在中国时，默认不显示中国
*
* @param id 区域编号
* @param separator 分隔符
* @return 格式化后的区域
*/
public static String format(Integer id, String separator) {
// ... 省略具体实现
}
- 具体的使用，可见 [AreaUtilsTest](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-ip/src/test/java/cn/iocoder/yudao/framework/ip/core/utils/AreaUtilsTest.java) 测试类。
另外，管理后台提供了 [系统管理 -> 地区管理] 菜单，可以按照树形结构查看地区列表。如下图所示：
![地区管理](/images/img_d951bae5.png) 
- 后端代码，对应 [AreaController](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/controller/admin/ip/AreaController.java#L29-L35) 的 `/admin-api/system/area/tree` 接口
- 前端代码，对应 [system/area/index.vue](https://github.com/yudaocode/yudao-ui-admin-vue2/blob/master/src/views/system/area/index.vue) 界面
## # 2. IP
[IPUtils](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-ip/src/main/java/cn/iocoder/yudao/framework/ip/core/utils/IPUtils.java) 是 IP 工具类，可以查询 IP 对应的城市信息。
它的数据来自 [ip2region](https://gitee.com/lionsoul/ip2region) 项目，最终整理到项目的 [ip2region.xdb](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-ip/src/main/resources/ip2region.xdb) 文件。
IPUtils 主要有如下两个方法：
// IPUtils.java
/**
* 查询 IP 对应的地区编号
*
* @param ip IP 地址，格式为 127.0.0.1
* @return 地区id
*/
public static Integer getAreaId(String ip) {
// ... 省略具体实现
}
/**
* 查询 IP 对应的地区
*
* @param ip IP 地址，格式为 127.0.0.1
* @return 地区
*/
public static Area getArea(String ip) {
// ... 省略具体实现
}
- 具体的使用，可见 [IPUtilsTest](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-framework/yudao-spring-boot-starter-biz-ip/src/test/java/cn/iocoder/yudao/framework/ip/core/utils/IPUtilsTest.java) 测试类。
另外，管理后台提供了 [系统管理 -> 地区管理] 菜单，也提供了 IP 查询城市的示例。如下图所示：
![IP 查询城市](/images/img_3369ee76.png) 
- 后端代码，对应 [AreaController](https://github.com/YunaiV/ruoyi-vue-pro/blob/master/yudao-module-system/src/main/java/cn/iocoder/yudao/module/system/controller/admin/ip/AreaController.java#L37-L48) 的 `/admin-api/system/area/get-by-ip` 接口
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[敏感词](/sensitive-word/) [开发环境](/dev-env/) 
←
[敏感词](/sensitive-word/) [开发环境](/dev-env/)→
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