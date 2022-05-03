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
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.renderers import JSONRenderer
from rest_framework.routers import DefaultRouter
from rest_framework.generics import UpdateAPIView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

import todo
from todo.models import Project
from todo.serializers import ProjectModelSerializer
from todo.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import UserModelViewSet, UserCustomViewSet
from rest_framework.authtoken import views


class ArticleUpdateAPIView(UpdateAPIView):
    renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


router = DefaultRouter()
# router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)
# router.register('base', UserCustomViewSet, basename='user')

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo",
        default_version='0.1',
        description="Documentation for project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', views.obtain_auth_token),
    path('api-user/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include(router.urls)),
    path('filters/kwargs/<str:name>/', todo.views.ProjectKwargsFilterView.as_view()),
    re_path(r'^api/(?P<version>[0-9]+)/users/$', UserModelViewSet.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
