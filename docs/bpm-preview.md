# 工作流演示

友情提示：BPM 全称是，业务流程管理（Business Process Management），实现工作流的功能
## # 1. 演示地址
### # 1.1 BPM 管理后台
- 演示地址：[http://dashboard-vue3.yudao.iocoder.cn/ (opens new window)](http://dashboard-vue3.yudao.iocoder.cn/)
- 菜单：“工作流程”下的「流程管理」「审批菜单」「OA 实例」等
- 仓库：[https://github.com/yudaocode/yudao-ui-admin-vue3 (opens new window)](https://github.com/yudaocode/yudao-ui-admin-vue3) 的 `bpm` 目录，基于 Vue3 + Element Plus 实现
![管理后台](/images/img_6a5934bf.png) 
### # 1.2 BPM 后端
支持 Spring Boot 单体、Spring Cloud 微服务架构
- 单体仓库： [https://github.com/YunaiV/ruoyi-vue-pro (opens new window)](https://github.com/YunaiV/ruoyi-vue-pro) 的 `yudao-module-bpm` 模块
- 微服务仓库： [https://github.com/YunaiV/yudao-cloud (opens new window)](https://github.com/YunaiV/yudao-cloud) 的 `yudao-module-bpm` 服务
## # 2. 工作流启动
参见 [《工作流手册 —— 功能开启》](/bpm/) 文档，一般 3 分钟就可以启动完成。
## # 3. 工作流交流
专属交流社区，欢迎扫码加入。
![示例流程](/images/zsxq_bpm.png) 微信扫描上方二维码，加入后可观看视频！
- [01、如何集成 Flowable 框架？ (opens new window)](https://t.zsxq.com/04aqfIiY3)
- [02、如何实现动态的流程表单？ (opens new window)](https://t.zsxq.com/04nun2RRz)
- [03、如何实现流程表单的保存？ (opens new window)](https://t.zsxq.com/04uneeaUb)
- [04、如何实现流程表单的展示？ (opens new window)](https://t.zsxq.com/04jiMrjAm)
- [05、如何实现流程模型的新建？ (opens new window)](https://t.zsxq.com/04iynUF6e)
- [06、如何实现流程模型的流程图的设计？ (opens new window)](https://t.zsxq.com/04rNVbEQB)
- [07、如何实现流程模型的流程图的预览？ (opens new window)](https://t.zsxq.com/042neybYz)
- [08、如何实现流程模型的分配规则？ (opens new window)](https://t.zsxq.com/04uburRvZ)
- [09、如何实现流程模型的发布？ (opens new window)](https://t.zsxq.com/04jUBMjyF)
- [10、如何实现流程定义的查询？ (opens new window)](https://t.zsxq.com/04MF6URvz)
- [11、如何实现流程的发起？ (opens new window)](https://t.zsxq.com/04jyvNfqj)
- [12、如何实现我的流程列表？ (opens new window)](https://t.zsxq.com/046UFqRzz)
- [13、如何实现流程的取消？ (opens new window)](https://t.zsxq.com/04aM72rzv)
- [14、如何实现流程的任务分配？ (opens new window)](https://t.zsxq.com/04rNvFI2f)
- [15、如何实现会签、或签任务？ (opens new window)](https://t.zsxq.com/04yFUVZvF)
- [16、如何实现我的待办任务列表？ (opens new window)](https://t.zsxq.com/04QZzjAme)
- [17、如何实现我的已办任务列表？ (opens new window)](https://t.zsxq.com/04uj6AQJE)
- [18、如何实现任务的审批通过？ (opens new window)](https://t.zsxq.com/04Q7UbqBM)
- [19、如何实现任务的审批不通过？ (opens new window)](https://t.zsxq.com/04BQvJM7y)
- [20、如何实现流程的审批记录？ (opens new window)](https://t.zsxq.com/04Ie2v7m2)
- [21、如何实现流程的流程图的高亮？ (opens new window)](https://t.zsxq.com/04R72rzzN)
- [22、如何实现工作流的短信通知？ (opens new window)](https://t.zsxq.com/04eyRRJ2f)
- [23、如何实现 OA 请假的发起？ (opens new window)](https://t.zsxq.com/04rFUjIei)
- [24、如何实现 OA 请假的审批？ (opens new window)](https://t.zsxq.com/04fMJiufQ)
## # 4. 功能描述
![BPM 功能列表](/images/bpm-feature.png) 基于 Flowable 构建，可支持信创（国产）数据库，满足中国特色流程操作：
历经头部企业生产验证，工作流引擎须标配仿钉钉/飞书 + BPMN 双设计器！！！
前者支持轻量配置简单流程，后者实现复杂场景深度编排
| 功能列表 | 功能描述 | 是否完成 |
| --- | --- | --- |
| SIMPLE 设计器 | 仿钉钉/飞书设计器，支持拖拽搭建表单流程，10 分钟快速完成审批流程配置 | ✅ |
| BPMN 设计器 | 基于 BPMN 标准开发，适配复杂业务场景，满足多层级审批及流程自动化需求 | ✅ |
| 会签 | 同一个审批节点设置多个人（如 A、B、C 三人，三人会同时收到待办任务），需全部同意之后，审批才可到下一审批节点 | ✅ |
| 或签 | 同一个审批节点设置多个人，任意一个人处理后，就能进入下一个节点 | ✅ |
| 依次审批 | （顺序会签）同一个审批节点设置多个人（如 A、B、C 三人），三人按顺序依次收到待办，即 A 先审批，A 提交后 B 才能审批，需全部同意之后，审批才可到下一审批节点 | ✅ |
| 抄送 | 将审批结果通知给抄送人，同一个审批默认排重，不重复抄送给同一人 | ✅ |
| 驳回 | （退回）将审批重置发送给某节点，重新审批。可驳回至发起人、上一节点、任意节点 | ✅ |
| 转办 | A 转给其 B 审批，B 审批后，进入下一节点 | ✅ |
| 委派 | A 转给其 B 审批，B 审批后，转给 A，A 继续审批后进入下一节点 | ✅ |
| 加签 | 允许当前审批人根据需要，自行增加当前节点的审批人，支持向前、向后加签 | ✅ |
| 减签 | （取消加签）在当前审批人操作之前，减少审批人 | ✅ |
| 撤销 | （取消流程）流程发起人，可以对流程进行撤销处理 | ✅ |
| 终止 | 系统管理员，在任意节点终止流程实例 | ✅ |
| 表单权限 | 支持拖拉拽配置表单，每个审批节点可配置只读、编辑、隐藏权限 | ✅ |
| 超时审批 | 配置超时审批时间，超时后自动触发审批通过、不通过、驳回等操作 | ✅ |
| 自动提醒 | 配置提醒时间，到达时间后自动触发短信、邮箱、站内信等通知提醒，支持自定义重复提醒频次 | ✅ |
| 父子流程 | 主流程设置子流程节点，子流程节点会自动触发子流程。子流程结束后，主流程才会执行（继续往下下执行），支持同步子流程、异步子流程 | ✅ |
| 条件分支 | （排它分支）用于在流程中实现决策，即根据条件选择一个分支执行 | ✅ |
| 并行分支 | 允许将流程分成多条分支，不进行条件判断，所有分支都会执行 | ✅ |
| 包容分支 | （条件分支 + 并行分支的结合体）允许基于条件选择多条分支执行，但如果没有任何一个分支满足条件，则可以选择默认分支 | ✅ |
| 路由分支 | 根据条件选择一个分支执行（重定向到指定配置节点），也可以选择默认分支执行（继续往下执行） | ✅ |
| 触发节点 | 执行到该节点，触发 HTTP 请求、HTTP 回调、更新数据、删除数据等 | ✅ |
| 延迟节点 | 执行到该节点，审批等待一段时间再执行，支持固定时长、固定日期等 | ✅ |
| 拓展设置 | 流程前置/后置通知，节点（任务）前置、后置通知，流程报表，自动审批去重，自定流程编号、标题、摘要，流程报表等 | ✅ |
### # 4.1 BPMN 流程设计器
![BPMN](/images/BPMN.png) 
- [《流程设计器（BPMN）》](/bpm/model-designer-bpmn/)
- [《选择审批人、发起人自选》](/bpm/assignee/)
- [《会签、或签、依次审批》](/bpm/multi-instance/)
- [《执行监听器、任务监听器》](/bpm/listener/)
- [《流程表达式》](/bpm/expression/)
### # 4.2 钉钉（飞书）流程设计器
![钉钉](/images/img_1e7c9dcf.png) 
- [《流程设计器（钉钉、飞书）》](/bpm/model-designer-dingding/)
### # 4.3 审批界面
![审批界面](/images/img_04d0ae91.png) 
- [《审批接入（流程表单）》](/bpm/use-bpm-form/)
- [《审批接入（业务表单）》](/bpm/use-business-form/)
- [《流程发起、取消、重新发起》](/bpm/process-instance/)
- [《审批通过、不通过、驳回》](/bpm/task-todo-done/)
- [《审批加签、减签》](/bpm/sign/)
- [《审批转办、委派、抄送》](/bpm/task-delegation-and-cc/)
- [《流程审批通知》](/bpm/message/)
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[限流熔断](/server-protection/) [功能开启](/bpm/) 
←
[限流熔断](/server-protection/) [功能开启](/bpm/)→
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