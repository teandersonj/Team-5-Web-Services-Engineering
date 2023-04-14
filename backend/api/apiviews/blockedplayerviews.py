from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from api.apimodels.blockedplayer import BlockedPlayer
from ..apiserializers.blockedplayerserializer import BlockedPlayerSerializer


class BlockedPlayerAPI(generics.CreateAPIView, generics.UpdateAPIView, generics.RetrieveDestroyAPIView):
    model = BlockedPlayer
    queryset = BlockedPlayer.objects.all()
    serializer_class = BlockedPlayerSerializer
    permission_classes = (IsAuthenticated, )
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['Player1', 'BlockedPlayer', 'Blocked']
    search_fields = ['Player1', 'BlockedPlayer', 'Blocked']
    lookup_field = ['id']


class BlockedPlayersAPI(generics.ListCreateAPIView):
    model = BlockedPlayer
    queryset = BlockedPlayer.objects.all()
    serializer_class = BlockedPlayerSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['Player1', 'BlockedPlayer', 'Blocked']
    search_fields = ['Player1', 'BlockedPlayer', 'Blocked']
