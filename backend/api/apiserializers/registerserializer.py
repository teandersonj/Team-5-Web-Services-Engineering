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
        extra_kwargs = {'password': {'write_only': True}, 'player': {'write_only': True}}

class RegisterSerializer(serializers.ModelSerializer):
    # Create an empty player for the user, allow the user to update later via PUT /api/player/:id
    # player = RegisterPlayerSerializer()
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'password', 'password2')
        extra_kwargs = {'password': {'write_only': True}}

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

        print("User created: " + _lUser.username)
        try:
            # Create an empty player for the user, allow the user to update later via PUT /api/player/:id
            _lPlayer = Player.objects.create(
                user=_lUser,
                pk=_lUser.id,
                AvatarName="Unset",  # validated_data['player']['AvatarName'],
                Playstyle="Unset", # validated_data['player']['Playstyle'],
                CompositeSkillLevel=0.0, # validated_data['player']['CompositeSkillLevel'] or 0,
                Attitude="Unset", # validated_data['player']['Attitude']
            )
            _lPlayer.save()
        except Exception as e:
            print("Error creating player due to error: " + str(e))
            _lUser.delete()
            raise serializers.ValidationError({"player": "Error creating player."})
        print("Player created for user: " + _lUser.username)

        return _lUser
