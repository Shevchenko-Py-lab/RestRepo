from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer

from users.models import User
from users.serializers import UserSerializer, UserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(serializers.ModelSerializer):
    user_responsible = UserSerializer(many=True, queryset=User.objects.all())

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    users_responsible = UserSerializer(many=True, queryset=User.objects.all())

    class Meta:
        model = ToDo
        fields = '__all__'
