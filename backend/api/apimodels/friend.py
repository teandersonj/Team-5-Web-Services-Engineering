from django.db import models
from .player import Player


class Friend(models.Model):

    class Meta:
        unique_together = ('Primary', 'FriendPlayer')

    Primary = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="Primary")
    FriendPlayer = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="FriendPlayer")
    ActiveStatus = models.BooleanField(default=True)