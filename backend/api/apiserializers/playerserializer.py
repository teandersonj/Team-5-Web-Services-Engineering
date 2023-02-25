from rest_framework import serializers
from api.apimodels.player import Player


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('PlayerId', 'Username', 'Email', 'AvatarName', 'Playstyle', 'CompositeSkillLevel', 'Attitude')
