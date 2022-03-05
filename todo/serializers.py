from rest_framework.serializers import HyperlinkedModelSerializer

from users.serializers import UserSerializer
from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    user_responsible = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    users_responsible = UserSerializer(many=True)

    class Meta:
        model = ToDo
        fields = '__all__'
