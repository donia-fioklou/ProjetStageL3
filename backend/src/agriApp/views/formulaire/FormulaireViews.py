from agriApp.models import File
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from agriApp.views.Generale.generale import Generale
from agriApp.views.formulaire.formulaire import Formulaire

class FormFillRate(APIView):
    
     def get(self, request):
        zone = request.GET.get('zone', None)
        union = request.GET.get('union', None)
        
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        forms=Formulaire.extractForm(df)
        numberForm=len(forms)
        
        for form in forms:
            form['remplis'] = float('nan')
            for index, row in form.iterrows():
                if row.notnull().all():
                    form.loc[index,'remplis']=1
                else:
                    form.loc[index,'remplis']=0
        formsWithProductorInfo=Formulaire.formConcatProductor(forms)
        
        
        responseData={
            "numberForm":numberForm
        }
        for form in formsWithProductorInfo:
            #number of productor with form['remplis']=1 and form['remplis']=0
            numberformRemplis=form.loc[form['remplis']==1].shape[0]
            numberFormNonRemplis=form.loc[form['remplis']==0].shape[0]
            
            productorformRemplis=form.loc[form['remplis']==1,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle','Si Parcelle']]
            productorformNonRemplis=form.loc[form['remplis']==0,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle','Si Parcelle']]
            
            formData={
                "numberformRemplis":numberformRemplis,
                "numberFormNonRemplis":numberFormNonRemplis,
                "productorformRemplis":productorformRemplis.to_dict(orient='records'),
                "productorformNonRemplis":productorformNonRemplis.to_dict(orient='records')
            }
            
            responseData.update({form.columns[0]:formData})
            
                    
                
             
            
        
        
        
        
        
        

        
        return Response()
