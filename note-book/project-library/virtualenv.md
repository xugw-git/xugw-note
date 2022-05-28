# Virtaulenvwrapper

Python 的虚拟解释器环境技术可以帮助我们创建多个彼此分隔的虚拟环境，每个虚拟环境可以安装各自需要的第三方库，互不干扰。

- Virtaulenvwrapper 是 virtualenv 的扩展包，用于管理虚拟环境，它可以将所有虚拟环境整合在一个目录下。
- 其他诸如 venv 、 virtualenv 、 pipenv 等库也可以帮助创建虚拟环境。

## 安装

``` bash
pip install virtualenvwrapper-win
```

## 环境变量

虚拟环境默认的创建目录是 windows 用户目录下，可以通过修改 **环境变量** 来自定义更换。

?> 计算机→属性→高级系统设置→环境变量 - 新建——系统变量：{变量名：WORKON_HOME，变量值：自定义路径}

## 创建虚拟环境

``` bash
mkvirtualenv <virtualenv_name>
mkvirtualenv -p python<ver> <virtualenv_name> #指定解释器
```

## 激活虚拟环境

``` bash
workon #虚拟环境列表
workon <virtualenv_name>
```

## 退出

``` bash
deactivate
```

## 删除

``` bash
rmvirtualenv <virtualenv_name>
```

## 其他相关指令

- 查看当前已安装库的版本

``` bash
pip freeze
```

- 导入TXT中的所有包

``` bash
pip install -r requirements.txt
```

- 导出所有包到TXT

``` bash
pip freeze > requirements.txt
```

- 进入 site-packages 目录

``` bash
cd sitepackages
```
