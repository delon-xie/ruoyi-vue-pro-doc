import { defineConfig } from "vitepress";

// VitePress configuration
export default defineConfig({
  title: 'RuoYi-Vue-Pro 文档',
  description: 'RuoYi-Vue-Pro 项目文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  srcExclude: ['**/admin-uniapp/**', '**/vben5/**'],
  themeConfig: {
    // Navigation
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/project-intro' }
    ],
    sidebar: [
      {
        text: '项目简介',
        link: '/project-intro'
      },
      {
        text: 'AI',
        link: '/ai/'
      },
      {
        text: 'BPM',
        link: '/bpm/'
      },
      {
        text: 'CRM',
        link: '/crm/'
      },
      {
        text: 'ERP',
        link: '/erp/'
      },
      {
        text: 'Mall',
        link: '/mall/'
      },
      {
        text: 'WMS',
        link: '/wms/'
      },
      {
        text: 'IM',
        link: '/im/'
      },
      {
        text: 'Vue3',
        link: '/vue3/'
      },
      {
        text: '更新日志',
        link: '/changelog/'
      }
    ]
  },
  markdown: {
    lineNumbers: true
  }
})
