from agriApp.models import File
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from agriApp.views.Generale.generale import Generale

class FilterZone(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        Liste_zone=df['Zone'].unique()
        
        return Response(Liste_zone)
    
class FilterCooperative(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        zone = request.GET.get('zone', None)
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        if zone:
            df = df[df['Zone'] == zone]
        
        Liste_Cooperative=df['Union'].unique()
        
        return Response(Liste_Cooperative)