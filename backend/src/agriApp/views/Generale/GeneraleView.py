from agriApp.models import File
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from agriApp.views.Generale.generale import Generale

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

        # Créer une réponse JSON
        response_data = {}
        for index, row in gender_distribution.iterrows():
            response_data[row['Sexe']] = row['count']
        tab_response_data = []
        tab_response_data.append(response_data)
        return Response(tab_response_data)

class ZoneStats(APIView):
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
        productor_with_not_filled_count=df.loc[df['Si Parcelle'] == 0 ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]
        #productor_with_not_filled_count=productor_with_not_filled_count.to_dict()
        response_data = {
            'filled_count': filled_count,
            'not_filled_count': not_filled_count,
            #'productor_with_not_filled_count':productor_with_not_filled_count
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
        
        response_data = {
            'filled_count': filled_count,
            'not_filled_count': not_filled_count,
        }
        tab_response_data = []
        tab_response_data.append(response_data)
        return Response(tab_response_data)

