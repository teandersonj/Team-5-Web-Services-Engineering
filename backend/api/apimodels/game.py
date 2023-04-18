from django.db import models


# Create your models here.
class Game(models.Model):
    GameId = models.BigAutoField(primary_key=True, unique=True, auto_created=True)
    Name = models.CharField(max_length=100, unique=True)
    Image = models.CharField(max_length=300)
    Description = models.CharField(max_length=300, blank=True, null=True)
    Genre = models.CharField(max_length=300, blank=True, null=True)
    Platform = models.IntegerField(blank=True, null=True)
    PlayerCount = models.IntegerField(blank=True, null=True)
