from django.db import models
from agriApp.models.File import File

from agriApp.models.Question import Question

class Reponse(models.Model):
    question=models.ForeignKey(Question, on_delete=models.SET_NULL, null=True)
    fichier=models.ForeignKey(File,on_delete=models.SET_NULL, null=True)
    reponseBio=models.CharField(max_length=100,null=True)
    libelle=models.CharField(max_length=100,null=True)
    