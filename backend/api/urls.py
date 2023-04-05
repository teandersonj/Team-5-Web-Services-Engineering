from django.urls import path
from . import views
from api.apiviews.playerviews import PlayerAPI, PlayersAPI
from api.apiviews.blockedplayerviews import BlockedPlayerAPI, BlockedPlayersAPI
from api.apiviews.friendviews import FriendAPI, FriendsAPI
from api.apiviews.gameviews import GameAPI, GamesAPI
from api.apiviews.registration import RegisterView
from api.apiviews.passwordchange import PasswordChangeView
from api.apiviews.tokenviews import TokenObtainPairView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView,
    TokenVerifyView,
)


urlpatterns = [
    path('user/', views.userInfo, name='user_info'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('player/<pk>', PlayerAPI.as_view(), name='player_info'),
    path('players/', PlayersAPI.as_view(), name='players_info'),
#    path('blockedplayer/<id>', BlockedPlayerAPI.as_view(), name='blocked_player_list'),
    path('blockedplayers/', BlockedPlayersAPI.as_view(), name='blocked_players_list'),
#    path('friend/<pk>', FriendAPI.as_view(), name='friend_list'),
    path('friends/', FriendsAPI.as_view(), name='friends_list'),
    path('game/<pk>', GameAPI.as_view(), name='game_info'),
    path('games/', GamesAPI.as_view(), name='games_info'),
    path('passwordchange/', PasswordChangeView.as_view(), name='passwordchange'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes)
]
