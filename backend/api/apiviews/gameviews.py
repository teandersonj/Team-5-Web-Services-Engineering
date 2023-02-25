from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from api.apiserializers.tokenserializer import MyTokenObtainPairSerializer
from api.serializer import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from api.apimodels.game import Game
from api.apiserializers.gameserializer import GameSerializer
from rest_framework import filters


class GameAPI(generics.RetrieveUpdateAPIView):
    model = Game
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['Name', 'Image', 'Genre', 'Platform', 'PlayerCount', 'Map', 'Gamemode']


class GamesAPI(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['Name', 'Image', 'Genre', 'Platform', 'PlayerCount', 'Map', 'Gamemode']
