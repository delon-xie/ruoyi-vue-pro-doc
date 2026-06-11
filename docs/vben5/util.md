# 通用方法

本小节，分享前端项目的常用方法和工具类。
## # 1. 缓存配置
### # 1.1 说明
项目使用 [`StorageManager`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/packages/@core/base/shared/src/cache/storage-manager.ts) 类进行本地存储管理，支持 `localStorage` 和 `sessionStorage` 两种存储方式，并提供了超时时间设置功能。
### # 1.2 使用示例
```javascript
import { StorageManager } from '@vben/utils';

// 创建存储管理器实例
const storage = new StorageManager({
  prefix: 'vben',           // 存储键前缀
  storageType: 'localStorage' // 存储类型：'localStorage' | 'sessionStorage'
});

// 设置存储项（可选设置过期时间，单位：毫秒）
storage.setItem('user', { name: '芋道源码' }, 3600000); // 1小时后过期

// 获取存储项
const user = storage.getItem('user');

// 获取存储项（带默认值）
const config = storage.getItem('config', { theme: 'light' });

// 移除存储项
storage.removeItem('user');

// 清除所有带前缀的存储项
storage.clear();

// 清除所有过期的存储项
storage.clearExpiredItems();
```
## # 2. 工具类
项目的工具类分为两层：全局工具类和项目专属工具类。
### # 2.1 全局工具类
全局工具类位于 [`packages/@core/base/shared/src/utils`](https://github.com/yudaocode/yudao-ui-admin-vben/tree/master/packages/@core/base/shared/src/utils) 目录，通过 `@vben/utils` 包导出，供所有项目共享使用。
| 文件 | 作用 |
| --- | --- |
| `date.ts` | 日期格式化、时区设置 |
| `time.ts` | 相对时间、时间问候语、日期范围计算 |
| `tree.ts` | 树形结构构建、遍历、过滤、映射 |
| `download.ts` | 文件下载（URL、Base64、Blob） |
| `upload.ts` | 文件上传辅助（类型检查、大小格式化） |
| `formatNumber.ts` | 金额转换（分/元）、ERP 数字格式化 |
| `inference.ts` | 类型判断（isEmpty、isNumber 等） |
| `encrypt.ts` | AES/RSA 加解密 |
| `uuid.ts` | UUID 生成 |
| `util.ts` | 通用工具（嵌套取值、URL 参数、分组等） |
| `dom.ts` | DOM 操作辅助 |
| `merge.ts` | 对象深度合并 |
| `window.ts` | 窗口操作（打开新窗口等） |
### # 2.2 项目专属工具类
各项目有自己的工具类目录，用于存放项目特有的工具方法：
- antd 版本：[`apps/web-antd/src/utils`](https://github.com/yudaocode/yudao-ui-admin-vben/tree/master/apps/web-antd/src/utils)
- ele 版本：[`apps/web-ele/src/utils`](https://github.com/yudaocode/yudao-ui-admin-vben/tree/master/apps/web-ele/src/utils)
| 文件 | 作用 |
| --- | --- |
| `routerHelper.ts` | 路由辅助方法 |
| `rangePickerProps.ts` | 日期范围选择器的快捷选项配置 |
| `useUpload.ts` | 文件上传 Hook |
## # 3. 枚举类
项目在 [`@vben/constants`](https://github.com/yudaocode/yudao-ui-admin-vben/tree/master/packages/constants/src) 包中定义了枚举类，分为字典枚举和业务枚举两类。
### # 3.1 字典枚举
字典枚举定义在 [`dict-enum.ts`](https://github.com/yudaocode/yudao-ui-admin-vben/blob/master/packages/constants/src/dict-enum.ts) 中，对应后端字典管理的字典类型 KEY，用于获取字典数据。
字典枚举配合字典工具类使用，详见 [字典数据](/vben5/dict) 章节。
### # 3.2 业务枚举
业务枚举定义在 `biz-*.ts` 文件中，用于前端业务逻辑判断，避免"魔法值"。
| 文件 | 模块 |
| --- | --- |
| `biz-system-enum.ts` | 系统模块（状态、菜单类型、角色类型等） |
| `biz-infra-enum.ts` | 基础设施模块（代码生成、任务状态等） |
| `biz-pay-enum.ts` | 支付模块（支付渠道、订单状态等） |
| `biz-bpm-enum.ts` | 工作流模块（节点类型、任务状态等） |
| `biz-mall-enum.ts` | 商城模块（商品状态、订单状态等） |
| `biz-ai-enum.ts` | AI 模块（平台、模型类型等） |
| `biz-iot-enum.ts` | IoT 模块（设备状态、产品类型等） |
| `biz-erp-enum.ts` | ERP 模块（审批状态等） |
| `biz-mp-enum.ts` | 公众号模块 |
使用示例：
```javascript
import { CommonStatusEnum, SystemMenuTypeEnum } from '@vben/constants';

// 通用状态
if (status === CommonStatusEnum.ENABLE) { /* 开启 */ }
if (status === CommonStatusEnum.DISABLE) { /* 禁用 */ }

// 菜单类型判断
if (menuType === SystemMenuTypeEnum.DIR) { /* 目录 */ }
if (menuType === SystemMenuTypeEnum.MENU) { /* 菜单 */ }
if (menuType === SystemMenuTypeEnum.BUTTON) { /* 按钮 */ }
```
