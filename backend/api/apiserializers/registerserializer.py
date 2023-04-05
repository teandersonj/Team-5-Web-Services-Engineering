from django.contrib.auth.models import User
from rest_framework import serializers
from ..apimodels.player import Player


class RegisterPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('AvatarName', 'Playstyle', 'CompositeSkillLevel', 'Attitude')


class RegisterUserSerializer(serializers.ModelSerializer):
    player = RegisterPlayerSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'player')


class RegisterSerializer(serializers.ModelSerializer):
    player = RegisterPlayerSerializer()
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'player', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        _lUser = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        _lUser.set_password(validated_data['password'])
        _lUser.save()

        _lPlayer = Player.objects.create(
            user=_lUser,
            AvatarName=validated_data['player']['AvatarName'],
            Playstyle=validated_data['player']['Playstyle'],
            CompositeSkillLevel=validated_data['player']['CompositeSkillLevel'],
            Attitude=validated_data['player']['Attitude']
        )
        _lPlayer.save()

        return _lUser


