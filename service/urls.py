"""service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.renderers import JSONRenderer
from rest_framework.routers import DefaultRouter
from rest_framework.generics import UpdateAPIView

import todo
from todo.models import Project
from todo.serializers import ProjectModelSerializer
from todo.views import ProjectModelViewSet, ToDoModelViewSet, ProjectKwargsFilterView
from users import views
from users.views import UserModelViewSet


class ArticleUpdateAPIView(UpdateAPIView):
    renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)
router.register('base', views.UserCustomViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-user/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include(router.urls)),
    path('filters/kwargs/<str:name>/', todo.views.ProjectKwargsFilterView.as_view()),

]
