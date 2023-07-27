from django.db import models

class Parcelle(models.Model):
    codeSurface=models.CharField(max_length=100)
    surfaceParcelle=models.FloatField()
    localisation=models.BooleanField(default=False)
    polygone=models.BooleanField(default=False)
    variete=models.CharField(max_length=100)
    