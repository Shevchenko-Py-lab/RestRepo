from uuid import uuid4

from django.db import models

from users.models import User


class Project(models.Model):
    uid = models.UUIDField(primary_key=True,
                           default=uuid4)
    project_name = models.CharField(max_length=64)
    project_priority = models.CharField(max_length=64)
    project_repo = models.CharField(max_length=64, blank=True)
    user_responsible = models.ManyToManyField(User)


class ToDo(models.Model):
    uid = models.UUIDField(primary_key=True,
                           default=uuid4)
    task_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    users_responsible = models.ManyToManyField(User)
    task_text = models.CharField(max_length=1024)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
