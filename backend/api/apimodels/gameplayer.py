from django.db import models

from backend.api.apimodels.game import Game
from backend.api.apimodels.player import Player


# Create your models here.
class GamePlayer(models.Model):
    PlayerId = models.ForeignKey(Player, on_delete=models.CASCADE)
    GameId = models.ForeignKey(Game, on_delete=models.CASCADE)
    Attitude = models.CharField(max_length=100)
    PlayStyle = models.CharField(max_length=100)
    SkillLevel = models.IntegerField()
