from rest_framework import serializers
from api.apimodels.player import Player
from django.contrib.auth.models import User, AnonymousUser
from django.contrib.auth import get_user_model
from django.contrib.auth.validators import UnicodeUsernameValidator


class UserSerializer(serializers.ModelSerializer):
    # Query the User model and return the following fields
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'email') #, 'password')
        extra_kwargs = {
            'username': {
                'validators': [UnicodeUsernameValidator()],
            }
        }


class PlayerSerializer(serializers.ModelSerializer):
    isRecommended = serializers.SerializerMethodField('get_isrecommended')
    user = UserSerializer()

    class Meta:
        model = Player
        fields = ('pk', 'user', 'AvatarName', 'Playstyle', 'CompositeSkillLevel', 'Attitude', 'Bio', 'isRecommended')

    def get_isrecommended(self, instance):
        _lReturn = False
        _request = self.context.get('request')
        if _request is not None:
            _refplayer = Player.objects.get(user=_request.user)
            if instance.Playstyle == _refplayer.Playstyle:
                _lReturn = True
        return _lReturn

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
        instance.Playstyle = validated_data.get('Playstyle')
        instance.CompositeSkillLevel = validated_data.get('CompositeSkillLevel')
        instance.Attitude = validated_data.get('Attitude')
        instance.Bio = validated_data.get('Bio')
        instance.save()
        return instance
