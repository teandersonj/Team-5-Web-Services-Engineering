from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from api.apimodels.friend import Friend
from ..apiserializers.friendserializer import FriendSerializer


class FriendAPI(generics.CreateAPIView, generics.UpdateAPIView, generics.RetrieveDestroyAPIView):
    model = Friend
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
    search_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
    lookup_field = ['pk']


class FriendsAPI(generics.ListCreateAPIView):
    model = Friend
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
    search_fields = ['Primary', 'FriendPlayer', 'ActiveStatus']
