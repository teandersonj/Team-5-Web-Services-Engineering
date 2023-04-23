from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from ..apimodels.friend import Friend
from ..apiserializers.friendserializer import FriendSerializer


class FriendAPI(generics.CreateAPIView, generics.UpdateAPIView, generics.RetrieveDestroyAPIView):
    model = Friend
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = (IsAuthenticated, )
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
    search_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
    lookup_field = ['Primary', 'FriendPlayer', 'ActiveStatus']
    # lookup_field = ['pk']
    
    def destroy(self, request, *args, **kwargs):
        primary = request.data.get('Primary')
        friend_player = request.data.get('FriendPlayer')
        active_status = request.data.get('ActiveStatus')

        # Find the Friend object with the specified attributes
        friend = Friend.objects.filter(
            Primary=primary, FriendPlayer=friend_player, ActiveStatus=active_status).first()

        if friend:
            friend.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Friend object not found'}, status=status.HTTP_404_NOT_FOUND)



class FriendsAPI(generics.ListCreateAPIView, generics.UpdateAPIView, generics.RetrieveDestroyAPIView):
    model = Friend
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
    search_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
    lookup_field = ['Primary', 'FriendPlayer', 'ActiveStatus']
    
    def destroy(self, request, *args, **kwargs):
        primary = request.data.get('Primary')
        friend_player = request.data.get('FriendPlayer')
        active_status = request.data.get('ActiveStatus')

        # Find the Friend object with the specified attributes
        friend = Friend.objects.filter(
            Primary=primary, FriendPlayer=friend_player, ActiveStatus=active_status).first()

        if friend:
            friend.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Friend object not found'}, status=status.HTTP_404_NOT_FOUND)
