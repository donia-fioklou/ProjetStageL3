#model producteur
from django.db import models

from agriApp.models import Cooperative
class Producteur(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    cooperative=models.ForeignKey(Cooperative, on_delete=models.SET_NULL, null=True)
    code=models.CharField(max_length=100)
    nomPrenom=models.CharField(max_length=100)
    sexe=models.CharField(max_length=1,choices=GENDER_CHOICES,null=True)
    contact=models.IntegerField(null=True)
    village=models.CharField(max_length=100,null=True)