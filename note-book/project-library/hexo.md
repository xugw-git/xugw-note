# Hexo - 静态博客框架

Hexo 是一个快速、简洁且高效的博客框架。  

?> 文档：<https://hexo.io/zh-cn/docs/>

## 安装 & 初始化

- 需提前安装 `git` 和 `Node.js`
- 准备完成之后，即可使用 npm 安装 Hexo：

``` bash
npm install -g hexo-cli
```

``` bash
hexo init <folder>  #如果没有设置folder，Hexo默认在目前的文件夹建立网站。
cd <folder>        
npm install
```

### 文件

新建完成后，指定文件夹的目录如下：

``` bash
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

- 网站配置文件 `_config.yml` ，暂时不需要做大量更改，可以先改一下网站的基本信息、将 `language` 改为 `zh-CN` ；
- 应用程序的信息 `package.json` ；
- 模板文件夹 `scaffolds` ，当您新建文章时，Hexo 会根据 **scaffold** 来建立文件。；
- 资源文件夹 `source` ，存放用户资源的地方，可以放博客中需要用到的图片之类的，分类、标签之类的 markdown 文件也会被放在这里。

### 写一篇博客

``` bash
hexo new <title>  #如果标题包含空格，请使用引号括起来。如：hexo new "hello world"
```

文章的详细内容需要在 `_posts` 目录下新生成的 `hello world.md` 文件内写入。

### 生成静态文件

``` bash
hexo generate  #或 hexo g
```

### 启动服务器

``` bash
hexo server  #或 hexo s 
```

本地服务器默认网址： <http://localhost:4000/>。

## 主题更换

创建 Hexo 主题非常容易，只要在 themes 文件夹内，新增一个任意名称的文件夹，并修改 _config.yml 内的 theme 设定，即可切换主题。

?> 可以在<https://hexo.io/themes/> 或者 github 上挑选你喜欢的主题。

### 下载

我选择的主题是 **hexo-theme-matery** ：<https://github.com/blinkfox/hexo-theme-matery> ，

?> 示例网址：<http://blinkfox.com/>

可以直接下载复制到themes文件夹中，也可以使用git clone：

``` bash
git clone https://github.com/blinkfox/hexo-theme-matery.git
```

下载完成后，主题的主要目录如下：

``` bash
.
├── _config.yml
├── languages
├── layout
└── source
```

- 主题的配置文件 `_config.yml` ：和 Hexo 配置文件不同，主题配置文件修改时会自动更新，无需重启 Hexo Server ；
- 布局文件夹 `layout` 。用于存放主题的模板文件，决定了网站内容的呈现方式；
- 资源文件夹 `source` ，除了模板以外的 Asset，例如 CSS、JavaScript 文件等，如果文件可以被渲染的话，会经过解析然后储存到 `public` 文件夹，否则会直接拷贝到 `public` 文件夹。

### 配置

#### 切换主题

- 将 Hexo 根目录下的 `_config.yml` 的 `theme` 的值改为 `hexo-theme-matery` ；
- 将两个 `per_page` 的值改为 6 的倍数如 **12** ，这样博客的文章列表可以适应不同设备的屏幕。

#### 新增页面

切换主题之后，默认导航栏的几个按钮是没有页面连接的，你需要在 Hexo 的 **source** 中新建一个：

``` bash
hexo new page "categories"
```

命令会在 Hexo 的 **source** 文件夹内生成 `categories/index.md` 文件，修改 `index.md` 文件至少需要以下内容：

``` yaml
---
title: categories
date: 2018-09-30 17:25:30
type: "categories"
layout: "categories"
---
```

其他页面也是同样的：

``` bash
hexo new page "tags"
hexo new page "about"
```

#### 代码高亮插件

安装命令如下：

``` bash
npm i -S hexo-prism-plugin
```

修改 Hexo 的配置文件，将 `highlight.enable` 的值改为 **false** ,新增 prism_plugin 配置：

``` yaml
highlight:
  enable: false

prism_plugin:
  mode: 'preprocess'
  theme: 'tomorrow'
  line_number: false
  custom_css:
```

#### 搜索插件

``` bash
npm install hexo-generator-search --save
```

修改 Hexo 的配置文件，新增 `search` 配置：

``` yaml
search:
  path: search.xml
  field: post
```

#### 文章字数统计插件

``` bash
npm i --save hexo-wordcount
```

修改主题配置文件，将 `postInfo.wordCount` 的值改为 **true** 。

#### 其他配置

- 去掉 dream 部分：`dream.enable:false`；
- 去掉首页下方的 recommend 列表：`recommend.enable:false`；
- 去掉网站 logo ：`logo:false`；
- 更换 favicon 图标：更换主题 source 目录下的 favicon 图片；
- 去掉首页横幅的第二个 GitHub 按钮：`indexbtn.enable:false`;
- 去掉文章下方的打赏按钮：`reward.enable:false`；
- 去掉文章下方的版权提示：`copyright.enable:false`;
- 更改“关于”页面的内容：更改 profile ;去掉 myProjects 、 mySkills ;直接注释 myGallery 去掉相册；
- 去掉导航栏的 GitHub 图标按钮：`githubLink:false`；
- 动态背景彩带：`ribbon_dynamic.enable:true`；
- 文章下方的分享按钮：sharejs.sites 保留了qq,qzone,wechat,weibo；
- 首页带光标的文字：修改 subtitle 的内容；
- 去掉页背景图片的切换功能：`banner.enable:false`；
- 去掉ICP备案信息显示：`icp.enable:false`。

### 网站样式

#### 修改页脚

原本页脚的内容太过杂乱，修改主题文件夹内的 `layout/_partial/footer.ejs` 文件，保留 **Copyright** 、 **siteTotalVisits** 、**siteTotalVisitors** 以及 **social-link** 等内容。

#### 社交链接

修改主题配置文件中的 socialLink 内容；
修改主题文件夹内的 `layout/_partial/social-link.ejs` 文件：
**a**标签的顺序决定了链接图标在博客页面中显示的顺序，可以新增、修改链接地址，可以使用 Font Awesome 图标更换链接图标。

#### 导航栏按钮文字

修改主题文件夹内的 `layout/_partial/navigation.ejs` 文件和 `mobile-nav.ejs` 文件，修改 `menuMap.set` 元组中的中文；

#### 主题颜色

修改主题目录下的 `source/css/matery.css` 文件：
导航栏和页脚的渐变色：

``` css
.bg-color {
    background-image: linear-gradient(to right, #336699 0%, #4E7CAA 100%);
}
```

屏幕下方进度条的渐变色：

``` css
.progress-bar {
    height: 4px;
    position: fixed;
    bottom: 0;
    z-index: 300;
    background: linear-gradient(to right, #336699 0%, #4E7CAA 100%);
    opacity: 0.8;
}
```

取消首页的闪烁玻璃效果：
注释掉 `@-webkit-keyframes rainbow` 和 `@keyframes rainbow` ；
首页横幅按钮鼠标经过的颜色：

``` css
.cover-btns a:hover {
    border: 1px solid #FFCC66;
    background-color: #FFCC66;
    box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(233, 30, 99, 0.2);
}
```

首页横幅社交链接按钮的颜色：

``` css
.cover-social-link a {
    padding: 0 15px;
    font-size: 1.35rem;
    color: #FFCC66;
}
```

#### 横幅图片

直接替换 `source/medias/banner` 目录下的图片；

#### 文章图片

直接替换 `source/medias/featureimages` 目录下的图片；

主题 source 目录下不需要的图片直接删除，以后更新的时候就不会拷贝到 public 目录了。

#### 转载声明

默认的文章链接显示是URL编码，可以修改 `layout/_partial/reprint-statement.ejs` 更改a标签的显示内容：

``` html
<div class="reprint__type">
...
<span class="reprint-info">
  <a href="<%- config.url %><%- url_for(page.path) %>"><%- config.url %>/<%- page.path %></a>
</span>
<div>
```

## Gitee Pages

Gitee Pages 是一个免费的静态网页托管服务，您可以使用 Gitee Pages 托管博客、项目官网等静态网页。  
目前 Gitee Pages 支持 Jekyll、Hugo、Hexo编译静态资源。

### 开通服务

注册、登录Gitee之后新建一个开源的仓库，进入仓库，点击服务 - Gitee Pages 。  
仓库名与用户名一致可以使访问网址变得简短。

### 设置账户SSH公钥

``` bash
ssh-keygen -t rsa -C xxx@qq.com
```

`xxx@qq.com` 只是生成sshkey的名称，并不一定要邮箱，按照提示完成三次回车。
打开 `C:\Users\xxx\.ssh\id_rsa.pub` 复制生成的公钥，回到gitee，通过主页右上角 「个人设置」->「安全设置」->「SSH公钥」->「添加公钥」 ，将公钥添加到当前账户中。
测试是否设置成功：

``` bash
ssh -T git@gitee.com
```

### 部署

安装 hexo-deployer-git ：

``` bash
npm install hexo-deployer-git --save
```

进入仓库，复制SSH `git@gitee.com:xxx/xxx.git`，
修改Hexo目录下的配置文件：

``` yaml
deploy:
  type: git
  repo: git@gitee.com:xxx/xxx.git
  branch: master
  message:
```

然后输入以下命令就可以一键部署了：

``` bash
npm install hexo-deployer-git --save
```

?> Gitee Pages 服务页面需要手动点击更新。
