# Mockjs-模拟数据生成器

Mock.js 是一款模拟数据生成器，旨在帮助前端攻城师独立于后端进行开发，帮助编写单元测试。

?> [文档](<http://mockjs.com/>)

## 安装

``` bash
npm install mockjs
```

## 使用 Mock

?> [语法规范](<http://mockjs.com/0.1/#%E8%AF%AD%E6%B3%95%E8%A7%84%E8%8C%83>)

?> [示例](<http://mockjs.com/examples.html#Object>)

Mock.js 的语法规范包括两部分：

- 数据模板定义（Data Temaplte Definition，DTD）

``` javascript
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

- 数据占位符定义（Data Placeholder Definition，DPD）

```javascript
@占位符(参数 [, 参数])
```

- 具体案例

``` javascript
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

> 其中，`Mock.mock( rurl, rtype, function( options ) )`
>
> - 记录用于生成响应数据的函数。  
> - 当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

> - rurl (可选) - 表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。
    - 例如 `/\/domain\/list\.json/`。
> - rtype (可选) - 表示需要拦截的 Ajax 请求类型。
    - 例如 GET、POST、PUT、DELETE 等。
> - template (可选)-表示数据模板，可以是对象或字符串。
    - 例如 `{ 'data|1-10':[{}] }`。
> - function(options) (可选) - 表示用于生成响应数据的函数。
>   - options - 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性。

## 在项目中导入

``` javascript
// src\main.js
import "../mock/index";
```

## 在组件中请求

``` javascript
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
