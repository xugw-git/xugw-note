# nginx 部署 vue 项目

nginx 是一个高性能的 HTTP 和反向代理 web 服务器。  

## nginx 指令

``` bash
start nginx      //启动
.\nginx -s quit  //停止
```

## 构建项目

打包之前设置 `publicPath` 为空字符串 (`''`) 或是相对路径 (`'./'`)，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径。

``` javascript
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // ...
  publicPath: './',
})
```

``` bash
npm run build
```

## 开发环境下解决跨域问题的代理配置

``` javascript
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:8000/api`,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
})
```

## nginx 代理配置

将打包之后的静态资源文件放入 `nginx/html/` 目录下，并修改配置文件：

``` conf
#nginx/conf/nginx.conf
http {
    #...
    server {
        #...
        location /api/ {
            proxy_pass   http://127.0.0.1:8000/api/;
        }
    }
}
```
