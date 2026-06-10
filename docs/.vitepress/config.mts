import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek theme configuration
const teekConfig = defineTeekConfig({});

// VitePress configuration
export default defineConfig({
  extends: teekConfig,
  title: 'RuoYi-Vue-Pro 文档',
  description: 'RuoYi-Vue-Pro 项目文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  srcExclude: ['**/intro.md', '**/project-intro.md'],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '项目简介', link: '/project-intro' },
      { text: 'AI', link: '/ai/' },
      { text: 'BPM', link: '/bpm/' },
      { text: 'CRM', link: '/crm/' },
      { text: 'ERP', link: '/erp/' }
    ],
    sidebar: {
      '/ai/': [
        { text: 'AI 模块', items: [
          { text: '构建', link: '/ai/build' },
          { text: '聊天', link: '/ai/chat' },
          { text: '知识库', link: '/ai/knowledge' }
        ]}
      ],
      '/bpm/': [
        { text: 'BPM 模块', items: [
          { text: '工作流', link: '/bpm/bpm' }
        ]}
      ],
      '/crm/': [
        { text: 'CRM 模块', items: [
          { text: '构建', link: '/crm/build' }
        ]}
      ],
      '/erp/': [
        { text: 'ERP 模块', items: [
          { text: '构建', link: '/erp/build' }
        ]}
      ]
    }
  },
  markdown: {
    lineNumbers: true
  }
})