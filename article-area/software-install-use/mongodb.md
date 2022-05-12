# MongoDB & Mongoose

## 前言

MongoDB 是一个基于分布式文件存储的非关系型数据库。  
MongoDB Atlas 是 MongoDB 官方提供的免费云数据库。  
Mongoose 是一个对象文档模型库，是对 Nodejs 原生的 MongoDB 模块进一步的优化封装。

## MongoDB Atlas

### 注册 Atlas 账号

?> <https://account.mongodb.com/account/register>

### 创建集群

选择 JavaScript 作为首选编程语言。
云提供商和区域选择 Azure + Hongkong。

### 创建数据库用户

Database Access - 创建用户名和密码。

### 允许所有 IP 地址访问

Network Access - ALLOW ACCESS FROM ANYWHERE(0.0.0.0/0)

### 连接集群

- Database
- Connect - Connect your application
- Add your connection string into your application code

``` bash
mongodb+srv://xugw:<password>@cluster0.jnkyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

替换 `<password>` 和 `myFirstDatabase` 得到 URI。

## Mongoose

?> 文档：<https://mongoosejs.com/docs/guide.html>

### 安装

``` bash
npm install mongoose
```

### 连接数据库

```javascript
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
```

`.env.MONGO_URI` 即 MongoDB Atlas 数据库 URI。

### schema 和 Model

每一个 Schema 都对应一个 MongoDB 的 collection， 并且在相应的 collection 里定义 documents 的“样子”。  
使用 `mongoose.model(modelName, schema)` 函数将 schema 转换为一个 Model。

``` javascript
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
  });

const Person=mongoose.model('Person', personSchema);
```

### 增删改查

Document：<https://mongoosejs.com/docs/api/document.html>  
Model API：<https://mongoosejs.com/docs/api/model.html>  

- `document.save()`
- `Model.create()`
- `Model.remove()`
- `model.findOneAndUpdate()`
- `model.find()`

查询限制：

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
```
