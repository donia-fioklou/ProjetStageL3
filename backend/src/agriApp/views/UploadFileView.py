from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView 
from agriApp.serializers.FileSerializers import  FileSerializer
from agriApp.models.File import File

from rest_framework import status
from rest_framework.response import Response

from agriApp.views.importer import Importer
from agriApp.models.Producteur import Producteur
from agriApp.serializers.ProductorSerializers import ProductorSerializers
import pandas as pd

class ExcelFileUploadView(ModelViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()

    def create(self, request, *args, **kwargs):
        file_serializer = self.serializer_class(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            #lastFile=File.objects.last()
            #Importer.handle(lastFile.filePath)
            uploaded_file = request.FILES['filePath']  # Assurez-vous d'ajuster la clé en fonction de votre requête

            # Utilisation de Pandas pour lire le fichier Excel
            df = pd.read_excel(uploaded_file)
            num_lines = len(df)

            # Ajouter le nombre de lignes à l'objet File
            file_serializer.validated_data['numberOfProductor'] = num_lines
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RenderData(ModelViewSet):
    #10 derniers producteurs
    queryset = Producteur.objects.all().order_by('-id')[:10]
    serializer_class = ProductorSerializers
        
        