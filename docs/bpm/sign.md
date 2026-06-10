# 审批加签、减签

本文，我们来讲解下审批加签、减签的功能：
- 加签：添加其他审批人来共同审批，自己仍需参与审批。例如，不好判断当前审批时，可以添加其他人来共同审批
- 减签：当以“加签”的方式添加了其他审批人时，可以操作减签进行移除，对方无需再审批。例如，加签有误时，可以通过减签来操作
其中，加签分成两种：
- 向前加签：在任务 A 之【前】添加 B、C、D 三个子任务，在 B、C、D 子任务都审批完成后，任务 A 才能继续审批
- 向后加签：在任务 A 之【后】添加 B、C、D 三个子任务，在任务 A 审批通过（处于审批通过中），只有 B、C、D 三个子任务都审批通过，任务 A 才会审批通过
## # 1. 向前加签
### # 1.1 发起向前加签
#### # 1.1.1 操作步骤
① 首先，点击「加签」按钮，选择被加签的处理人，之后点击「向前加签」按钮，完成向前加签操作。如下图所示：
![向前加签](../images/img_9475a033.png) ② 之后，可以看到当前任务变成“待审核”状态，它有加签出来的一个子任务，该子任务的状态是“待审核”状态，如下图所示：
![向前加签子任务](../images/img_110d4d9a.png) 
#### # 1.1.2 后端实现
对应 BpmTaskController 的 `#createSignTask(...)` 方法，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![向前加签的实现](../images/img_fdbda63f.png) 
- 红圈 ① 的 `2.2` 处：需要将当前任务的 `assignee` 置空，并保存到 `owner` 中，避免它被审批。因为它如何被审批，就会直接进入下一个节点，而不会等待加签的子任务审批完成，显然这不是我们所希望的
- 红圈 ② 的 `2.4` 处：通过 `scopeType` 标记当前任务是向前还是向后加签，因为一个任务不能同时向前和向后加签。这里，我们将 `scopeType` 设置为 `before`，表示向前加签
- 红圈 ③ 的 `2.6` 处：更新当前任务的状态为 `WAITING`，表示当前任务处于“待审核状态”
- 红圈 ④ 的 `3.` 处：调用 `#createSignTaskList(...)` 方法，创建加签的子任务，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![向前加签子任务的实现](../images/img_a795b743.png) 
- 红圈 ⑤ 的 `1` 处：创建加签的子任务，将当前任务的属性部分复制给改子任务
- 红圈 ⑥ 的 `2.1` 处：设置向前加签的子任务的 `assignee` 审批人
- 红圈 ⑦ 的 `2.3` 处：真正保存加签的子任务
### # 1.2 审批向前加签子任务
#### # 1.2.1 操作步骤
登录账号 test、密码 test123 的用户，审批加签任务。
① 和普通审批一样，点击【通过】按钮，将子任务审批通过，如下图所示：
![审批向前加签子任务](../images/img_da0e3eea.png) ② 之后，可以看到当前（原）任务又变回“待审核”状态，加签出来的子任务处于“审核通过”状态，如下图所示：
![审批向前加签子任务后](../images/img_619f6a63.png) 后续，我们登录回之前的账号，继续审批当前（原）任务即可。
#### # 1.2.2 后端实现
因为和普通审批一样，所以对应的还是 BpmTaskController 的 `#approveTask(...)` 方法，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![审批向前加签子任务的实现](../images/img_6584326f.png) 关键还是 `#handleParentTaskIfSign(...)` 方法，在向前加签的情况下，需要将当前（原）任务又变回“待审核”状态。如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![处理加签的父任务](../images/img_cb69ccd0.png) 
- 红圈 ① 的 `1.1` 处：由于可以加签多个子任务，所以需要全部审批通过后才能继续审批当前（原）任务
- 红圈 ② 的 `2.` 处：清空当前（原）任务的 `scopeType` 属性，表示当前任务不再处于加签状态，这样它后续可以自由的向前或是向后继续加签
- 红圈 ③ 的 `3.1` 处：恢复当前（原）任务的 `assignee` 审批人，并更新状态回 `RUNNING` 审批中
- 红圈 ④ 的 `4.` 处：由于加签出来的子任务，自身可以继续被加签，所以需要递归向上处理。如果要体验一下，就在「1.2.1 操作步骤」时，不要审批通过，而是加签
## # 2. 向后加签
### # 2.1 发起向后加签
#### # 2.1.1 操作步骤
① 首先，点击「加签」按钮，选择被加签的处理人，之后点击「向后加签」按钮，完成向后加签操作。如下图所示：
![向后加签](../images/img_d31a1c0f.png) ② 之后，可以看到当前任务变成“审核中”状态，它有加签出来的一个子任务，该子任务的状态是“待审核”状态，如下图所示：
![向后加签子任务](../images/img_67c93107.png) 
### # 2.2 审批向后加签子任务
对应 BpmTaskController 的 `#createSignTask(...)` 方法，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![审批向后加签子任务的实现](../images/img_f90e181c.png) 
- 相比于向前加签，向后加签的实现更加简单，因为它不需要处理当前（原）任务的状态，只需要创建加签的子任务即可
调用 `#createSignTaskList(...)` 方法，创建加签的子任务，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![向后加签子任务的实现](../images/img_cbdc6195.png) 
- 红圈 ① 的 `1` 处：创建的向后加签的子任务，只将 `owner` 设置为选择加签的处理人，不包括 `assignee` 审批人。原因是，需要等到当前（原）任务审批通过后，才会设置 `assignee` 审批人
- 红圈 ② 的 `2.` 处：设置向后加签的子任务的状态为 `WAITING` 待审核状态。原因是，当前（原）任务审批通过后，才会设置子任务为 `RUNNING` 审批中
### # 2.2 审批当前（原）任务
### # 2.2.1 操作步骤
不用切换账号！直接审批当前（原）任务即可。
点击【通过】按钮，将当前（原）任务审批通过，如下图所示：
![审批当前任务](../images/img_a9f98446.png) 可以看到当前（原）任务变成 `APPROVING` “审批通过中”状态，加签出来的子任务变成 `RUNNING` 审批中状态。
### # 2.2.2 后端实现
对应 BpmTaskController 的 `#createSignTask(...)` 方法，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![审批当前任务的实现](../images/img_844525b6.png) 核心实现在 `#approveAfterSignTask(...)` 方法，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![审批当前任务的实现2](../images/img_0fd4195a.png) 
- 对于当前（原）任务来说，任务变成 `APPROVING` “审批通过中”状态
- 对于被加签出来的子任务来说，任务变成 `RUNNING` “审批中”状态，并设置 `assignee` 审批人。也就是说，被加签的人可以开始审批啦~
### # 2.3 审批向后加签子任务
#### # 2.3.1 操作步骤
登录账号 test、密码 test123 的用户，审批加签任务。
点击【通过】按钮，将后向加签的子任务审批通过，如下图所示：
![审批向后加签子任务](../images/img_aff4b2cd.png) 可以看到当前（原）任务变成 `APPROVE` “审批通过”状态，加签出来的子任务也变成 `APPROVE` “审批通过”状态。
#### # 2.3.2 后端实现
对应 BpmTaskController 的 `#createSignTask(...)` 方法，核心实现在 `#handleParentTaskIfSign(...)` 方法，如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![审批向后加签子任务的具体实现](../images/img_02abbfc1.png) 
- 红圈部分，当前（原）任务变成 `APPROVE` “审批通过”状态，并调用 `TaskService#complete(...)` 方法来完成
友情提示：
向前、向后加签的逻辑，整体可能有点弯弯绕绕~
大家在理解的时候，可以找个纸头画一画，这样会更加清晰~ 
## # 3. 减签
### # 3.1 操作步骤
① 点击【减签】按钮，获得可减钱的任务列表，如下图所示：
![减签列表](../images/img_1b1e9515.png) ② 选择需要减签的任务，点击【减签】按钮，完成减签操作。如下图所示：
![减签结果](../images/img_c9587839.png) 
### # 3.2 后端实现
① 获得可减钱的任务列表，对应 BpmTaskController 的 `#getTaskListByParentTaskId(...)` 方法。如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![获得减签任务列表的实现](../images/img_d72958a3.png) ② 执行减签操作，对应 BpmTaskController 的 `#deleteSignTask(...)` 方法。如下图所示：
图片纠错：最新版本不区分 yudao-module-bpm-api 和 yudao-module-bpm-biz 子模块，代码直接合并到 yudao-module-bpm 模块的 src 目录下，更适合单体项目
![减签操作的实现](../images/img_053a5d28.png) 
- 红圈 ① 的 `2.1`、`2.2` 处：获得所有的子任务列表，一方面更新它们为 `CANCEL` “已取消”状态，另一方面调用 `TaskService#deleteTasks(...)` 删除它们
- 红圈 ② 的 `4.` 处：需要调用 `#handleParentTaskIfSign(...)` 方法，处理当前（原）任务的状态，不然该任务的状态就一直卡在加签的情况下了
.pageB img{width:80px!important;}
.wwads-horizontal .wwads-text, .wwads-content .wwads-text{line-height:1;}
[审批通过、不通过、驳回](/bpm/task-todo-done/) [审批转办、委派、抄送](/bpm/task-delegation-and-cc/) 
←
[审批通过、不通过、驳回](/bpm/task-todo-done/) [审批转办、委派、抄送](/bpm/task-delegation-and-cc/)→
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