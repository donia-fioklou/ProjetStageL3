from django.db import models

from agriApp.models.Producteur import Producteur

class Parcelle(models.Model):
    producteur=models.ForeignKey(Producteur, on_delete=models.SET_NULL, null=True)
    codeSurface=models.CharField(max_length=100)
    surfaceParcelle=models.FloatField()
    localisation=models.BooleanField(default=False)
    polygone=models.BooleanField(default=False)
    variete=models.CharField(max_length=100)
    