from django.db import models


# Create your models here.
class Game(models.Model):
    GameId = models.BigAutoField(primary_key=True,unique=True,auto_created=True)
    Name = models.CharField(max_length=100, unique=True)
    Image = models.CharField(max_length=300)
    Genre = models.CharField(max_length=300)
    Platform = models.IntegerField()
    PlayerCount = models.IntegerField()
    Map = models.CharField(max_length=300)
    Gamemode = models.CharField(max_length=300)
