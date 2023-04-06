from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from api.apimodels.player import Player
from api.apiserializers.tokenserializer import MyTokenObtainPairSerializer
from api.apiserializers.playerserializer import PlayerSerializer


# Taking in a username and password, we can use MyTokenObtainPairSerializer to generate a token for the user.
# Then can use the token to authenticate the user and return the user's information.
# But at the same time, we need to retrieve the user's associated player information and return that as well.
# This will be used to populate the user's profile page and run at login
class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(username=request.data['username'])
        player = Player.objects.get(user=user)
        player_serializer = PlayerSerializer(player)
        return Response({
            # 'user': {
            #     'id': user.id,
            #     'username': user.username,
            #     'first_name': user.first_name,
            #     'last_name': user.last_name,
            #     'email': user.email,
            # },
            # The Player includes the user's information, so we can just return the player
            "data": player_serializer.data,
            "access": serializer.validated_data["access"],
            "refresh": serializer.validated_data["refresh"]
        }, status=status.HTTP_200_OK)
