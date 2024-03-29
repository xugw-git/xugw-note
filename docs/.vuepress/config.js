const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
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
                '/frontend/free-code-camp/backend.md',
                '/frontend/free-code-camp/mongodb.md',
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
        {
          text: '其他',
          link: '/other/',
          collapsible: true,
          children: [
            {
              text: '框架/库',
              collapsible: true,
              children: [
                '/other/library/hexo.md',
                '/other/library/mockjs.md',
              ],
            },
            {
              text: '工具',
              children: [
                '/other/tool/mysql.md',
                '/other/tool/wsl2.md'
              ],
            },
          ]
        }
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
}