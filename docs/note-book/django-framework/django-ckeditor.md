# django 后台使用 CKEditor

django-ckeditor 是一个集成 ckeditor 富文本编辑器的 django 第三方库。

> <https://github.com/django-ckeditor/django-ckeditor/>

## 安装 & 配置

``` bash
pip install django-ckeditor
pip install pillow
```

``` python
# settings.py
INSTALLED_APPS = [
    # ...
    'ckeditor',
]
```

## 修改模型

``` python
# models.py
from django.db import models
from ckeditor.fields import RichTextField
class Post(models.Model):
    # ...
    content = models.RichTextField()
    # ...
```

## 迁移

``` bash
python manage.py makemigrations
python manage.py migrate
```

后台管理界面的富文本编辑器就初步完成了。

## 自定义工具栏

``` python
# settings.py
CKEDITOR_CONFIGS = {
    'default': {
        # 编辑器宽度自适应
        'width': 'auto',
        'height': '250px',
        # tab键转换空格数
        'tabSpaces': 4,
        'toolbar': 'Custom',
        'toolbar_Custom': [
            ['Format', 'Font', 'CodeSnippet', 'TextColor', 'BGColor'],
            ['Bold', 'Italic', 'Underline', 'RemoveFormat'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', ],
            ['Link', 'Unlink'],
            ['NumberedList', 'BulletedList'],
            ['Maximize']
        ],
        'extraPlugins': ','.join(['codesnippet']),
    }
}
```

- width 、 height 调整文本框的大小；
- Custom 表示自定义工具栏；
- toolbar_Custom 用来设置工具栏的组件。

> <https://github.com/django-ckeditor/django-ckeditor/#example-ckeditor-configuration>

## 代码高亮

### 下载插件

> <https://ckeditor.com/cke4/addon/prism>

将解压后的 prism 文件夹放入 site-packages\ckeditor\static\ckeditor\ckeditor\plugins 目录下。

### 下载主题

> <https://prismjs.com/download>

选择主题、语言之后下载CSS文件，并放入项目文件夹的 static\prism 目录下，然后在模板中引用该CSS文件：

``` html
<link rel="stylesheet" href="{% static 'prism/prism.css' %}">
```

## 上传图片功能

### 修改配置

``` python
# settings.py
INSTALLED_APPS = [
    # ...
    'ckeditor',
    'ckeditor_uploader',
]
```

- 在 Django 中使用文件存储功能，需要定义 MEDIA_ROOT 作为你希望 Django 存储上传文件的目录的完整路径；
- 定义 MEDIA_URL 作为该目录的基本公共 URL，故需要添加以下内容到配置文件；
- 定义 upload_to 选项，指定 MEDIA_ROOT 的子目录，用于上传文件。

``` python
# settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
CKEDITOR_UPLOAD_PATH = 'upload/'
```

### 修改路由

``` python
# xugw_blog.urls.py
urlpatterns = [
    #...
    path('ckeditor/', include('ckeditor_uploader.urls')),
]
```

!> 开发期间，以下设置可以为用户上传文件提供服务；在生产中应该使用真正的前端 Web 服务器来服务这些文件：

``` python
# xugw_blog.urls.py
from django.conf import settings
from django.conf.urls.static import static
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 更改模型

``` python
# models.py
from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
class Post(models.Model):
    # ...
    content = models.RichTextUploadingField()
    # ...
```
