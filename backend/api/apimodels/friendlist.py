from django.db import models


# Create your models here.
class FriendList(models.Model):
    PlayerId = models.ForeignKey("Player", on_delete=models.CASCADE)
    ActiveStatus = models.BooleanField()
