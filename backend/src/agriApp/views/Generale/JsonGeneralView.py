from agriApp.models import File
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from agriApp.views.Generale.generale import Generale
import requests

class JsonNumberOfProducer(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        zone = request.GET.get('zone', None)
        union = request.GET.get('union', None)
        
        
        api_url = "https://test.coo.tg/api/traite/client/get/data/analyse/producteur"
        response = requests.get(api_url)

        if response.status_code == 200:
            # Convertir les données JSON en DataFrame Pandas
            data = response.json()
            df0 = pd.DataFrame(data)
        df=Generale(df0).nettoyage()
        
        if zone:
            df = df[df['Zone'] == zone]
        if union:
            df = df[df['Union'] == union]
        #nombre parcelle
        number_of_parcelle = df.shape[0]
        #superficie totale
        # df['Surface Parcelle'] = df['Surface Parcelle'].str.replace(',', '.')
        # df['Surface Parcelle'].astype(float)
        df['Surface Parcelle'] = pd.to_numeric(df['Surface Parcelle'], errors='coerce').fillna(0)
        #df['Surface Parcelle'].astype(float)
        #df['Surface Parcelle'] = df['Surface Parcelle'].fillna(0)
        print(df['Surface Parcelle'])
        superficie_totale=df['Surface Parcelle'].sum()
        
        # Calculer le nombre de producteurs
        df = df.drop_duplicates(subset=['code'], keep='last')
        number_of_producer = df.shape[0]

        # Créer une réponse JSON
        response_data = {
            'number_of_producer': number_of_producer,
            'number_of_parcelle': number_of_parcelle,
            'superficie_totale': superficie_totale,
        }
        tab_response_data = []
        tab_response_data.append(response_data)
        return Response(tab_response_data)
