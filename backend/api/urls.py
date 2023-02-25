from django.urls import path
from . import views
from api.apiviews.playerviews import PlayerAPI, PlayersAPI
from api.apiviews.gameviews import GameAPI, GamesAPI
from api.apiviews.registration import RegisterView
from api.apiviews.tokenviews import TokenObtainPairView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView,
    TokenVerifyView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('player/<pk>', PlayerAPI.as_view(), name='player_info'),
    path('players/', PlayersAPI.as_view(), name='players_info'),
    path('game/<pk>', GameAPI.as_view(), name='game_info'),
    path('games/', GamesAPI.as_view(), name='games_info'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes)
]