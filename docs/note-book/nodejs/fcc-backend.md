# free-code-camp 后端开发

npm（Node 包管理工具）是一个命令行工具，用于安装、创建和分享为 Node.js 编写的 JavaScript 代码包。

## 使用 NPM 管理软件包

package.json 文件是所有 Node.js 项目和 npm 包的枢纽， 和 HTML 文档中的 `<head>` 区域用来描述网页的配置信息（元数据）一样，它存储项目的相关信息。  
它由单个 JSON 对象组成，并以键值对的形式存储项目信息， 且至少包含两个必填字段：“name”和“version”。

``` json
{
"name": "fcc-learn-npm-package-json",
"author": "xugw",//作者
"description": "freeCodeCamp后端练习课程",//描述
"keywords": [ "freecodecamp", "xugw", "learning" ],//关键词
"license": "MIT",//许可证
"version": "1.0.0",//版本号
"dependencies": {"express": "^4.14.0"},//依赖包
//语义化版本:
//当做了不兼容的 API 修改，应该增加主版本号（MAJOR）；
//当新增了向下兼容的新功能时，应该增加次版本号（MINOR）；
//当修复了向下兼容的 bug 时，应该增加修订号（PATCH）。
//这意味着修订号是用来修复错误的，次版本号则是添加了新功能，但它们都没有破坏之前的功能。
//主版本号（MAJOR）是添加了不兼容早期版本的更改。
//可以在依赖项的版本号前加一个波浪号（~），以让 npm 依赖项更新到最新的修订版。
//脱字符（^）允许次版本和修订版更新。
"main": "server.js",
"scripts": {
  "start": "node server.js"
 },
"repository": {
  "type": "git",
  "url": "https://idontknow/todo.git"
 }
}
```

## 基础 Node 和 Express

Node.js 是一个 JavaScript 运行环境，它允许开发者使用 JavaScript 来写后端（服务端）程序。
Express 是一个轻量级的网络应用程序框架，是最受欢迎的 npm 软件包之一。

### Express 响应字符串

在 Express 中，路由采用这种结构：`app.METHOD(PATH, HANDLER)`， METHOD 是 http 请求方法的小写形式， PATH 是服务器上的相对路径（它可以是一个字符串，甚至可以是正则表达式）， HANDLER 是匹配路由时 Express 调用的函数， 处理函数采用这种形式：`function(req, res) {...}`，其中 req 是请求对象，res 是响应对象，例如：

``` javascript
function(req, res) {
  res.send('Response String');
}
```

### 提供 HTML 文件服务

通过 `res.sendFile(path)` 方法给请求响应一个文件， 可以把它放到路由处理 `app.get('/', ...)` 中。  
此方法需要文件的绝对路径。 建议使用 Node. js 的全局变量 `__dirname` 来计算出这个文件的绝对路径：

``` javascript
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/views/index.html');
})
```

### 提供静态资源服务

在 Express 中可以使用中间件 `express.static(path)` 来设置静态资源目录，它的参数 path 就是包含静态资源文件的绝对路径。  
中间件就是一个拦截路由处理方法并在里面添加一些信息的函数。  
使用 `app.use(path, middlewareFunction)` 方法来加载一个中间件， 它的第一个参数 path 是可选的， 如果没设置第一个参数，那么所有的请求都会经过这个中间件处理。

``` javascript
app.use('/public', express.static(__dirname + '/public'))
```

### 在指定路由上提供 JSON 服务

使用 res.json() 方法:

``` javascript
app.get('/json',(req,res)=>{
  res.json({"message": "Hello json"});
})
```

### 使用 .env 文件

`.env` 文件是一个用于将环境变量传给应用程序的隐藏文件， 这是一个除了开发者之外没人可以访问的私密文件，它可以用来存储你想保密或者隐藏的数据， 例如，它可以存储第三方服务的 API 密钥或者数据库 URI， 也可以使用它来存储配置选项， 通过设置配置选项，你可以改变应用程序的行为，而无需重写一些代码。  
在应用程序中可以通过 `process.env.VAR_NAME` 访问到环境变量。 `process.env` 对象是 Node 程序中的一个全局对象，可以给这个变量传字符串。 习惯上，变量名全部大写，单词之间用下划线分隔。 .env 是一个 shell 文件，因此不需要用给变量名和值加引号。还有一点需要注意，当你给变量赋值时等号两侧不能有空格，例如：`VAR_NAME=value`。 通常来讲，每一个变量定义会独占一行。  
在本地需要 `dotenv` 包。 它将环境变量从你的 .env 文件加载到 `process.env` 中。 使用 `npm install dotenv` 安装它。 然后，在 myApp.js 文件的顶部，使用 `require('dotenv').config()` 导入和加载变量。

### 实现一个根级的请求记录中间件

中间件函数是一个接收 3 个参数的函数，这 3 个参数分别是：请求对象、响应对象和在应用的请求-响应循环中的下一个函数。 中间件函数执行一些可能对应用程序产生一些效果的代码，通常还会在请求对象或者响应对象里添加一些信息， 它们也可以在满足某些条件时通过发送响应来结束循环， 如果在它们完成时没有发送响应，那么就会开始执行堆栈中的下一个函数， next() 将触发调用第 3 个参数。

``` javascript
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

假设在某个路由上安装了这个中间件函数， 当一个请求与路由匹配时，它会显示字符串“I’m a middleware…”，然后它执行堆栈中的下一个函数。

``` javascript
app.use(function(req, res, next) {
  console.log(req.method+' '+req.path+' '+'-'+' '+req.ip);
  next();
})
```

### 通过链式调用中间件来创建时间服务

使用 `app.METHOD(path, middlewareFunction)` 可以在指定的路由挂载中间件， 也可以在路由定义中链式调用中间件。  
此方法可用于将服务操作拆分为较小的单元， 这可以让应用拥有更好的结构，也便于在不同的位置上复用代码； 此方法还可用于对数据执行某些验证。 可以在每一个中间件堆栈中，阻止当前链的执行，并将控制权传递给专门设计用于处理错误的函数； 或者可以将控制权传递给下一个匹配的路由，以处理特殊情况。

``` javascript
app.get('/now',
(req, res, next)=> {req.time=new Date().toString();next();},
(req,res)=>{res.json({time: req.time});}
)
```

### 从客户端获取输入的路由参数

路由参数是由斜杠（/）分隔的 URL 命名段， 每一小段能捕获与其位置匹配的 URL 部分的值， 捕获的值能够在 `req.params` 对象中找到。

``` javascript
路由地址：'/user/:userId/book/:bookId'
实际请求 URL：'/user/546/book/6754'
req.params：{userId: '546', bookId: '6754'}
```

例如：在路由 `GET /:word/echo` 中构建一个响应服务， 响应一个采用 `{echo: word}` 结构的 JSON 对象。

``` javascript
app.get('/:word/echo',(req,res)=>{
  res.json({echo: req.params.word});
})
```

### 从客户端获取输入的查询参数

从客户端获取输入的另一种常见方式是使用查询字符串对路由路径中的数据进行编码， 查询字符串使用标记（?）分隔，并且包含键值对 `field=value`， 每对键值使用连字号（&）分隔。 Express 能够从查询字符串中解析这些数据，并且把它放到 `req.query` 对象中。

``` javascript
路由地址：'/library'
实际请求 URL：'/library?userId=546&bookId=6754'
req.query：{userId: '546', bookId: '6754'}
```

例如：构建一个 API 接口，使用路由挂载在 `GET /name` 上， 使用一个 JSON 文件来响应，它的结构是这样的：`{ name: 'firstname lastname'}`

``` javascript
app.get('/name', (req,res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`
  });
})
```

### 使用 body-parser 来解析 POST 请求

POST 是使用 HTML 表单发送客户端数据的默认方法。 在 REST 规范中，POST 常用于发送数据以在数据库中创建新项目（新用户或新博客文章）。

``` javascript
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25
```

正文被编码成类似查询字符串的形式， 这是 HTML 表单使用的默认格式。  
还有另一种类型的编码：`multipart/form-data`， 它被用来上传二进制文件。  
要解析来自 POST 请求的数据，你必须安装 `body-parser` 包， 这个包包含一套可以解码不同格式数据的中间件。  
示例：在 package.json 中安装 body-parser 模块， 然后在文件顶部 require 进来， 用变量 bodyParser 保存它。 通过中间件的 `bodyParser.urlencoded({extended: false})` 方法处理 URL 编码数据， 将通过先前的方法调用返回的函数传递到 `app.use()`。  
**注意**：extended 是一个配置选项, 告诉 body-parser 需要使用哪个解析。 当 extended=false 时，它使用经典编码 querystring 库。 当 `extended=true`时，它使用 qs 库进行解析。  
当使用 `extended=false` 时，值可以只是字符串或数组。 使用 querystring 时返回的对象并不继承的 `JavaScript Object`，这意味着 `hasOwnProperty`、`toString` 等函数将不可用。

``` javascript
let bodyParser=require('body-parser')
app.use('/',bodyParser.urlencoded({extended: false}))
```

### 从 POST 请求中获取数据

如果 body-parser 正确配置好了，那么就可以在 `req.body` 对象中找到请求的参数。  
示例：

``` javascript
路由：POST '/library'
URL 编码的请求正文：userId=546&bookId=6754
req.body：{userId: '546', bookId: '6754'}
```

**提示**：除了 GET 和 POST，还有其他几种 http 方法。 按照惯例，http 动词和在服务端执行的某种操作之间有对应关系， 这种对应关系通常如下：  
POST（有时候是 PUT）- 使用请求发送信息，以创建新资源；  
GET - 读取不用修改的已存在的资源；  
PUT 或者 PATCH（有时候是 POST）- 发送数据，以更新资源；  
DELETE => 删除一个资源。  
还有其他两种方法常用于与服务进行交互。 除了 GET 之外，上面列出的所有方法都可以负载数据（即数据都能放到消息正文中）， 这些方法也可以使用 body-parser 中间件。

在路径 /name 挂载一个 POST 处理方法，响应和前面一样的 JSON 对象 {name: 'firstname lastname'}。

``` javascript
app.post('/name', (req,res) => {
  res.json({
    name: `${req.body.first} ${req.body.last}`
  });
})
```

## MongoDB 和 Mongoose

MongoDB 是一个存储你可以在应用程序中使用的 JSON 文件（或记录）的数据库应用程序。不同于SQL，另一种类型的数据库。Mongo 是一个非关系型或 “NoSQL” 数据库。这意味着 Mongo 将所有相关数据存储在一个记录中，而不是像 SQL 数据库中那样在许多预设表中存储数据。  
Mongoose 是一个广泛使用的 npm 包，通常和 Mongo 一起安装。通过 Mongoose，你可以使用 JavaScript 对象而不是 JSON ，这样就更容易与 Mongo 配合使用。此外，它允许你创建文件架构，即 schema，所以你不会意外地保存错误的数据类型并出现 bug。

### 安装和设置 Mongoose

创建一个 .env 文件，给它添加一个 `MONGO_URI` 变量，变量的值为你的 MongoDB Atlas 数据库 URI。  
连接数据库：

``` javascript
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
```

### 创建一个模型（Model）

首先，我们需要一个 Schema， 每一个 Schema 都对应一个 MongoDB 的 collection， 并且在相应的 collection 里定义 documents 的“样子”。 Schema 用于组成模型（Model），可以通过嵌套 Schema 来创建复杂的模型。我们可以根据模型创建实例，模型实例化后的对象称为 documents。

``` javascript
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
  });

const Person=mongoose.model('Person', personSchema);
```

详情参考[mongoose文档](https://mongoosejs.com/docs/guide.html)

### 创建并保存一条 Model 记录

`done()` 是一个回调函数，它的作用是在一个异步操作（比如对数据库进行插入、查询、更新或删除）执行完成时，通知我们可以继续执行后续的其它代码。 这与 Node.js 中的处理方式十分类似，在 Node.js 中，我们会在（异步操作）成功时调用 `done(null, data)`，在失败时调用 `done(err)`。

``` javascript
/* Example */
const someFunc = function(done) {
  if (error) return done(error);
  done(null, result);
};
```

在 createAndSavePerson 函数中，用我们在上一个挑战中写好的 Person 构造函数创建 document 实例， 然后在返回的 document 实例上调用方法 `document.save()`。 同时，按 Node.js 的方式为它传一个回调函数。 这是一种常见模式，以下所有CRUD方法都将这样的回调函数作为最后一个参数。

``` javascript
const createAndSavePerson = (done) => {
const xugw =new Person({name:"xugw",age:18,favoriteFoods:["meat", "fruit"]});
xugw.save((error,data)=>{
  if (error) return done(error);
  done(null, data);
})
};
```

### 使用 model.create() 创建多条记录

`Model.create()` 接受一组像 `[{name: 'John', ...}, {...}, ...]` 的数组作为第一个参数，并将其保存到数据库。

``` javascript
const arrayOfPeople=[
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(error,data)=>{
  if (error) return done(error);
  done(null, data);
})
};
```

### 使用 model.find() 查询数据库

`Model.find()` 接收一个查询 document（一个 JSON 对象）作为第一个参数，一个回调函数作为第二个参数， 它会返回由匹配到的数据组成的数组。

``` javascript
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, data) => {
    if (error) return done(error);
    done(null, data);
  });
};
```

### 使用 model.findOne() 从数据库中返回一个单一匹配的 Document

`Model.findOne()` 与 `Model.find()` 十分类似，但就算数据库中有很多条数据可以匹配查询条件，它也只返回一个 document，而不会返回一个数组。

``` javascript
const findOneByFood = (food, done) => {
Person.findOne({favoriteFoods: food},(error, data)=>{
    if (error) return done(error);
    done(null, data);
  });
};
```

### 使用 model.findById() 方法，根据 _id 来搜索数据

在保存 document 的时候，MongoDB 会自动为它添加_id 字段，并给该字段设置一个唯一的仅包含数字和字母的值。 通过_id 搜索是一个十分常见的操作，为此，Mongoose 提供了一个专门的方法。

``` javascript
const findPersonById = (personId, done) => {
Person.findById(personId,(error, data)=>{
    if (error) return done(error);
    done(null, data);
  });
};
```

### 通过执行查询、编辑、保存来执行经典更新流程

Mongoose 的方法 Model.update()可以更新document， 它与底层的 mongo 驱动绑定。 通过这个方法，我们可以批量编辑符合特定条件的多个 document。但问题在于，这个方法不会返回更新后的 document，而是返回状态信息。 此外，它直接调用 mongo 的底层驱动，让处理 model 的验证变得更加棘手。

``` javascript
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(error, data)=>{
    if (error) return done(error);
    data.favoriteFoods.push(foodToAdd);
    data.save((error,data)=>{
      if (error) return done(error);
      done(null, data);
    })
  });
};
```

### 在 document 中执行新的更新方式——使用 model.findOneAndUpdate()

`findByIdAndUpdate()`方法简化了 document 的更新方式， 但同时，一些高级功能（如 pre/post hook, 验证）的使用方式也变得和以前不同。  
把 `findOneAndUpdate()` 的第三个参数设置为 `{ new: true }` ，会返回更新后的 document。默认情况下，这个方法会返回修改前的数据。

``` javascript
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name: personName},{age: ageToSet}, {new: true},(error, data)=>{
    if (error) return done(error);
    done(null, data);
  });
};
```

### 使用 model.findByIdAndRemove 删除一个 document

`findByIdAndRemove()` 和 `findOneAndRemove()` 类似于我们之前的更新方法， 它们将被删除的 document 传给数据库。

``` javascript
const removeById = (personId, done) => {
Person.findByIdAndRemove(personId,(error, data)=>{
    if (error) return done(error);
    done(null, data);
  });
};
```

### 使用 model.remove() 删除多个 document

`Model.remove()` 可以用于删除符合给定匹配条件的所有 document。  
`Model.remove()` 不会返回被删除的 document，而是会返回一个包含操作结果以及受影响的数据数量的 JSON 对象。

``` javascript
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name: nameToRemove},(error, data)=>{
    if (error) return done(error);
    done(null, data);
  });
};
```

### 通过链式调用辅助查询函数来缩小搜索结果

如果不给 `Model.find()`（或者别的搜索方法）的最后一个参数传入回调函数, 查询将不会执行。 可以将查询条件存储在变量中供以后使用， 也可以通过链式调用这类变量来构建新的查询字段。 实际的数据库操作会在最后调用 `.exec()` 方法时执行。 必须把回调函数传给最后一个方法。 Mongoose 提供了许多辅助查询函数, 这里使用最常见的一种。

``` javascript
const queryChain = (done) => {
  const foodToSearch = "burrito";
Person.find({favoriteFoods: foodToSearch})
  .sort({name:1})    //1表示升序；-1表示降序
  .limit(2)
  .select({age: 0})  //0表示false，隐藏；1表示true，显示。
  .exec((error, data)=>{
    if (error) return done(error);
    done(null, data);
  })
};
//Callback:
//YourQuery.exec(function(err, docs) {});
//Promise:
//YourQuery.exec.then(function(err, docs) {});
```
