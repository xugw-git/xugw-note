# Mermaid-图表绘制工具

## 前言

Mermaid 是一个基于 Javascript 的图表绘制工具，通过解析类 Markdown 的文本语法来实现图表的创建和动态修改。

- 项目仓库：<https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md>

?> 文档：<https://mermaid-js.github.io/mermaid/#/README>

VSCode 中 使用插件 Markdown Preview Enhanced 可以预览效果 & 在浏览器中导出。

## 示例 - 流程图

``` mermaid
flowchart TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

![img](image/IMG-2022-02-23-22-47-36.png ':size=250')

## rest-framework 视图关系

```mermaid
flowchart LR;
    rest_framework-->APIView-->ViewSet;
    rest_framework-->ViewSetMixin-->ViewSet;
    rest_framework-->ListModelMixin-->ModelViewSet;
    rest_framework-->CreateModelMixin-->ModelViewSet;
    rest_framework-->RetrieveModelMixin-->ModelViewSet;
    rest_framework-->UpdateModelMixin-->ModelViewSet;
    rest_framework-->DestroyModelMixin-->ModelViewSet;
    APIView-->GenericAPIView-->GenericViewSet-->ModelViewSet;
    ViewSetMixin-->GenericViewSet;
    GenericViewSet-->ReadOnlyModelViewSet;
    ListModelMixin-->ReadOnlyModelViewSet;
    RetrieveModelMixin-->ReadOnlyModelViewSet;
    GenericAPIView-->ListAPIView;
    ListModelMixin-->ListAPIView;
    GenericAPIView-->CreateAPIView;
    CreateModelMixin-->CreateAPIView;
    GenericAPIView-->ListCreateAPIView;
    ListModelMixin-->ListCreateAPIView;
    CreateModelMixin-->ListCreateAPIView;
    GenericAPIView-->RetrieveAPIView;
    RetrieveModelMixin-->RetrieveAPIView;
    GenericAPIView-->DestoryAPIView;
    DestroyModelMixin-->DestoryAPIView;
    GenericAPIView-->UpdateAPIView;
    UpdateModelMixin-->UpdateAPIView;
    GenericAPIView-->RetrieveUpdateAPIView;
    RetrieveModelMixin-->RetrieveUpdateAPIView;
    UpdateModelMixin-->RetrieveUpdateAPIView;
    GenericAPIView-->RetrieveDestroyAPIView;
    RetrieveModelMixin-->RetrieveDestroyAPIView;
    DestroyModelMixin-->RetrieveDestroyAPIView;
    GenericAPIView-->RetrieveUpdateDestoryAPIView;
    RetrieveModelMixin-->RetrieveUpdateDestoryAPIView;
    UpdateModelMixin-->RetrieveUpdateDestoryAPIView;
    DestroyModelMixin-->RetrieveUpdateDestoryAPIView;
```

![img](image/IMG-2022-02-23-15-25-43.png)
