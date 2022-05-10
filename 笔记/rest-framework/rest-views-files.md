# rest_framework

## views.py

### APIView

#### django.views.generic.View

## mixins.py

### ListModelMixin

### CreateModelMixin

### RetrieveModelMixin

### UpdateModelMixin

### DestroyModelMixin

## generics.py

### GenericAPIView

#### views.APIView

### ListAPIView

#### mixins.ListModelMixin, GenericAPIView

### CreateAPIView

#### mixins.CreateModelMixin, GenericAPIView

### ListCreateAPIView

#### mixins.ListModelMixin, mixins.CreateModelMixin, GenericAPIView

### RetrieveAPIView

#### mixins.RetrieveModelMixin, GenericAPIView

### DestoryAPIView

#### mixins.DestroyModelMixin, GenericAPIView

### UpdateAPIView

#### mixins.UpdateModelMixin, GenericAPIView

### RetrieveUpdateAPIView

#### mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericAPIView

### RetrieveDestroyAPIView

#### mixins.RetrieveModelMixin, mixins.DestroyModelMixin, GenericAPIView

### RetrieveUpdateDestoryAPIView

#### mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, GenericAPIView

## viewsets.py

### ViewSetMixin

### ViewSet

#### ViewSetMixin, views.APIView

### GenericViewSet

#### ViewSetMixin, generics.GenericAPIView

### ModelViewSet

#### mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, GenericViewSet

### ReadOnlyModelViewSet

#### mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet
