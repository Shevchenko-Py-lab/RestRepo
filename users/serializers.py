from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User, UserNewAPI


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = super(UserModelSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(PrimaryKeyRelatedField, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name']


class UserNewAPIModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNewAPI
        fields = '__all__'

    def create(self, validated_data):
        user = super(UserNewAPIModelSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
