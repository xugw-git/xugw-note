# WSL2 - Ubuntu-20.04

WSL 2 是适用于 Linux 的 Windows 子系统体系结构的一个新版本。  

> 安装教程：<https://docs.microsoft.com/zh-cn/windows/wsl/>

## Ubuntu-20.04安装步骤

### 启用 Windows 可选功能

启用 **适用于 Linux 的 Windows 子系统** 和 **虚拟机平台** 两个 Windows 可选功能。

### 下载 Linux 内核更新包

> [微软下载地址](<https://docs.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package>)

### 将 WSL 2 设置为默认版本

``` bash
wsl --set-default-version 2
```

### 安装

在 Microsoft Store 中搜索 Ubuntu-20.04 安装。
安装完后确认下版本：

``` bash
wsl -l -v
```

### 更换apt安装源

备份 **sources.list** ：

``` bash
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

执行 `vi sources.list` 打开文件， 按 `:` 入底行模式，把域名从从 **cn.archive.ubuntu.com** 替换为 **mirrors.aliyun.com**：

``` bash
1,$s/cn.archive.ubuntu.com/mirrors.aliyun.com/g
```

确认无误后，`:wq` 保存并退出，再执行更新：

``` bash
apt update
```
