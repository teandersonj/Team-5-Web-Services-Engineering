from rest_framework import serializers
from api.apimodels.friend import Friend


class FriendSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friend
        fields = ('pk', 'Primary', 'FriendPlayer', 'ActiveStatus')
