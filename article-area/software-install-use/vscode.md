# VSCode 插件 & 配置

## 前言

Visual Studio Code 是一个由微软公司发布的免费开源且跨平台的代码编辑器，  

?> 官网：<https://code.visualstudio.com/> ，  

插件官网：<https://marketplace.visualstudio.com/> 。

## 主题外观

- Chinese (Simplified) Language Pack for Visual Studio Code
  - 中文插件

- VSCode Great Icons
  - 文件图标插件

- Material Icon Theme
  - 文件图标插件

- vscode-icons
  -文件图标插件

- 浅紫色主题

    ``` json
    "workbench.colorTheme": "Quiet Light",
    ```

- Sublime Monokai
  - 一款 Monokai 主题

- Noctis
  - Noctis Hibernus -- 浅青色主题
  - Noctis Lilac -- 浅紫色主题

- 文本字体大小

    ``` json
    "editor.fontSize": 15,
    ```

- 关闭缩略图

    ``` json
    "editor.minimap.enabled": false,
    ```

## 文本编辑

- Python & Pylance
  - Python插件

- Visual Studio Intellicode
  - 代码智能提示

- Path Intellisense
  - 文件路径智能提示

- HTML Snippets
  - HTML代码片段

- HTML CSS Support
  - HTML id 和 class 提示

- Markdown Preview Enhanced
  - Markdown 支持

- markdownlint
  - Markdown 语法校正

    ``` json
      "markdownlint.config": {
        "default": true,
        "MD033": false
      },
    ```

- Paste Image
  - Markdown 图片快速粘贴

- 自动格式化文档

    ``` json
    "editor.formatOnSave": true,
    ```

- autopep8
  - Python编码规范插件

    ``` json
    "python.formatting.autopep8Args": [
            "--ignore=E501,E402"
          ],
    ```

## 技术工具

- Live Server
  - 实时本地服务器

- GitLens — Git supercharged
  - 一款增强 Git 功能的 VScode 插件

- SQLite Viewer
  - SQLite 查看插件

- markmap
  - Markdown 思维图工具

- 设置默认终端

    ``` json
    "terminal.integrated.defaultProfile.windows": "PowerShell",
    ```

- 添加 GitBash 终端

    ``` json
    "terminal.integrated.profiles.windows": {
            "GitBash": {
              "path": "D:\\ProgramFiles\\Git\\bin\\bash.exe",
            }
          },
    ```
