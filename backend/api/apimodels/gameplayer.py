from django.db import models
from game import Game
from player import Player


# Create your models here.
class GamePlayer(models.Model):
    class Meta:
        unique_together = (('gameid', 'playerid'),)

    GameId = models.ForeignKey(Game)
    PlayerId = models.ForeignKey(Player)
    Attitude = models.CharField(max_length=300)
    Playstyle = models.CharField(max_length=300)
    SkillLevel = models.IntegerField()
