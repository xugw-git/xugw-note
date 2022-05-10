## django.views.generic.base.View

**base.py** 中主要有三个类：  
`View` 类及其派生类：处理 HTTP 请求。根据 HTTP 请求方法的不同做出相应处理；  
`TemplateResponseMixin` 及其派生类：渲染模板；  
`ContextMixin` 及其派生类：获取渲染模板所需的模板变量字典。

### View

`View` 功能实现主要依赖于三个的方法: `dispatch`、`as_view`、`http_method_not_allowed`。

``` python
class View:
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
    #  初始化函数: 可以将传入的关键字参数 kwargs 设置为类的实例属性.

    @classonlymethod
    #  该装饰器只允许类调用这个方法, 不允许类实例调用.

    def as_view(cls, **initkwargs):
        for key in initkwargs:
            if key in cls.http_method_names:
                raise TypeError(
                    'The method name %s is not accepted as a keyword argument '
                    'to %s().' % (key, cls.__name__)
                )
            #  防止传入的参数将类的关键函数名覆盖掉.
            if not hasattr(cls, key):
                raise TypeError("%s() received an invalid keyword %r. as_view "
                                "only accepts arguments that are already "
                                "attributes of the class." % (cls.__name__, key))
            #  防止传入未定义为类属性的参数.

        def view(request, *args, **kwargs):
            self = cls(**initkwargs)
            #  实例化一个类视图对象.
            self.setup(request, *args, **kwargs)
            if not hasattr(self, 'request'):
                raise AttributeError(
                    "%s instance has no 'request' attribute. Did you override "
                    "setup() and forget to call super()?" % cls.__name__
                ) 
            #  将接收的参数赋值到类实例中, 初始化所有视图方法共享的属性.    
            return self.dispatch(request, *args, **kwargs)
            #  调用实例的dispatch方法, 即返回HTTP请求方法对应的视图函数.
        view.view_class = cls
        view.view_initkwargs = initkwargs
        update_wrapper(view, cls, updated=())
        update_wrapper(view, cls.dispatch, assigned=())
        #  把类中的文档字符串和函数名等更新到定义的 view 函数中.
        return view

    def setup(self, request, *args, **kwargs):
        if hasattr(self, 'get') and not hasattr(self, 'head'):
            self.head = self.get
        self.request = request
        self.args = args
        self.kwargs = kwargs

    def dispatch(self, request, *args, **kwargs):
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)
    #  根据 HTTP 请求类型调用 View 中的同名函数, 实现了请求的分发.

    def http_method_not_allowed(self, request, *args, **kwargs):
        logger.warning(
            'Method Not Allowed (%s): %s', request.method, request.path,
            extra={'status_code': 405, 'request': request}
        )
        return HttpResponseNotAllowed(self._allowed_methods())
    #  返回 HttpResponseNotAllowed 响应, 继承 HttpResponse 的子类, 表示当前的请求类型不被允许.

    def options(self, request, *args, **kwargs):
        response = HttpResponse()
        response.headers['Allow'] = ', '.join(self._allowed_methods())
        response.headers['Content-Length'] = '0'
        return response

    def _allowed_methods(self):
        return [m.upper() for m in self.http_method_names if hasattr(self, m)]
```

### View 总结

Django 将一个 HTTP 请求映射到一个可调用的函数，在定义 URL 路由的时候需要调用 `View` 的 `as_view` 方法；`as_view` 方法创建 View 类的实例，然后调用 `dispatch` 方法，根据请求类型分发处理请求的函数。  
类视图的核心思想就是把视图函数的逻辑定义到类的方法里面去，然后在函数中实例化这个类，通过调用类的方法实现函数逻辑。

## rest_framework.views.APIView

APIView 是 django.views.generic.base.View 的子类。

### as_view

``` python
@classmethod
    def as_view(cls, **initkwargs):
        if isinstance(getattr(cls, 'queryset', None), models.query.QuerySet):
            def force_evaluation():
                raise RuntimeError(
                    'Do not evaluate the `.queryset` attribute directly, '
                    'as the result will be cached and reused between requests. '
                    'Use `.all()` or call `.get_queryset()` instead.'
                )
            cls.queryset._fetch_all = force_evaluation

        view = super().as_view(**initkwargs)
        #  调用父类 View 的 as_view.
        view.cls = cls
        view.initkwargs = initkwargs

        return csrf_exempt(view)
        #  基于会话的身份验证是经过CSRF验证的, 所有其他身份验证都是CSRF豁免的.
```

当调用了父类 View 的 as_view 方法会执行 `self.dispatch()`，此处的 dispatch 方法是 APIView 的 `dispatch()` 方法。

### dispatch

与Django的常规调度几乎相同，但是有额外的钩子用于启动、完成和异常处理。

``` python
def dispatch(self, request, *args, **kwargs):
        self.args = args
        self.kwargs = kwargs
        request = self.initialize_request(request, *args, **kwargs)
        #  重新封装了request对象, initialize_request 方法返回 Request类 实例化对象.
        self.request = request
        self.headers = self.default_response_headers

        try:
            self.initial(request, *args, **kwargs)
        #  initial 方法中定义了认证组件-权限组件-限流组件.
            if request.method.lower() in self.http_method_names:
                handler = getattr(self, request.method.lower(),
                                  self.http_method_not_allowed)
            else:
                handler = self.http_method_not_allowed

            response = handler(request, *args, **kwargs)

        except Exception as exc:
            response = self.handle_exception(exc)

        self.response = self.finalize_response(request, response, *args, **kwargs)
        return self.response
```

### APIView 总结

URL 调用 APIView 类的 `as_view` 方法，`as_view` 内部调用 View 的 `as_view`，实例化类视图、返回 APIView 的 `dispatch()` 方法，在`dispatch()` 中重新封装 request 对象，接着对请求进行身份认证、权限检查、流量控制，重新封装 response 对象，最后完成类视图方法的调度，这里 `csrf_exempt(view)` 解除了浏览器请求时的csrf认证。

## rest_framework.generics.GenericAPIView

GenericAPIView 是 APIView 的子类，为标准列表和详细视图添加了通常所需的行为。

每个具体的通用视图都是通过将 GenericAPIView 类和一个或多个 minxin 类相互结合来构建的。

### GenericAPIView

``` python
class GenericAPIView(views.APIView):
    queryset = None
    #  用于从该视图返回对象的查询集, 必须设置此属性, 或重写 get_queryset() 方法.
    serializer_class = None
    #  用于验证和反序列化输入以及序列化输出的序列化类, 必须设置此属性, 或重写 get_serializer_class() 方法.
    lookup_field = 'pk'
    #  用于执行各个模型实例的对象查找的模型字段, 默认为 'pk'.
    lookup_url_kwarg = None
    #  用于对象查找的 URL 关键字参数. 
        URL conf 应该包含与此值相对应的关键字参数. 如果取消设置默认值, 使用与 lookup_field 相同的值.

    filter_backends = api_settings.DEFAULT_FILTER_BACKENDS
    #  用于过滤查询集的过滤后端类列表.
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    #  在对列表结果进行分页时应该使用的分页类.

    def get_queryset(self):
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
        #  确保 queryset 是 QuerySet 类型.
            queryset = queryset.all()
        return queryset
    #  返回用于列表视图的查询集, 并用于详细视图中查找的基础. 默认返回 queryset 属性指定的查询集.

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj
    #  返回用于详细视图的对象实例, 默认使用 lookup_field 参数来过滤基本查询集.

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)
    

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )

        return self.serializer_class
    #  返回用于序列化的类, 默认返回 serializer_class 属性.

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }
    #  返回包含应该被提供给序列化器的任何附加上下文的字典, 默认包括 request, view 和 format 键.

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        return queryset
    #  给定一个查询集, 使用任何后端过滤器进行过滤, 返回一个新的查询集.

    @property
    def paginator(self):
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator
    
    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)
    #  根据需要为查询集分页, 或者返回一个页面对象; 如果没有为该视图配置分页, 则为 None.

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)
    #  返回分页样式的 Response 对象.
```

### GenericAPIView 总结

GenericAPIView 是对 APIView 的扩展，主要增加了操作序列化器和数据库查询的方法，作用是为 Mixin 扩展类的执行提供方法支持；通常在使用时，可搭配一个或多个 Mixin 扩展类。

## rest_framework.mixins

mixin 类提供用于提供基本视图行为的操作，需要搭配 GenericAPIView，因为五个扩展类的实现需要调用 GenericAPIView 提供的序列化器与数据库查询的方法。

### ListModelMixin

``` python
class ListModelMixin:
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
#  实现列出查询集. 
    如果填充了查询集, 则返回 200 OK 响应, 并将查询集的序列化表示作为响应的主体; 响应数据可以选择分页.
```

### CreateModelMixin

``` python
class CreateModelMixin:
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}
#  实现创建和保存新模型实例.
    如果对象被创建, 则返回一个 201 Created 响应, 并将该对象的序列化表示形式作为响应的主体; 
    如果为创建对象而提供的请求数据无效, 则将返回 400 Bad Request 响应, 并将错误详细信息作为响应的主体.
```

### RetrieveModelMixin

``` python
class RetrieveModelMixin:
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
#  实现在响应中返回现有模型实例.
    如果可以检索对象, 则返回一个 200 OK 响应, 并将对象的序列化表示作为响应的主体; 
    否则它将返回 404 Not Found.
```

### UpdateModelMixin

``` python
class UpdateModelMixin:
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
#  实现更新和保存现有模型实例.
    如果对象被更新, 则返回 200 OK 响应, 并将对象的序列化表示作为响应的主体; 
    如果为更新对象而提供的请求数据无效, 则将返回 400 Bad Request 响应, 并将错误详细信息作为响应的主体.
```

### DestroyModelMixin

``` python
class DestroyModelMixin:
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
#  实现对现有模型实例的删除.
    如果对象被删除, 则返回 204 No Content, 否则它将返回 404 Not Found.
```

## rest_framework.viewsets.ModelViewSet

### ModelViewSet

``` python
class ModelViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    pass
#  ModelViewSet 类继承自 GenericAPIView.
```

### GenericViewSet

``` python
class GenericViewSet(ViewSetMixin, generics.GenericAPIView):
    pass
#  GenericViewSet 类多重继承自 ViewSetMixin 和 GenericAPIView.
```

### ViewSetMixin

``` python
class ViewSetMixin:
    @classonlymethod
    def as_view(cls, actions=None, **initkwargs):
        cls.name = None
        cls.description = None
        cls.suffix = None
        cls.detail = None
        cls.basename = None

        if not actions:
            raise TypeError("The `actions` argument must be provided when "
                            "calling `.as_view()` on a ViewSet. For example "
                            "`.as_view({'get': 'list'})`")
        #  必须传入actions.

        for key in initkwargs:
            if key in cls.http_method_names:
                raise TypeError("You tried to pass in the %s method name as a "
                                "keyword argument to %s(). Don't do that."
                                % (key, cls.__name__))
            if not hasattr(cls, key):
                raise TypeError("%s() received an invalid keyword %r" % (
                    cls.__name__, key))

        if 'name' in initkwargs and 'suffix' in initkwargs:
            raise TypeError("%s() received both `name` and `suffix`, which are "
                            "mutually exclusive arguments." % (cls.__name__))

        def view(request, *args, **kwargs):
            self = cls(**initkwargs)

            if 'get' in actions and 'head' not in actions:
                actions['head'] = actions['get']

            self.action_map = actions
            #  存储请求方法到 action 的映射, 为以后设置 action 属性.
            for method, action in actions.items():
                handler = getattr(self, action)
                setattr(self, method, handler)
            #  将请求方法绑定到 action.

            self.request = request
            self.args = args
            self.kwargs = kwargs

            return self.dispatch(request, *args, **kwargs)

        update_wrapper(view, cls, updated=())
        update_wrapper(view, cls.dispatch, assigned=())

        view.cls = cls
        view.initkwargs = initkwargs
        view.actions = actions
        return csrf_exempt(view)

    def initialize_request(self, request, *args, **kwargs):
        request = super().initialize_request(request, *args, **kwargs)
        method = request.method.lower()
        if method == 'options':
            self.action = 'metadata'
        else:
            self.action = self.action_map.get(method)
        return request
    #  覆盖 APIView 的 initialize_request 方法, 为视图增加 action 属性.

    def reverse_action(self, url_name, *args, **kwargs):
        url_name = '%s-%s' % (self.basename, url_name)
        namespace = None
        if self.request and self.request.resolver_match:
            namespace = self.request.resolver_match.namespace
        if namespace:
            url_name = namespace + ':' + url_name
        kwargs.setdefault('request', self.request)

        return reverse(url_name, *args, **kwargs)

    @classmethod
    def get_extra_actions(cls):
        return [_check_attr_name(method, name)
                for name, method
                in getmembers(cls, _is_extra_action)]

    def get_extra_action_url_map(self):
        action_urls = OrderedDict()
        if self.detail is None:
            return action_urls

        actions = [
            action for action in self.get_extra_actions()
            if action.detail == self.detail
        ]

        for action in actions:
            try:
                url_name = '%s-%s' % (self.basename, action.url_name)
                url = reverse(url_name, self.args, self.kwargs, request=self.request)
                view = self.__class__(**action.kwargs)
                action_urls[view.get_view_name()] = url
            except NoReverseMatch:
                pass

        return action_urls
```

### ModelViewSet 总结

ViewSetMixin 重写了 `as_view` 和 `initialize_request` ，可以让注册 url 方法更加简单；  
ViewSet 在 APIView 的基础上继承了 ViewSetMixin ；  GenericViewSet 在 GenericAPIView 的基础上继承了 ViewSetMixin ；  
ModelViewSet 继承自 GenericAPIView，并通过混合各种 mixin 类的行为来包含各种操作的实现。
