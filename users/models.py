from uuid import uuid4

from django.db import models
from django.contrib.auth.models import AbstractUser


# class User(AbstractUser):
#     uid = models.UUIDField(primary_key=True, default=uuid4)

class User(models.Model):
    uid = models.UUIDField(primary_key=True,
                           default=uuid4)
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.CharField(max_length=64,
                             unique=True)

    def __str__(self):
        return self.first_name + " " + self.last_name
