from django.db import models

from agriApp.models.Zone import Zone

class Cooperative(models.Model):
    zone=models.ForeignKey(Zone, on_delete=models.SET_NULL, null=True)
    name=models.CharField(max_length=100)
