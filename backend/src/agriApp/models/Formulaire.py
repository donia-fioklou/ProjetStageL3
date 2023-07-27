from django.db import models

class Formulaire(models.Model):
    name=models.CharField(max_length=100)
    