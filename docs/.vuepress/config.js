import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  bundler: viteBundler(),
  base: '/',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
  title: 'XUGW',
  theme: defaultTheme({
    logo: '/images/hero.png',
    repo: 'https://github.com/xugw-git/xugw-note',
    repoLabel: '📦 仓库',
    editLinkText: '在 Github 上编辑此页',
    docsDir: 'docs',
    contributors: false,
    lastUpdatedText: '上次更新',
    notFound: ['页面不存在'],
    backToHome: '回到首页',
    navbar: [
      // NavbarItem
      {
        text: '🏠 首页',
        link: '/',
      },
    ],
    sidebarDepth: 0,
    sidebar: {
      '/': [
        {
          text: '前端',
          link: '/frontend/',
          collapsible: true,
          children: [
            {
              text: 'free-code-camp',
              collapsible: true,
              children: [
                '/frontend/free-code-camp/javascript.md',
                '/frontend/free-code-camp/algorithms.md',
              ],
            },
            {
              text: 'vue',
              collapsible: true,
              children: [
                '/frontend/vue/dom.md',
                '/frontend/vue/drag.md',
                '/frontend/vue/nginx.md',
                '/frontend/vue/el-table.md',
                '/frontend/vue/el-form-rules.md',
              ],
            },
            {
              text: 'uniapp',
              collapsible: true,
              children: [
                '/frontend/uniapp/u-swipe-action.md',
                '/frontend/uniapp/uqrcode.md',
                '/frontend/uniapp/ucharts.md',
                '/frontend/uniapp/u-datetime-picker.md',
              ],
            },
            {
              text: '数据结构',
              collapsible: true,
              children: [
                '/frontend/data-structure/数组.md',
                '/frontend/data-structure/栈.md',
                '/frontend/data-structure/队列.md',
                '/frontend/data-structure/链表.md',
                '/frontend/data-structure/双向链表.md',
                '/frontend/data-structure/集合.md',
                '/frontend/data-structure/字典.md',
                '/frontend/data-structure/哈希表.md',
                '/frontend/data-structure/递归.md',
                '/frontend/data-structure/二叉搜索树.md',
                '/frontend/data-structure/图.md',
                '/frontend/data-structure/排序算法.md'
              ],
            },
            {
              text: '前端基础',
              collapsible: true,
              children: [
                '/frontend/base/debounce-throttle.md',
                '/frontend/base/date.md',
              ],
            },
            {
              text: '前端库',
              collapsible: true,
              children: [
                '/frontend/library/echarts.md',
                '/frontend/library/luckysheet-exceljs.md',
              ],
            },
          ],
        },
        {
          text: 'NODEJS',
          link: '/nodejs/',
          collapsible: true,
          children: [
            {
              text: 'free-code-camp',
              collapsible: true,
              children: [
                '/nodejs/free-code-camp/backend.md',
                '/nodejs/free-code-camp/mongodb.md',
              ],
            },
            {
              text: '数据库',
              collapsible: true,
              children: [
                '/nodejs/database/mysql.md',
                '/nodejs/database/mongodb.md',
              ],
            },
          ]
        },
        {
          text: 'PYTHON',
          link: '/python/',
          collapsible: true,
          children: [
            {
              text: 'django',
              collapsible: true,
              children: [
                '/python/django/django-ckeditor.md',
                '/python/django/django-haystack.md',
                '/python/django/rest-views.md',
              ],
            },
            {
              text: 'python库',
              collapsible: true,
              children: [
                '/python/library/pyecharts.md',
                '/python/library/bar-chart-race.md',
                '/python/library/moviepy.md',
                '/python/library/virtualenv.md'
              ],
            }
          ]
        },
      ],
    },
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    }),
  ],
})