from rest_framework import serializers
from .models import Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('PlayerId', 'Username', 'Email', 'ProfilePicture', 'Playstyle', 'CompositeSkillLevel', 'Attitude')