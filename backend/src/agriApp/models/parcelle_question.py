from django.db import models

from agriApp.models.Parcelle import Parcelle
from agriApp.models.Question import Question

class ParcelleQuestion(models.Model):
    parcelle= models.ForeignKey(Parcelle,on_delete=models.SET_NULL, null=True)
    question=models.ForeignKey(Question, on_delete=models.SET_NULL, null=True)