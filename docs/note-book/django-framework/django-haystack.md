# django-haystack & Whoosh

Django-haystack 是一个专门为 Django 提供搜索功能的第三方应用，它支持 Solr、Elasticsearch、Whoosh、Xapian 等多种搜索引擎。

> 文档：<https://django-haystack.readthedocs.io/en/v3.1.1/toc.html>

## 安装 & 配置

``` bash
pip install django-haystack
pip install whoosh
pip install jieba
```

``` python
# settings.py
INSTALLED_APPS = [
    #...
    'haystack', #添加到博客应用前
    'blog',
    #...
]

#...

import os
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'blog.whoosh_backend.WhooshEngine',
        'PATH': os.path.join(BASE_DIR, 'whoosh_index'),
    },
}
HAYSTACK_SEARCH_RESULTS_PER_PAGE = 100
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'
```

- HAYSTACK_SEARCH_RESULTS_PER_PAGE 是对搜索结果分页；
- HAYSTACK_SIGNAL_PROCESSOR：此设置控制用于处理Django信号的类，并使搜索索引保持最新。

## 创建索引

- SearchIndex 对象是 Haystack 确定应将哪些数据放置在搜索索引中并处理数据流的方式。
- 要构建 SearchIndex ，只需对 index.SearchIndex 和 index.Indexable 进行子类化，定义要存储数据的字段并定义 get_model 方法。

在应用目录下新建 search_indexes.py ：

``` python
from haystack import indexes
from .models import Post
class PostIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)

    def get_model(self):
        return Post

    def index_queryset(self, using=None):
        return self.get_model().objects.all()
```

每个 SearchIndex 都要求有一个（并且只有一个） `document=True` 的字段。  
这会向 Haystack 和搜索引擎指示哪个字段是搜索的主要字段。  
此外，我们在文本字段中提供 `use_template=True` 。

这允许我们使用数据模板来构建搜索引擎将索引的文档。您需要在模板目录中创建一个名为 templates/search/index/blog/Post_text.txt 的新模板，并将以下内容，即 Post 模型中我们希望搜索的字段放入其中：

``` default
{{object.title}}
{{object.subtitle}}
{{object.content}}
{{object.category}}
{{object.tag}}
```

## 路由

``` python
# urls.py
from . import search_views
urlpatterns = [
    #...
    path('search', search_views.MySeachView(), name='haystack_search'),
    #...
]
```

## 模板

默认目录是templates/search/search.html：

``` html
...
<body>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light shadow">
        ...
        <form class="d-flex" method="get" action="{% url 'haystack_search' %}">
            {% csrf_token %}
            <div class="input-group">
                <input class="form-control" type="search" placeholder="输入你感兴趣的内容" name="q">
                <button class="btn btn-warning text-dark" type="submit">搜索</button>
            </div>
        </form>
        ...
    </nav>
    ...
    <main>
        ...
        <div class="col-12">
            <form class="d-flex my-3" method="get" action="{% url 'haystack_search' %}">
                {% csrf_token %}
                <div class="input-group">
                    <input class="form-control" type="search" placeholder="{{query}}" name="q">
                    <button class="btn btn-warning text-dark" type="submit">搜索</button>
                </div>
            </form>
            {% if query %}
            {% if page.object_list|length > 5 %}
            <div class="card border p-2 my-2 bg-light">
                <h3 class="text-center">搜索到{{page.object_list|length}}篇相关文章</h3>
                <div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-arrow-down-circle-fill me-2 text-primary" viewBox="0 0 16 16">
                        <path
                            d="..." />
                    </svg>
                </div>
            </div>
            {% for result in page.object_list %}
            <div class="card border py-2 px-3 my-2">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="badge bg-{{result.object.category.color}} mb-2">
                            {{result.object.category.name}}</div>
                        <span class="mx-2 small">{{result.object.add_time|date:"Y-m-d H:i"}}</span>
                        <span class="small me-2">浏览：{{result.object.view_count}}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-suit-heart-fill text-danger like" viewBox="0 0 16 16">
                            <path
                                d="..." />
                        </svg>
                        <span class="small">{{result.object.like_count}}</span>
                        <h3 class="card-title">
                            <a href="{% url 'home' %}{{result.object.title}}"
                                class="link-dark stretched-link btn-link-hover">{{result.object.title}}</a>
                        </h3>
                        <div>
                            {% for tag in result.object.tag.all %}
                            <span class="badge rounded-pill bg-{{tag.color}}">{{tag.name}}</span>
                            {% endfor %}
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <p>{{result.object.subtitle}}</p>
                    </div>
                    <div class="col-lg-3 text-center">
                        ...
                    </div>
                </div>
            </div>
            {% endfor %}
            {% else %}
            <div class="card border p-2 my-2 bg-light">
                <h3 class="text-center">搜索到{{page.object_list|length}}篇相关文章</h3>
                <div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        class="bi bi-arrow-down-circle-fill me-2 text-primary" viewBox="0 0 16 16">
                        <path
                            d="..." />
                    </svg>
                </div>
            </div>
            {% for result in page.object_list %}
            <div class="card border py-2 px-3 my-2">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="badge bg-{{result.object.category.color}} mb-2">
                            {{result.object.category.name}}</div>
                        <span class="mx-2 small">{{result.object.add_time|date:"Y-m-d H:i"}}</span>
                        <span class="small me-2">浏览：{{result.object.view_count}}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-suit-heart-fill text-danger like" viewBox="0 0 16 16">
                            <path
                                d="..." />
                        </svg>
                        <span class="small">{{result.object.like_count}}</span>
                        <h3 class="card-title">
                            <a href="{% url 'home' %}{{result.object.title}}"
                                class="link-dark stretched-link btn-link-hover">{{result.object.title}}</a>
                        </h3>
                        <div>
                            {% for tag in result.object.tag.all %}
                            <span class="badge rounded-pill bg-{{tag.color}}">{{tag.name}}</span>
                            {% endfor %}
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <p>{{result.object.subtitle}}</p>
                    </div>
                    <div class="col-lg-3 text-center">
                        ...
                    </div>
                </div>
            </div>
            {% endfor %}
            ...
            {% for post in top5_posts_by_view %}
            ...
            {% endfor %}
            {% endif %}
            {% else %}
            ...
            {% for post in top5_posts_by_view %}
            ...
            {% endfor %}
            {% endif %}
        </div>
        ...
    </main>
...
</body>

</html>
```

请注意， page.object_list 实际上是 SearchResult 对象的列表，而不是单个模型，项目配置文件中的 HAYSTACK_SEARCH_RESULTS_PER_PAGE = 100 正是列表第一项的数量。  
这些对象在搜索索引中包含从该记录返回的所有数据。  
他们还可以通过 `{{result.object}}` 直接访问结果的模型。  
因此， `{{result.object.title}}` 使用数据库中的实际 Post 对象并访问其 title 字段。
  
页面设计如下：  

- 未搜索时，默认呈现浏览量前5的文章；
- 搜索时如果搜索结果大于5篇，呈现搜索到n篇相关文章的字样并排列搜索结果；
- 搜索时如果搜索结果小于等于5篇，呈现搜索到n篇相关文章的字样并排列搜索结果以及浏览量前五的文章。

## 中文分词

复制 site-packages/haystack/backends/whoosh_backend.py 到应用目录下，并重命名为 **whoosh_cn_backend.py** 。将其中的 `StemmingAnalyzer` 修改为 `ChineseAnalyzer` ：

``` python
from jieba.analyse import ChineseAnalyzer
#...
schema_fields[field_class.index_fieldname] = TEXT(stored=True, analyzer=ChineseAnalyzer(),field_boost=field_class.boost, sortable=True)
#...
```

配置搜索引擎：

``` python
# settings.py
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'blog.whoosh_cn_backend.WhooshEngine',
        'PATH': os.path.join(BASE_DIR, 'whoosh_index'),
    },
}
```

## 重置索引

``` bash
python manage.py rebuild_index
```
