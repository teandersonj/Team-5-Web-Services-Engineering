from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    AvatarName = models.CharField(max_length=300)
    Playstyle = models.CharField(max_length=100)
    CompositeSkillLevel = models.FloatField(default=0.0)
    Attitude = models.CharField(max_length=100)
