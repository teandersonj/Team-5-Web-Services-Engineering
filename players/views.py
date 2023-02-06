from .models import Player
from .serializers import PlayerSerializer
from rest_framework import generics

class PlayerListCreate(generics.ListCreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
