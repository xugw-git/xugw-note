# Mockjs - 模拟数据生成器

Mock.js 是一款模拟数据生成器，旨在帮助前端攻城师独立于后端进行开发，帮助编写单元测试。

> [文档](<http://mockjs.com/>)  
> [语法规范](<http://mockjs.com/0.1/#%E8%AF%AD%E6%B3%95%E8%A7%84%E8%8C%83>)  
> [示例](<http://mockjs.com/examples.html#Object>)

## 安装 & 使用

``` bash
npm install mockjs
```

``` js
//mock\index.js
import Mock from 'mockjs'

const fakeInfo = Mock.mock({
    "articleInfo|10": [{    //生成|10个如下格式的数据
        "id|+1": 1, 
        "title": '@ctitle(6, 20)',
        "body|3": ['@cparagraph(10,20)'],
        "author": "@cname",   
        "image": "@image('200x100', '#00CC99')",
        "createtime": '@datetime',
        "category|1": ["前端", "后端", "工具", "语言", "教程", "软件"],
        "tag|1-3": { '01': 'vue', '02': 'bootstrap', '03': 'html', '04': 'css', '05': 'javascript', '06': 'mockjs', '07': 'vuex', '08': 'router', '09': 'axios' }
    }]
});

Mock.mock('/articles/info', 'get', fakeInfo)
```

## 在项目中导入

``` js
// src\main.js
import "../mock/index";
```

## 在组件中请求

``` js
// src\views\BlogHome.vue
import axios from "axios";
// ...
mounted() {
    axios
      .get("/articles/info")
      .then(res => {
        this.article_info = res.data.articleInfo
      });
  },
// ...
```
