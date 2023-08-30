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

class CheckFile(APIView):
    def get(self, request):
        try:
            last_file=File.objects.last()
            last_file=last_file.filePath
            df=pd.read_excel(last_file)
            columnName=df.columns
            
            required_columns = [ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']

            missing_columns = [col for col in required_columns if col not in columnName]

            if missing_columns:
                response_data = {
                    "message": "Certaines colonnes sont manquantes.",
                    "missing_columns": missing_columns
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
            else:
                newColonneName={
                    'Nom et Prénoms':'NomPrenom',
                    'Code Surface':'CodeSurface',
                }
                df.drop_duplicates(subset=['code'],keep='first',inplace=True)
                df.rename(columns=newColonneName, inplace=True)
                df_info=df.loc[:,[ 'code','NomPrenom','Sexe','Contact','Village']]
                df_info.fillna(value='',inplace=True)
                df_info=df_info.to_dict(orient='records')
                
                response_data =df_info
                return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            response_data = {
                "message": "Une erreur s'est produite lors du traitement du fichier.",
                "error_details": str(e)
            }
            return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        