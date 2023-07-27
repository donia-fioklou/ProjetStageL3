from django.db import models

from agriApp.models.Formulaire import Formulaire

class Question(models.Model):
    formulaire=models.ForeignKey(Formulaire, on_delete=models.SET_NULL, null=True)
    libelle=models.CharField(max_length=100)
    