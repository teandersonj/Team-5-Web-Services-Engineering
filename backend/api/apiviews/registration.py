from ..apiserializers.registerserializer import RegisterSerializer
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from ..apiserializers.playerserializer import PlayerSerializer
from ..apiserializers.registerserializer import RegisterSerializer
from ..apimodels.player import Player


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all().prefetch_related('player')
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

