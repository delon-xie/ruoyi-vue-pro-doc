import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek theme configuration
const teekConfig = defineTeekConfig({});

// VitePress configuration
export default defineConfig({
  base: '/ruoyi-vue-pro-doc/',
  extends: teekConfig,
  title: 'RuoYi-Vue-Pro 文档',
  description: 'RuoYi-Vue-Pro 项目文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  srcExclude: [
    '**/images/**',
    '**/intro.md'
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '项目简介', link: '/project-intro' },
      { text: 'AI', link: '/ai/' },
      { text: 'BPM', link: '/bpm/' },
      { text: 'CRM', link: '/crm/' },
      { text: 'ERP', link: '/erp/' },
      { text: 'Mall', link: '/mall/' },
      { text: 'WMS', link: '/wms/' },
      { text: 'MES', link: '/mes/' },
      { text: 'IoT', link: '/iot/' },
      { text: 'MP', link: '/mp/' },
      { text: 'IM', link: '/im/' },
      { text: 'Member', link: '/member/' },
      { text: 'Pay', link: '/pay/' },
      { text: '消息队列', link: '/message-queue/' },
      { text: '报表', link: '/report/' },
      { text: 'Vue3', link: '/vue3/' },
      { text: 'Vue2', link: '/vue2/' },
      { text: 'Vben5', link: '/vben5/' },
      { text: '更新日志', link: '/changelog/' }
    ],
    sidebar: {
      '/ai/': [
        { text: 'AI 模块', items: [
          { text: '构建', link: '/ai/build' },
          { text: '聊天', link: '/ai/chat' },
          { text: '知识库', link: '/ai/knowledge' },
          { text: '工具调用', link: '/ai/tool' },
          { text: '图片理解', link: '/ai/image' },
          { text: '思维链', link: '/ai/thinking' },
          { text: 'AI 工作流', link: '/ai/workflow' },
          { text: 'Web搜索', link: '/ai/web-search' },
          { text: '音乐生成', link: '/ai/music' },
          { text: 'MCP Client', link: '/ai/mcp-client' },
          { text: 'MCP Server', link: '/ai/mcp-server' }
        ]},
        { text: '模型接入', items: [
          { text: 'OpenAI', link: '/ai/openai' },
          { text: 'Azure OpenAI', link: '/ai/azure-openai' },
          { text: '智谱 GLM', link: '/ai/glm' },
          { text: '百度文心', link: '/ai/wenxin' },
          { text: '阿里通义', link: '/ai/tongyi' },
          { text: '讯飞星火', link: '/ai/xinghuo' },
          { text: '腾讯混元', link: '/ai/hunyuan' },
          { text: 'Midjourney', link: '/ai/midjourney' },
          { text: 'Stable Diffusion', link: '/ai/stable-diffusion' },
          { text: 'DALL-E', link: '/ai/dalle' },
          { text: 'Suno 音乐', link: '/ai/suno' },
          { text: 'Claude', link: '/ai/claude' },
          { text: 'Gemini', link: '/ai/gemini' },
          { text: 'DeepSeek', link: '/ai/deep-seek' },
          { text: 'Moonshot', link: '/ai/moonshot' },
          { text: 'Llama', link: '/ai/llama' },
          { text: 'Minimax', link: '/ai/minimax' },
          { text: '硅基流动', link: '/ai/siliconflow' },
          { text: 'Coze', link: '/ai/coze' },
          { text: 'FastGPT', link: '/ai/fastgpt' },
          { text: 'Dify', link: '/ai/dify' },
          { text: '百川', link: '/ai/baichuan' },
          { text: '豆包', link: '/ai/doubao' },
          { text: 'AI 写作', link: '/ai/write' },
          { text: '思维导图', link: '/ai/mindmap' }
        ]}
      ],
      '/bpm/': [
        { text: 'BPM 模块', items: [
          { text: '工作流', link: '/bpm/bpm' },
          { text: '任务办理', link: '/bpm/task-todo-done' },
          { text: '任务委托和抄送', link: '/bpm/task-delegation-and-cc' },
          { text: '流程实例', link: '/bpm/process-instance' },
          { text: '流程表单', link: '/bpm/use-bpm-form' },
          { text: '业务表单', link: '/bpm/use-business-form' },
          { text: '审批人', link: '/bpm/assignee' },
          { text: '会签', link: '/bpm/sign' },
          { text: '多实例', link: '/bpm/multi-instance' },
          { text: '监听器', link: '/bpm/listener' },
          { text: '表达式', link: '/bpm/expression' },
          { text: '消息通知', link: '/bpm/message' },
          { text: '达梦兼容', link: '/bpm/dameng' }
        ]},
        { text: '流程设计器', items: [
          { text: 'BPMN 设计器', link: '/bpm/model-designer-bpmn' },
          { text: '钉钉设计器', link: '/bpm/model-designer-dingding' }
        ]}
      ],
      '/crm/': [
        { text: 'CRM 模块', items: [
          { text: '构建', link: '/crm/build' },
          { text: '客户', link: '/crm/customer' },
          { text: '线索', link: '/crm/clue' },
          { text: '商机', link: '/crm/business' },
          { text: '合同', link: '/crm/contract' },
          { text: '回款', link: '/crm/receivable' },
          { text: '跟进记录', link: '/crm/follow-up' },
          { text: '产品', link: '/crm/product' },
          { text: '权限', link: '/crm/permission' }
        ]}
      ],
      '/erp/': [
        { text: 'ERP 模块', items: [
          { text: '构建', link: '/erp/build' },
          { text: '产品', link: '/erp/product' },
          { text: '销售', link: '/erp/sale' },
          { text: '采购', link: '/erp/purchase' },
          { text: '仓库', link: '/erp/stock' },
          { text: '出入库', link: '/erp/stock-in-out' },
          { text: '盘点', link: '/erp/stock-move-check' }
        ]}
      ],
      '/mall/': [
        { text: '商城模块', items: [
          { text: '构建', link: '/mall/build' },
          { text: '商品 SPU/SKU', link: '/mall/product-spu-sku' },
          { text: '商品属性', link: '/mall/product-property' },
          { text: '商品分类', link: '/mall/product-category' },
          { text: '商品评价', link: '/mall/product-comment' },
          { text: '购物车', link: '/mall/trade-cart' },
          { text: '订单', link: '/mall/trade-order' },
          { text: '售后', link: '/mall/trade-aftersale' },
          { text: '配送-快递', link: '/mall/trade-delivery-express' },
          { text: '配送-自提', link: '/mall/trade-delivery-pickup' },
          { text: '佣金', link: '/mall/trade-brokerage' },
          { text: '优惠券', link: '/mall/promotion-coupon' },
          { text: '限时折扣', link: '/mall/promotion-discount' },
          { text: '拼团', link: '/mall/promotion-combination' },
          { text: '砍价', link: '/mall/promotion-bargain' },
          { text: '秒杀', link: '/mall/promotion-seckill' },
          { text: '满减送', link: '/mall/promotion-content' },
          { text: '积分', link: '/mall/point-activity' },
          { text: '客服', link: '/mall/kefu' },
          { text: '统计', link: '/mall/statistics' },
          { text: '页面装修', link: '/mall/diy' }
        ]}
      ],
      '/wms/': [
        { text: 'WMS 仓储模块', items: [
          { text: '构建', link: '/wms/build' },
          { text: '仓库', link: '/wms/md/warehouse' },
          { text: '商户', link: '/wms/md/merchant' },
          { text: '货品', link: '/wms/md/item' },
          { text: '库存', link: '/wms/inventory' },
          { text: '盘点', link: '/wms/compare' },
          { text: '入库', link: '/wms/order/receipt' },
          { text: '出库', link: '/wms/order/shipment' },
          { text: '移库', link: '/wms/order/movement' },
          { text: '盘点', link: '/wms/order/check' }
        ]}
      ],
      '/mes/': [
        { text: 'MES 生产模块', items: [
          { text: '构建', link: '/mes/build' },
          { text: '生产工单', link: '/mes/pro/work-order' },
          { text: '生产报工', link: '/mes/pro/work-record' },
          { text: '生产调度', link: '/mes/pro/schedule-card' },
          { text: '设备报修', link: '/mes/pro/feedback' },
          { text: '安灯呼叫', link: '/mes/pro/andon' },
          { text: '工艺路线', link: '/mes/pro/process-route' }
        ]},
        { text: 'MES 仓库', items: [
          { text: '入库', link: '/mes/wm/purchase-in' },
          { text: '出库', link: '/mes/wm/sales-out' },
          { text: '转库', link: '/mes/wm/transfer' },
          { text: '盘点', link: '/mes/wm/stocktaking' },
          { text: '其他', link: '/mes/wm/misc' },
          { text: '委外', link: '/mes/wm/outsource' },
          { text: '退料', link: '/mes/wm/issue-return' },
          { text: '仓库设置', link: '/mes/wm/warehouse-setup' },
          { text: '生产入库', link: '/mes/wm/product-in' },
          { text: '库存', link: '/mes/wm/stock' }
        ]},
        { text: 'MES 质检', items: [
          { text: '基础设置', link: '/mes/qc/base' },
          { text: '质检模板', link: '/mes/qc/template' },
          { text: '待检', link: '/mes/qc/pending-inspect' },
          { text: 'IQC 来料质检', link: '/mes/qc/iqc' },
          { text: 'IPQC 过程质检', link: '/mes/qc/ipqc' },
          { text: 'OQC 出货质检', link: '/mes/qc/oqc' },
          { text: 'RQC 退货质检', link: '/mes/qc/rqc' }
        ]},
        { text: 'MES 设备', items: [
          { text: '设备', link: '/mes/dv/device' },
          { text: '点检计划', link: '/mes/dv/check-plan' },
          { text: '点检记录', link: '/mes/dv/check-record' }
        ]},
        { text: 'MES 排班', items: [
          { text: '班组', link: '/mes/cal/team' },
          { text: '日历', link: '/mes/cal/calendar' }
        ]},
        { text: 'MES 工具', items: [
          { text: '工具', link: '/mes/tm/tool' }
        ]},
        { text: 'MES 制造档案', items: [
          { text: '车间', link: '/mes/md/workshop' },
          { text: '产品', link: '/mes/md/product' },
          { text: '客户/供应商', link: '/mes/md/client-vendor' },
          { text: '自动编码', link: '/mes/md/autocode' }
        ]}
      ],
      '/iot/': [
        { text: 'IoT 物联网', items: [
          { text: '构建', link: '/iot/build' },
          { text: '产品', link: '/iot/product' },
          { text: '设备', link: '/iot/device' },
          { text: '协议概览', link: '/iot/protocol-overview' },
          { text: 'MQTT', link: '/iot/protocol-mqtt' },
          { text: 'HTTP', link: '/iot/protocol-http' },
          { text: 'CoAP', link: '/iot/protocol-coap' },
          { text: 'TCP', link: '/iot/protocol-tcp' },
          { text: 'UDP', link: '/iot/protocol-udp' },
          { text: 'WebSocket', link: '/iot/protocol-websocket' },
          { text: 'Modbus', link: '/iot/protocol-modbus-server' },
          { text: 'EMQX', link: '/iot/protocol-emqx' },
          { text: '自定义协议', link: '/iot/protocol-custom' },
          { text: '网关子设备', link: '/iot/gateway-sub-device' },
          { text: '设备注册', link: '/iot/device-register' },
          { text: 'OTA', link: '/iot/ota' },
          { text: '物模型', link: '/iot/thing-model' },
          { text: '数据规则', link: '/iot/data-rule' },
          { text: '场景规则', link: '/iot/scene-rule' },
          { text: '告警', link: '/iot/alert-config' }
        ]}
      ],
      '/mp/': [
        { text: '公众号', items: [
          { text: '构建', link: '/mp/build' },
          { text: '账号', link: '/mp/account' },
          { text: '菜单', link: '/mp/menu' },
          { text: '消息', link: '/mp/message' },
          { text: '模板消息', link: '/mp/message-template' },
          { text: '自动回复', link: '/mp/auto-reply' },
          { text: '用户管理', link: '/mp/user' },
          { text: '标签', link: '/mp/tag' },
          { text: '素材', link: '/mp/material' },
          { text: '图文', link: '/mp/article' },
          { text: '统计', link: '/mp/statistics' }
        ]}
      ],
      '/im/': [
        { text: 'IM 通讯', items: [
          { text: '构建', link: '/im/build' }
        ]}
      ],
      '/member/': [
        { text: '会员模块', items: [
          { text: '构建', link: '/member/build' },
          { text: '会员', link: '/member/user' },
          { text: '等级', link: '/member/level' },
          { text: '微信登录', link: '/member/weixin-lite-login' },
          { text: '微信公众号登录', link: '/member/weixin-mp-login' },
          { text: '微信扫码登录', link: '/member/weixin-lite-qrcode' },
          { text: '订阅消息', link: '/member/weixin-lite-subscribe-message' }
        ]}
      ],
      '/pay/': [
        { text: '支付模块', items: [
          { text: '构建', link: '/pay/build' },
          { text: '钱包', link: '/pay/wallet' },
          { text: '退款', link: '/pay/refund-demo' },
          { text: '模拟支付', link: '/pay/mock' },
          { text: '微信小程序支付', link: '/pay/wx-lite-pay-demo' },
          { text: '微信公众号支付', link: '/pay/wx-pub-pay-demo' },
          { text: '微信转账', link: '/pay/wx-transfer-demo' },
          { text: '支付宝支付', link: '/pay/alipay-pay-demo' },
          { text: '支付宝转账', link: '/pay/alipay-transfer-demo' }
        ]}
      ],
      '/message-queue/': [
        { text: '消息队列', items: [
          { text: 'RabbitMQ', link: '/message-queue/rabbitmq' },
          { text: 'RocketMQ', link: '/message-queue/rocketmq' },
          { text: 'Kafka', link: '/message-queue/kafka' },
          { text: 'Redis', link: '/message-queue/redis' },
          { text: '事件通知', link: '/message-queue/event' }
        ]}
      ],
      '/report/': [
        { text: '报表模块', items: [
          { text: '大屏', link: '/report/screen' }
        ]}
      ],
      '/vue3/': [
        { text: 'Vue3 前端', items: [
          { text: '规范', link: '/vue3/dev-spec' },
          { text: '路由', link: '/vue3/route' },
          { text: 'CRUD Schema', link: '/vue3/crud-schema' },
          { text: '组件', link: '/vue3/components' },
          { text: '字典', link: '/vue3/dict' },
          { text: '工具类', link: '/vue3/util' },
          { text: '格式化', link: '/vue3/format' },
          { text: '图标', link: '/vue3/icon' },
          { text: '国际化', link: '/vue3/i18n' },
          { text: '配置中心', link: '/vue3/config-center' },
          { text: '调试', link: '/vue3/debugger' }
        ]}
      ],
      '/vue2/': [
        { text: 'Vue2 前端', items: [
          { text: '规范', link: '/vue2/dev-spec' },
          { text: '路由', link: '/vue2/route' },
          { text: '组件', link: '/vue2/components' },
          { text: '字典', link: '/vue2/dict' },
          { text: '工具类', link: '/vue2/util' },
          { text: '图标', link: '/vue2/icon' },
          { text: '配置中心', link: '/vue2/config-center' }
        ]}
      ],
      '/vben5/': [
        { text: 'Vben5 前端', items: [
          { text: '规范', link: '/vben5/dev-spec' },
          { text: '路由', link: '/vben5/route' },
          { text: '组件', link: '/vben5/components' },
          { text: '字典', link: '/vben5/dict' },
          { text: '工具类', link: '/vben5/util' },
          { text: '格式化', link: '/vben5/format' },
          { text: '图标', link: '/vben5/icon-theme' },
          { text: '配置中心', link: '/vben5/config-center' },
          { text: '调试', link: '/vben5/debugger' }
        ]}
      ],
      '/changelog/': [
        { text: '更新日志', items: [
          { text: '2026-05', link: '/changelog/2026-05' },
          { text: '2026-04', link: '/changelog/2026-04' },
          { text: '2026-03', link: '/changelog/2026-03' },
          { text: '2026-01', link: '/changelog/2026-01' },
          { text: '2025-12', link: '/changelog/2025-12' },
          { text: '2025-11', link: '/changelog/2025-11' },
          { text: '2025-10', link: '/changelog/2025-10' },
          { text: '2025-09', link: '/changelog/2025-09' },
          { text: '2025-08', link: '/changelog/2025-08' },
          { text: '2.6.1', link: '/changelog/2.6.1' },
          { text: '2.6.0', link: '/changelog/2.6.0' },
          { text: '2.5.0', link: '/changelog/2.5.0' },
          { text: '2.4.2', link: '/changelog/2.4.2' },
          { text: '2.4.1', link: '/changelog/2.4.1' },
          { text: '2.4.0', link: '/changelog/2.4.0' },
          { text: '2.3.0', link: '/changelog/2.3.0' },
          { text: '2.2.0', link: '/changelog/2.2.0' },
          { text: '2.1.0', link: '/changelog/2.1.0' },
          { text: '2.0.1', link: '/changelog/2.0.1' },
          { text: '2.0.0', link: '/changelog/2.0.0' }
        ]}
      ],
      '/': [
        { text: '入门指南', items: [
          { text: '项目简介', link: '/project-intro' },
          { text: '快速开始', link: '/quick-start' },
          { text: '快速开始-前端', link: '/quick-start-front' },
          { text: '技术方案', link: '/technology' }
        ]},
        { text: '功能列表', items: [
          { text: '功能列表', link: '/feature' },
          { text: '新功能', link: '/new-feature' },
          { text: '页面示例', link: '/page-feature' }
        ]},
        { text: '开发指南', items: [
          { text: '环境搭建', link: '/dev-env' },
          { text: '新建模块', link: '/module-new' },
          { text: '代码提交', link: '/migrate-module' },
          { text: '代码删除', link: '/delete-code' }
        ]},
        { text: '后端指南', items: [
          { text: '工具类', link: '/util' },
          { text: 'Excel 导入导出', link: '/excel-import-and-export' },
          { text: '接口文档', link: '/api-doc' },
          { text: 'API 加密', link: '/api-encrypt' },
          { text: 'SQL 文档', link: '/db-doc' },
          { text: 'SQL 更新', link: '/sql-update' },
          { text: '代码生成', link: '/vo' }
        ]},
        { text: '常见功能', items: [
          { text: '数据权限', link: '/data-permission' },
          { text: '资源权限', link: '/resource-permission' },
          { text: 'SSH 密钥', link: '/desensitize' },
          { text: '数据权限', link: '/area-and-ip' },
          { text: '内网穿透', link: '/natapp' },
          { text: '配置中心', link: '/config-center' },
          { text: '单点登录', link: '/oauth2' },
          { text: '社交登录', link: '/social-user' },
          { text: '文件上传', link: '/file' },
          { text: 'WebSocket', link: '/websocket' },
          { text: '邮箱', link: '/mail' },
          { text: '短信', link: '/sms' },
          { text: '站内信', link: '/notify' },
          { text: '异步任务', link: '/async-task' },
          { text: '定时任务', link: '/job' },
          { text: '消息队列', link: '/redis-cache' },
          { text: '分布式锁', link: '/distributed-lock' },
          { text: '限流', link: '/rate-limiter' },
          { text: '幂等', link: '/idempotent' },
          { text: '异常处理', link: '/exception' },
          { text: '数据脱敏', link: '/desensitize' },
          { text: '敏感词', link: '/sensitive-word' },
          { text: '验证码', link: '/captcha' },
          { text: '本地缓存', link: '/local-cache' },
          { text: '服务器监控', link: '/server-monitor' },
          { text: '服务保障', link: '/server-protection' },
          { text: '删除 Redis', link: '/remove-redis' },
          { text: 'Http 签名', link: '/http-sign' },
          { text: 'Https', link: '/https' },
          { text: '多数据源', link: '/dynamic-datasource' }
        ]},
        { text: '部署指南', items: [
          { text: 'Linux 部署', link: '/deployment-linux' },
          { text: 'Docker 部署', link: '/deployment-docker' },
          { text: 'War 部署', link: '/deployment-war' },
          { text: '宝塔部署', link: '/deployment-baota' },
          { text: '1Panel 部署', link: '/deployment-1panel' },
          { text: 'Jenkins 部署', link: '/deployment-jenkins' },
          { text: '项目重命名', link: '/project-rename' }
        ]},
        { text: '其他', items: [
          { text: '单元测试', link: '/unit-test' },
          { text: '面试题', link: '/interview' },
          { text: '视频教程', link: '/video' },
          { text: '群', link: '/qun' },
          { text: '外包', link: '/waibao' },
          { text: 'Webhook', link: '/webhook' },
          { text: '数据库国产化', link: '/xinchuang-db' },
          { text: 'MyBatis 增强', link: '/mybatis-pro' },
          { text: '热加载', link: '/dev-hot-swap' },
          { text: '用户中心', link: '/user-center' },
          { text: '系统日志', link: '/system-log' },
          { text: '多租户', link: '/saas-tenant' }
        ]}
      ]
    }
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/delon-xie/ruoyi-vue-pro-doc' }
  ],
  markdown: {
    lineNumbers: true
  }
})
