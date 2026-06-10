# IM 演示

## # 1. 演示地址
### # 1.1 IM 管理后台
- 演示地址：[http://dashboard-vue3.yudao.iocoder.cn/ (opens new window)](http://dashboard-vue3.yudao.iocoder.cn/)
- 菜单："IM 即时通讯"下的「聊天」「运营管理」「内容管理」「数据统计」
- 仓库：[https://github.com/yudaocode/yudao-ui-admin-vue3 (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3) 的 `im` 目录，基于 Vue3 + Element Plus 实现
| 聊天界面 | 聊天管理 |
| --- | --- |
| ![聊天界面](/images/im-preview-home.png) ![聊天管理](/images/im-preview-manager.png) ### # 1.2 IM 后端 支持 Spring Boot 单体、Spring Cloud 微服务架构。 - 单体仓库： [https://github.com/YunaiV/ruoyi-vue-pro (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro) 的 `yudao-module-im` 模块 - 微服务仓库： [https://github.com/YunaiV/yudao-cloud (opens new window)](https://github.com/YunaiV/yudao-cloud) 的 `yudao-module-im` 服务 ## # 2. IM 启动 参见 [《IM 即时通讯手册 —— 功能开启》](/im/build/) 文档，一般 3 分钟就可以启动完成。 ## # 3. IM 交流 专属交流社区，欢迎扫码加入。 ![交流群](/images/zsxq_im.png) ## # 4. 功能描述 IM 即时通讯系统，提供管理后台内置的聊天能力，主要包含聊天界面和聊天管理两部分。 ### # 4.1 聊天界面 对应 `yudao-ui-admin-vue3` 项目的 `@/views/im/home` 目录，提供全屏聊天工作台： - 消息：私聊、群聊、频道消息三类会话，使用 IndexedDB 本地缓存会话、消息、草稿和基础资料。 - 通讯录：好友列表、好友申请、群列表、加群申请。 - 消息类型：文本、图片、语音、视频、文件、表情、名片、合并转发、频道素材。 - 消息动作：发送、撤回、引用回复、已读回执、@ 成员、群消息置顶。 - 好友关系：申请、同意、拒绝、删除、备注、置顶、免打扰、拉黑。 - 群组管理：创建群、邀请入群、申请进群、退群、移除成员、群主转让、管理员设置、群公告、全员禁言、成员禁言、入群审批。 - 音视频通话：支持私聊单人通话、群聊多人通话，可发起语音通话、视频通话和共享屏幕。 ### # 4.2 聊天管理 对应 `yudao-ui-admin-vue3` 项目的 `@/views/im/manager` 目录，菜单包括： - 数据统计：查看总用户、总群组、日活用户、今日消息、消息趋势、用户趋势、消息类型分布、群规模分布、消息发送 TOP 10。 - 私聊管理：包含好友列表、好友申请、好友消息，用于查询好友关系、申请记录和私聊消息。 - 群聊管理：包含群聊列表、群聊申请、群聊消息，用于查询群信息、入群申请和群聊消息。 - 通话记录：查看音视频通话记录、参与人、通话状态、通话时长和结束原因。 - 敏感词管理：维护敏感词内容、标签和启用状态。 - 表情管理：包含系统表情、用户表情，用于维护表情包、表情图和用户上传的个人表情。 - 频道管理：包含频道列表、频道素材、频道消息，用于维护频道、图文素材和推送记录。 ## # 5. 表结构 IM 共 **16** 张业务表，表名统一以 `im_` 为前缀： 模块 | 子前缀 | 表数量 | 核心职责 |
| 消息中心 | `im_private_message` / `im_group_message` | 2 | 私聊、群聊消息入库，记录消息类型、内容、状态、发送时间 |
| 好友关系 | `im_friend*` | 2 | 双向好友关系、好友申请、备注、置顶、拉黑、免打扰 |
| 群组管理 | `im_group*` | 3 | 群信息、群成员、入群申请、群角色、禁言、群置顶消息 |
| 频道推送 | `im_channel*` | 3 | 频道、图文素材、频道消息推送记录 |
| 音视频通话 | `im_rtc*` | 2 | 通话主记录、参与者状态、接通与结束时间 |
| 其他 | `im_face*` / `im_sensitive_word` | 4 | 表情包、用户表情、消息敏感词配置 |
### # 5.1 消息中心
消息中心保存私聊和群聊两类用户聊天消息：
- `im_private_message`：私聊消息表，按发送人、接收人记录消息。
- `im_group_message`：群聊消息表，按发送人、群编号记录消息，支持 @ 成员、定向可见、群回执。
频道消息保存到 `im_channel_message`，在本文档的「频道推送」中单独说明。
### # 5.2 好友关系
好友关系分为好友主表和申请记录：
- `im_friend`：好友关系表，一条记录表示用户侧对某个好友的单边关系。
- `im_friend_request`：好友申请记录表，记录申请理由、处理结果、处理时间。
### # 5.3 群组管理
群组管理围绕群信息、成员和申请记录展开：
- `im_group`：群信息表，记录群名称、群主、头像、公告、封禁、全员禁言、入群审批等信息。
- `im_group_member`：群成员表，记录成员角色、群昵称、群备注、免打扰、禁言到期时间等信息。
- `im_group_request`：加群申请记录表，记录主动申请或邀请入群的处理过程。
### # 5.4 频道推送
频道推送用于运营侧图文消息：
- `im_channel`：频道表。
- `im_channel_material`：频道素材表，支持站内富文本和外链两类素材。
- `im_channel_message`：频道消息表，记录素材推送快照和接收人范围。
### # 5.5 音视频通话
音视频通话由两张表记录：
- `im_rtc_call`：通话记录表，一通通话一行，记录会话类型、媒体类型、发起人、状态和结束原因。
- `im_rtc_participant`：通话参与者表，一通通话中每个参与者一行，记录邀请、接听、离开等时间。
### # 5.6 其他
① 表情体系，包含系统表情包和用户个人表情：
- `im_face_pack`：系统表情包表。
- `im_face_pack_item`：系统表情包项表。
- `im_face_user_item`：用户私有表情表。
② 内容安全，用于文本消息发送前的敏感词校验：
- `im_sensitive_word`：敏感词表。
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[【其它】WMS、MES、ERP 对比](/wms/compare/) [功能开启](/im/build/) 
←
[【其它】WMS、MES、ERP 对比](/wms/compare/) [功能开启](/im/build/)→
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