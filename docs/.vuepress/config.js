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
                            text: 'free-code-camp',
                            collapsible: true,
                            children: [
                                '/note-book/free-code-camp/javascript.md',
                                '/note-book/free-code-camp/js-algorithms.md',
                                '/note-book/free-code-camp/backend.md'
                            ],
                        },
                        {
                            text: 'JS 数据结构 & 算法',
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
                            text: 'rest-framework',
                            collapsible: true,
                            children: [
                                '/note-book/rest-framework/rest-views.md'
                            ],
                        },
                        {
                            text: '开源项目',
                            collapsible: true,
                            children: [
                                '/note-book/project-library/mockjs.md',
                                '/note-book/project-library/hexo.md',
                                '/note-book/project-library/django-ckeditor.md',
                                '/note-book/project-library/django-haystack.md',
                                '/note-book/project-library/bar-chart-race.md',
                                '/note-book/project-library/moviepy.md',
                                '/note-book/project-library/pyecharts.md',
                                '/note-book/project-library/virtualenv.md'
                            ],
                        },
                        {
                            text: '软件工具',
                            collapsible: true,
                            children: [
                                '/note-book/software-tool/nginx.md',
                                '/note-book/software-tool/mysql.md',
                                '/note-book/software-tool/mongodb.md',
                                '/note-book/software-tool/wsl2.md'
                            ],
                        },
                        {
                            text: '代码片段',
                            collapsible: true,
                            children: [
                                '/note-book/code-snippet/debounce-throttle.md',
                                '/note-book/code-snippet/date.md',
                                '/note-book/code-snippet/echarts.md'
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