from rest_framework import serializers
from api.apimodels.blockedplayer import BlockedPlayer


class BlockedPlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlockedPlayer
        fields = ('id', 'Player1', 'BlockedPlayer', 'Blocked')

