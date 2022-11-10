const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
  base: '/',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
  title: 'XUGW-NOTE',
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
      {
        text: '📔 笔记',
        link: '/note-book/',
      },
      {
        text: '🏷️ 书签',
        link: '/book-mark/',
      },
    ],
    sidebar: {
      '/note-book/': [
        {
          text: '笔记',
          children: [
            {
              text: '前端',
              collapsible: true,
              children: [
                '/note-book/frontend/fcc-javascript.md',
                '/note-book/frontend/fcc-algorithms.md',
                '/note-book/frontend/debounce-throttle.md',
                '/note-book/frontend/echarts.md',
                '/note-book/frontend/date.md',
                '/note-book/frontend/drag.md',
                '/note-book/frontend/vue-ref.md',
              ],
            },
            {
              text: 'vue',
              collapsible: true,
              children: [
                '/note-book/vue/nginx.md',
                '/note-book/vue/el-table.md',
                '/note-book/vue/el-form-rules.md',
              ],
            },
            {
              text: 'uniapp',
              collapsible: true,
              children: [
                '/note-book/uniapp/u-swipe-action.md',
                '/note-book/uniapp/uqrcode.md',
                '/note-book/uniapp/ucharts.md',
                '/note-book/uniapp/u-datetime-picker.md',
              ],
            },
            {
              text: 'nodejs',
              collapsible: true,
              children: [
                '/note-book/nodejs/fcc-backend.md',
                '/note-book/nodejs/mongodb.md',
              ],
            },
            {
              text: 'js 数据结构',
              collapsible: true,
              children: [
                '/note-book/data-structure/数组.md',
                '/note-book/data-structure/栈.md',
                '/note-book/data-structure/队列.md',
                '/note-book/data-structure/链表.md',
                '/note-book/data-structure/双向链表.md',
                '/note-book/data-structure/集合.md',
                '/note-book/data-structure/字典.md',
                '/note-book/data-structure/哈希表.md',
                '/note-book/data-structure/递归.md',
                '/note-book/data-structure/二叉搜索树.md',
                '/note-book/data-structure/图.md',
                '/note-book/data-structure/排序算法.md'
              ],
            },
            {
              text: '其他',
              collapsible: true,
              children: [
                '/note-book/other/hexo.md',
                '/note-book/other/mockjs.md',
                '/note-book/other/mysql.md',
                '/note-book/other/wsl2.md'
              ],
            },
            {
              text: 'python',
              collapsible: true,
              children: [
                '/note-book/python/pyecharts.md',
                '/note-book/python/bar-chart-race.md',
                '/note-book/python/moviepy.md',
                '/note-book/python/virtualenv.md'
              ],
            },
            {
              text: 'django',
              collapsible: true,
              children: [
                '/note-book/django/django-ckeditor.md',
                '/note-book/django/django-haystack.md',
                '/note-book/django/rest-views.md',
              ],
            },
          ],
        },
      ],
      '/book-mark/': [
        {
          text: '书签',
          link: '/book-mark/'
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
}