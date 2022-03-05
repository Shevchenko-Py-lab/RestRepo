from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name']
