from rest_framework import serializers
from api.apimodels.game import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('GameId', 'Name', 'Image', 'Genre', 'Platform', 'PlayerCount', 'Map', 'Gamemode')
