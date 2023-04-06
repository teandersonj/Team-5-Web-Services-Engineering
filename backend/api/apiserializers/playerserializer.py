from rest_framework import serializers
from api.apimodels.player import Player
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.validators import UnicodeUsernameValidator


class UserSerializer(serializers.ModelSerializer):
    # Query the User model and return the following fields
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {
                            'username': {
                            'validators': [UnicodeUsernameValidator()],
                            }
                        }


class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Player
        fields = ('pk', 'user', 'AvatarName', 'Playstyle', 'CompositeSkillLevel', 'Attitude')

    def create(self, validated_data):
        _user = User.objects.create(data=validated_data.pop('user'))
        _player = Player.objects.create(user=_user, **validated_data)
        return _player

    def update(self, instance, validated_data):
        _user = instance.user
        #        _user = validated_data.pop('user')
        # instance.AvatarName = validated_data.get('AvatarName', instance.AvatarName)
        # instance.save()
        instance.AvatarName = validated_data.get('AvatarName')
        instance.PlayStyle = validated_data.get('PlayStyle')
        instance.CompositeSkillLevel = validated_data.get('CompositeSkillLevel')
        instance.Attitude = validated_data.get('Attitude')
        instance.save()
        return instance