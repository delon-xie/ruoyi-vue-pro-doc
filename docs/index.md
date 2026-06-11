---
layout: home
hero:
  name: RuoYi-Vue-Pro
  text: 企业级快速开发平台
  tagline: 基于 Spring Boot + Vue3 的全栈解决方案
  actions:
    - theme: brand
      text: 快速开始
      link: /project-intro
    - theme: alt
      text: 功能列表
      link: /feature
features:
  - icon: 🚀
    title: 快速开发
    details: 基于 Spring Boot + MyBatis Plus + Vue3 + Element Plus，提供代码生成器，快速构建 CRUD 功能
  - icon: 🏢
    title: 企业级架构
    details: 模块化设计，支持多租户、数据权限、工作流、支付系统等企业级功能
  - icon: 🤖
    title: AI 大模型
    details: 内置 AI 模块，支持 OpenAI、Azure、智谱、百度、阿里等多种大模型接入
  - icon: 📊
    title: 业务系统
    details: 内置 CRM、ERP、WMS、MES、商城、IoT 等完整业务系统模块
  - icon: 🔐
    title: 安全可靠
    details: 基于 Spring Security 实现 RBAC 权限控制，支持 OAuth2、社交登录、数据脱敏
  - icon: 📱
    title: 多端支持
    details: 支持 Vue2/Vue3/Vben5 多套前端，支持微信小程序、公众号、UniApp 多端
---

## 📦 核心模块

| 模块 | 说明 | 文档 |
| --- | --- | --- |
| **System** | 系统管理（用户、角色、菜单、字典） | [查看](/user-center) |
| **Infrastructure** | 基础设施（文件、短信、邮件、代码生成） | [查看](/file) |
| **Member** | 会员中心（会员、等级、积分） | [查看](/member/build) |
| **BPM** | 工作流程（Flowable 流程引擎） | [查看](/bpm/bpm) |
| **Pay** | 支付系统（微信、支付宝、钱包） | [查看](/pay/build) |
| **AI** | AI 大模型（聊天、知识库、图片生成） | [查看](/ai/build) |
| **CRM** | 客户管理（线索、商机、合同、回款） | [查看](/crm/build) |
| **ERP** | 企业资源（采购、销售、仓库） | [查看](/erp/build) |
| **Mall** | 商城系统（商品、订单、营销、售后） | [查看](/mall/build) |
| **WMS** | 仓储管理（入库、出库、盘点） | [查看](/wms/build) |
| **MES** | 生产执行（工单、报工、质检） | [查看](/mes/build) |
| **IoT** | 物联网（设备、协议、OTA） | [查看](/iot/build) |
| **MP** | 微信公众号（菜单、消息、素材） | [查看](/mp/build) |
| **IM** | 即时通讯（WebSocket 聊天） | [查看](/im/build) |

## 🛠 技术栈

### 后端
- **框架**：Spring Boot 2.7、Spring Security、MyBatis Plus
- **数据库**：MySQL、Redis、MongoDB（可选）
- **消息队列**：Redis、RabbitMQ、RocketMQ、Kafka
- **工作流**：Flowable 6.x
- **其他**：Quartz（定时任务）、EasyExcel（Excel）、Swagger（API 文档）

### 前端
- **Vue3 版本**：Vue 3 + Element Plus + Vite
- **Vue2 版本**：Vue 2 + Element UI
- **Vben5 版本**：Vue 3 + Ant Design Vue + Vben Admin
- **移动端**：UniApp（小程序、H5、App）

## 🚀 快速开始

### 环境要求
- JDK 8/11/17
- MySQL 5.7/8.0
- Redis 5.x+

### 启动步骤

1. **克隆项目**
```bash
git clone https://github.com/YunaiV/ruoyi-vue-pro.git
```

2. **导入数据库**
执行 `sql/mysql/ruoyi-vue-pro.sql` 创建数据库和表

3. **启动后端**
修改 `application-local.yaml` 配置数据库和 Redis，启动 `YudaoServerApplication`

4. **启动前端**
```bash
cd yudao-ui-admin-vue3
pnpm install
pnpm dev
```

详细步骤请查看 [快速开始](/quick-start) 和 [快速开始-前端](/quick-start-front)

## 📖 文档导航

### 入门指南
- [项目简介](/project-intro) - 项目结构和模块说明
- [快速开始](/quick-start) - 后端环境搭建和启动
- [快速开始-前端](/quick-start-front) - 前端环境搭建和启动
- [技术方案](/technology) - 技术选型和架构设计

### 开发指南
- [环境搭建](/dev-env) - 开发环境配置
- [新建模块](/module-new) - 如何创建新模块
- [代码生成](/vo) - 使用代码生成器
- [数据权限](/data-permission) - 数据权限配置

### 部署指南
- [Linux 部署](/deployment-linux)
- [Docker 部署](/deployment-docker)
- [1Panel 部署](/deployment-1panel)

### 更新日志
- [2026-05](/changelog/2026-05)
- [2026-04](/changelog/2026-04)
- [更多...](/changelog/)

## 🌟 项目特点

- ✅ **代码规范**：遵循阿里巴巴 Java 开发手册，代码质量高
- ✅ **文档完善**：每个模块都有详细文档，配套视频教程
- ✅ **持续更新**：活跃的社区，定期发布新版本
- ✅ **开源免费**：MIT 协议，可商用

## 📞 联系我们

- **GitHub**：[https://github.com/YunaiV/ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro)
- **Gitee**：[https://gitee.com/zhijiantian/ruoyi-vue-pro](https://gitee.com/zhijiantian/ruoyi-vue-pro)
- **文档**：[https://doc.iocoder.cn](https://doc.iocoder.cn)
- **视频教程**：[查看教程](/video)