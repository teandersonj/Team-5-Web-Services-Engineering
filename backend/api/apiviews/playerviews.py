from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from api.apimodels.player import Player
from ..apiserializers.playerserializer import PlayerSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser


class PlayerAPI(generics.RetrieveUpdateAPIView):
    model = Player
    queryset = Player.objects.all().select_related('user')
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['user__username', 'user__email', 'Playstyle', 'CompositeSkillLevel', 'Attitude', 'Bio']

    def get(self, request, *args, **kwargs):
        _userID = kwargs['userid']
        _player = self.model.objects.get(user_id=_userID)
        return Response(self.get_serializer(_player).data)

    def put(self, request, *args, **kwargs):
        print("PUT request received for player: " + str(kwargs['userid']) + " with data: " + str(request.data))
        _player = Player.objects.get(user_id=kwargs['userid'])
        _user = _player.user
        _player_redux = PlayerSerializer(_player, data=request.data)
        if _player_redux.is_valid():
            _player_redux.save()
            return Response(_player_redux.data, status=status.HTTP_200_OK)
        # Get the errors from the serializer
        return Response(_player_redux.errors, status=status.HTTP_400_BAD_REQUEST)


class PlayersAPI(generics.ListCreateAPIView):
    queryset = Player.objects.all().select_related('user')
    serializer_class = PlayerSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username', 'user__email', 'Playstyle', 'CompositeSkillLevel', 'Attitude', 'Bio']
