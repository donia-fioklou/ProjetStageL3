from agriApp.models import File
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from agriApp.views.Generale.generale import Generale

class FilterZoneCooperative(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self, request):
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=Generale(df).nettoyage()
        
        Liste_zone=df['Zone'].unique()
        zoneData={}
        for zone in Liste_zone:
            newDf=df.loc[df['Zone']==zone]
            Liste_cooperative=newDf['Union'].unique()
            zoneData[zone]=Liste_cooperative
        
        return Response(zoneData)
    
