from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name']
