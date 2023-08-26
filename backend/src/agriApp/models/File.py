from django.db import models

class File(models.Model):
    filePath = models.FileField(upload_to='uploads/')
    dateUploaded = models.DateTimeField(auto_now_add=True)
    numberOfProductor=models.IntegerField(default=0)
    