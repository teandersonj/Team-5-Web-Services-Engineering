from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from api.apimodels.player import Player
from ..apiserializers.playerserializer import PlayerSerializer
from rest_framework import filters


class PlayerAPI(generics.RetrieveUpdateAPIView):
    model = Player
    queryset = Player.objects.all().select_related('user')
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username', 'user__email', 'Playstyle', 'CompositeSkillLevel', 'Attitude']


class PlayersAPI(generics.ListAPIView):
    queryset = Player.objects.all().select_related('user')
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username', 'user__email', 'Playstyle', 'CompositeSkillLevel', 'Attitude']
