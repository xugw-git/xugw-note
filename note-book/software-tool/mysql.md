# MySQL & HeidiSQL

MySQL 是最流行的关系型数据库管理系统之一，由瑞典 MySQL AB 公司开发，属于 Oracle 旗下产品。
HeidiSQL 是一款 MySQL 的图形化界面工具。

## 下载

?> MySQL：<https://dev.mysql.com/downloads/installer/>  

?> HeidiSQL：<https://www.heidisql.com/download.php>

## 安装

- Setup Type - 选择Custom ；
- Available Products - 添加 MySQL Server ；
- 设置安装路径 D:\ProgramFiles\MySQL\MySQL Server 8.0\bin

## 连接数据库

``` bash
mysql -u root -p
```

## 系统环境变量

如果连接数据库时出现 **'mysql' 不是内部或外部命令，也不是可运行的程序或批处理文件。** 的提示，应该是由于未配置环境变量。

- 打开Windows的高级系统设置、环境变量
- 编辑系统变量Path、点击新建
- 添加MySQL的路径 D:\ProgramFiles\MySQL\MySQL Server 8.0\bin。

## 基础语句

### 查看当前服务器中的数据库

``` bash
SHOW DATABASES;    
```

### 查看数据库中包含的表

``` bash
USE 数据库名;   #注意：数据库名区分大小写
SHOW TABLES;
```

### 查看表的结构（设计、字段）

``` bash
DESCRIBE [数据库名.]表名;
或
DESC 表名;
```

### 创建新的数据库

``` bash
CREATE DATABASE 数据库名;
```

### 在数据库中新建表

``` bash
CREATE TABLE 表名 (字段1 数据类型,字段2 数据类型[,...][,PRIMARY KEY (主键名)]);
#主键一般选择能代表唯一性的字段不允许取空值（NULL），一个表只能有一个主键。
```

### 删除指定表

``` bash
DROP TABLE [数据库名.]表名;    #如不用USE进入库中，则需加上数据库名
```

### 删除指定数据库

``` bash
DROP DATABASE 数据库名;
```

### 添加语句

``` bash
INSERT INTO 表名(字段1,字段2[,...]) VALUES(字段1的值,字段2的值,...);
```

### 查询语句

``` bash
SELECT 字段名1,字段名2[,...] FROM 表名 [WHERE 条件表达式];
#从0行开始共几行
SELECT * FROM 表名 limit 行数 
#根据行数范围取记录数
SELECT * FROM 表名 limit 开始行数（不包括）,行数
```

### 更新语句

``` bash
UPDATE 表名 SET 字段名1=字段值1[,字段名2=字段值2] [WHERE 条件表达式];
```

### 删除语句

``` bash
DELETE FROM 表名 [WHERE 条件表达式];
```
