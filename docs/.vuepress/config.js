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
      {
        text: '🎨 作品',
        link: '/works-link/',
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
                '/note-book/front-end/fcc-javascript.md',
                '/note-book/front-end/fcc-algorithms.md',
                '/note-book/front-end/debounce-throttle.md',
                '/note-book/front-end/date.md',
                '/note-book/front-end/echarts.md',
              ],
            },
            {
              text: 'vue',
              collapsible: true,
              children: [
                '/note-book/vue-framework/nginx.md',
                '/note-book/vue-framework/el-table.md',
                '/note-book/vue-framework/el-form-rules.md',
              ],
            },
            {
              text: 'uni-app',
              collapsible: true,
              children: [
                '/note-book/uni-app/u-swipe-action.md',
                '/note-book/uni-app/uqrcode.md',
                '/note-book/uni-app/ucharts.md',
                '/note-book/uni-app/u-datetime-picker.md',
              ],
            },
            {
              text: 'nodejs',
              collapsible: true,
              children: [
                '/note-book/nodejs-part/fcc-backend.md',
                '/note-book/nodejs-part/mongodb.md',
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
                '/note-book/other-part/hexo.md',
                '/note-book/other-part/mockjs.md',
                '/note-book/other-part/mysql.md',
                '/note-book/other-part/wsl2.md'
              ],
            },
            {
              text: 'python',
              collapsible: true,
              children: [
                '/note-book/python-part/pyecharts.md',
                '/note-book/python-part/bar-chart-race.md',
                '/note-book/python-part/moviepy.md',
                '/note-book/python-part/virtualenv.md'
              ],
            },
            {
              text: 'django',
              collapsible: true,
              children: [
                '/note-book/django-framework/django-ckeditor.md',
                '/note-book/django-framework/django-haystack.md',
                '/note-book/django-framework/rest-views.md',
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
      '/works-link/': [
        {
          text: '作品',
          link: '/works-link/'
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