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
from api.apimodels.player import Player
from api.apiserializers.playerserializer import PlayerSerializer
from rest_framework import filters


class PlayerAPI(generics.RetrieveUpdateAPIView):
    model = Player
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['Username', 'Email', 'Playstyle', 'CompositeSkillLevel', 'Attitude']


class PlayersAPI(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['Username', 'Email', 'Playstyle', 'CompositeSkillLevel', 'Attitude']