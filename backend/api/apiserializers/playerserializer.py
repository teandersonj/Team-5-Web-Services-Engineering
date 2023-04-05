from rest_framework import serializers
from api.apimodels.player import Player
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    # Query the User model and return the following fields
    class Meta:
        model = User
        fields = ('pk', 'id', 'username', 'first_name', 'last_name', 'email', 'password')


class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Player
        fields = ('pk', 'user', 'AvatarName', 'Playstyle', 'CompositeSkillLevel', 'Attitude')

