from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from api.apimodels.game import Game
from api.apiserializers.gameserializer import GameSerializer


class GameAPI(generics.CreateAPIView, generics.UpdateAPIView, generics.RetrieveDestroyAPIView):
    model = Game
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = ['Name', 'Image', 'Genre', 'Description', 'Platform']
    search_fields = ['Name', 'Image', 'Genre', 'Description', 'Platform', 'PlayerCount']


class GamesAPI(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = ['Name', 'Image', 'Genre', 'Description', 'Platform']
    search_fields = ['Name', 'Image', 'Genre',
                     'Description', 'Platform', 'PlayerCount']
    # filterset_fields = ['Name', 'Image', 'Genre', 'Platform']
    # search_fields = ['Name', 'Image', 'Genre', 'Platform', 'PlayerCount']
