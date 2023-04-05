from django.db import models
from .player import Player


class BlockedPlayer(models.Model):
    class Meta:
        unique_together = ('Player1', 'BlockedPlayer')

    Player1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="Player1", db_column="Player1")
    BlockedPlayer = models.ForeignKey(Player, on_delete=models.CASCADE,
                                      related_name="BlockedPlayer",
                                      db_column="BlockedPlayer")
    Blocked = models.BooleanField(default=True)
