# MongoDB

## 下载

> MongoDB：<https://www.mongodb.com/try/download/community/>  

## 启动服务

先创建目录 \data\db

``` bash
# bin目录
mongod --dbpath=..\data\db
```

## 安装MongoDB作为Windows服务

- 创建配置文件

MongoDB的安装目录（`D:\\ProgramFiles\\mongodb-win32-x86_64-windows-6.0.15`）下创建配置文件`mongod.cfg`：

```yml
systemLog:  
   destination: file  
   path: "D:\\ProgramFiles\\mongodb-win32-x86_64-windows-6.0.15\\mongod.log"  
   logAppend: true  
storage:  
   dbPath: "D:\\ProgramFiles\\mongodb-win32-x86_64-windows-6.0.15\\data\\db"  
net:  
   port: 27017  
   bindIp: 127.0.0.1
```

> 请确保data\db目录已经存在

- 安装MongoDB作为服务

以管理员身份打开命令提示符：

```bash
D:\ProgramFiles\mongodb-win32-x86_64-windows-6.0.15\bin\mongod.exe --config "D:\ProgramFiles\mongodb-win32-x86_64-windows-6.0.15\mongod.cfg" --install --serviceName "MongoDB"
```

- 启动MongoDB服务

```bash
net start MongoDB
```

- 停止MongoDB服务

```bash
net stop MongoDB
```

## 可视化工具

> MongoDB Compass：<https://www.mongodb.com/try/download/compass>

> navicat-premium：<https://www.navicat.com.cn/products/navicat-premium>
