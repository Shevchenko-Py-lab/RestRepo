from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer
from rest_framework import mixins, viewsets
from rest_framework.decorators import action

from .serializers import ProjectModelSerializer, ToDoModelSerializer, ProjectModelSerializerBase

from .filters import ProjectFilter
from .models import Project, ToDo


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination


class ProjectCustomViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    renderer_classes = [JSONRenderer]
    serializer_class = ProjectModelSerializer


class ProjectKwargsFilterView(ListAPIView):
    serializer_class = ProjectModelSerializer

    def get_queryset(self):
        project_name = self.kwargs['name']
        return Project.objects.filter(name__contains=project_name)


class ToDoModelCustomViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin,
                             mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    renderer_classes = [JSONRenderer]
    filterset_class = ProjectFilter

    @action(detail=True, methods=['get'])
    def delete(self, request, pk=None):
        todo = get_object_or_404(ToDo, pk=pk)
        self.object.is_active = False
        serializer = ToDoModelSerializer(todo)
        return Response(serializer.data)

