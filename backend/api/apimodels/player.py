from django.db import models


# Create your models here.
class Player(models.Model):
    PlayerId = models.BigAutoField(primary_key=True, unique=True,auto_created=True)
    Username = models.CharField(max_length=100, unique=True)
    Email = models.EmailField()
    AvatarName = models.CharField(max_length=300)
    Playstyle = models.CharField(max_length=100)
    CompositeSkillLevel = models.FloatField()
    Attitude = models.CharField(max_length=100)
