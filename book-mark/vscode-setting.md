# vscode 配置

``` json
// settings.json
{
// 字体设置
"editor.fontSize": 15,

// 关闭右侧缩略图
"editor.minimap.enabled": false,

// markdownlint 设置
"markdownlint.config": {
    "default": true,
    "MD033": false
  },

// 保存时自动格式化文档
"editor.formatOnSave": true,

// autopep8 忽略 E501,E402
"python.formatting.autopep8Args": [
        "--ignore=E501,E402"
      ],

// 设置 PowerShell 为默认终端
"terminal.integrated.defaultProfile.windows": "PowerShell",

// 添加 GitBash 终端
"terminal.integrated.profiles.windows": {
        "GitBash": {
          "path": "D:\\ProgramFiles\\Git\\bin\\bash.exe",
        }
      },

// pasteImage 图片名称前缀和保存目录
"pasteImage.namePrefix": "IMG-",
"pasteImage.path": "${currentFileDir}/images",

// 设置 vue 的默认格式化程序
"[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },

// 设置 eslint 为 js 和 vue 的格式化程序
"eslint.validate": [
    "javascript",
    "vue"
  ],
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
  },
}
