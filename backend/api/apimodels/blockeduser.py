from django.db import models
from api.apimodels import player


class BlockedPlayer(models.Model):
    BlockedPlayerId = models.BigAutoField(primary_key=True,unique=True,auto_created=True)
    Player1 = models.ForeignKey(player.Player, on_delete=models.CASCADE, related_name="Player1")
    Player2 = models.ForeignKey(player.Player, on_delete=models.CASCADE, related_name="Player2")
    Blocked = models.BooleanField(default=True)