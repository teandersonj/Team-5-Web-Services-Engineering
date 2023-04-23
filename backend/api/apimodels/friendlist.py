from django.db import models
from .player import Player

# Create your models here.
class FriendList(models.Model):
    PlayerId = models.ForeignKey(Player, on_delete=models.CASCADE)
    ActiveStatus = models.BooleanField()
