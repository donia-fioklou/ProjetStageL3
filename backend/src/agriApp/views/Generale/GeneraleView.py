from agriApp.models import File
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from agriApp.views.Generale.generale import Generale

class NumberOfProducer(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        zone = request.GET.get('zone', None)
        union = request.GET.get('union', None)
        
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        if zone:
            df = df[df['Zone'] == zone]
        if union:
            df = df[df['Union'] == union]
        
        # Calculer le nombre de producteurs
        df = df.drop_duplicates(subset=['code'], keep='last')
        number_of_producer = df.shape[0]

        # Créer une réponse JSON
        response_data = {
            'number_of_producer': number_of_producer
        }
        tab_response_data = []
        tab_response_data.append(response_data)
        return Response(tab_response_data)

class GenderStats(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        zone = request.GET.get('zone', None)
        union = request.GET.get('union', None)
        
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        if zone:
            df = df[df['Zone'] == zone]
        if union:
            df = df[df['Union'] == union]
        
        # Calculer la répartition par sexe en utilisant groupby et size
        gender_distribution = df.groupby('Sexe').size().reset_index(name='count')
        productor_masc=df.loc[df['Sexe'] == 'M' ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle',]]
        productor_masc.fillna(value=0,inplace=True)
        productor_masc=productor_masc.to_dict(orient='records')
        
        productor_fem=df.loc[df['Sexe'] == 'F' ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle',]]
        productor_fem.fillna(value=0,inplace=True)
        productor_fem=productor_fem.to_dict(orient='records')
        
        # Créer une réponse JSON
        response_data = {
            'productor_masc': productor_masc,
            'productor_fem': productor_fem,
        }
        for index, row in gender_distribution.iterrows():
            response_data[row['Sexe']] = row['count']
        
        tab_response_data = []
        tab_response_data.append(response_data)
        return Response(tab_response_data)

class ZoneStats(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        union = request.GET.get('union', None)
        zone = request.GET.get('zone', None)
        
        
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        
        if union:
            df = df[df['Union'] == union]
        if zone:
            df = df[df['Zone'] == zone]
            
        
        # Calculer la répartition par sexe en utilisant groupby et size
        zone_distribution = df.groupby('Zone').size().reset_index(name='count')
        

        # Créer une réponse JSON
        response_data = {}
        for index, row in zone_distribution.iterrows():
            response_data[row['Zone']] = row['count']
        tab_response_data = []
        tab_response_data.append(response_data)

        return Response(tab_response_data)
    
class LocalisationStats(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        zone = request.GET.get('zone', None)
        union = request.GET.get('union', None)
        
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        df = df.drop_duplicates(subset=['Code Surface'], keep='last')
        if zone:
            df = df[df['Zone'] == zone]
        if union:
            df = df[df['Union'] == union]
        
        filled_count = df[(df['Si Parcelle'] == 1)].shape[0]
        not_filled_count=df[(df['Si Parcelle'] == 0)].shape[0]
        
        productor_with_not_filled_count=df.loc[df['Si Parcelle'] == 0 ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle','Si Parcelle']]
        productor_with_not_filled_count.fillna(value=0,inplace=True)
        productor_with_not_filled_count=productor_with_not_filled_count.to_dict(orient='records') 
        
        productor_with_filled_count=df.loc[df['Si Parcelle'] == 1 ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle','Si Parcelle']]
        productor_with_filled_count.fillna(value=0,inplace=True)
        productor_with_filled_count=productor_with_filled_count.to_dict(orient='records')
        response_data = {
            'filled_count': filled_count,
            'not_filled_count': not_filled_count,
            'productor_with_not_filled_count':productor_with_not_filled_count,
            'productor_with_filled_count':productor_with_filled_count,
        }
        tab_response_data = []
        tab_response_data.append(response_data)
        return Response(tab_response_data)

class PolygoneStats(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        zone = request.GET.get('zone', None)
        union = request.GET.get('union', None)
        
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        if zone:
            df = df[df['Zone'] == zone]
        if union:
            df = df[df['Union'] == union]
        
        filled_count = df[(df['Si Polygon'] == 1)].shape[0]
        not_filled_count=df[(df['Si Polygon'] == 0)].shape[0]
        productor_with_not_filled_count=df.loc[df['Si Polygon'] == 0 ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle','Si Polygon']]
        productor_with_not_filled_count.fillna(value=0,inplace=True)
        productor_with_not_filled_count=productor_with_not_filled_count.to_dict(orient='records') 
        
        productor_with_filled_count=df.loc[df['Si Polygon'] == 1 ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle','Si Polygon']]
        productor_with_filled_count.fillna(value=0,inplace=True)
        productor_with_filled_count=productor_with_filled_count.to_dict(orient='records')
        response_data = {
            'filled_count': filled_count,
            'not_filled_count': not_filled_count,
            'productor_with_filled_count':productor_with_filled_count,
            'productor_with_not_filled_count':productor_with_not_filled_count,
            
        }
        tab_response_data = []
        tab_response_data.append(response_data)
        return Response(tab_response_data)

