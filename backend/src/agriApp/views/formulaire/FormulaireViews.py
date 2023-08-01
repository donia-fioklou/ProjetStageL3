from agriApp.models import File
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from agriApp.views.Generale.generale import Generale
from agriApp.views.formulaire.formulaire import HandleFormulaire

class NumberOfForm(APIView):
    def get(self, request):
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        forms=HandleFormulaire.extractForm(df)
        numberForm=len(forms)
        responseData={
            'numberForm':numberForm
        }
        tab_response_data = []
        tab_response_data.append(responseData)
        return Response(tab_response_data)
    
class FormFillRate(APIView):
    
     def get(self, request):
        zone = request.GET.get('zone', None)
        union = request.GET.get('union', None)
        
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        forms=HandleFormulaire.extractForm(df)
        numberForm=len(forms)
        
        for i in range(1, len(forms)):
            form = forms[i]
            form['remplis'] = 0
            for index, row in form.iterrows():
                if row.notnull().any():
                    form.loc[index,'remplis']=1
                else:
                    form.loc[index,'remplis']=0
        formsWithProductorInfo=HandleFormulaire.formConcatProductor(forms)
        
        
        responseData={
            "numberForm":numberForm,
            "forms":[]
        }
        idForm=0
        for dfForm in formsWithProductorInfo:
            #number of productor with form['remplis']=1 and form['remplis']=0

            numberformRemplis=dfForm.loc[dfForm['remplis']==1].shape[0]
           
            numberFormNonRemplis=dfForm.loc[dfForm['remplis']==0].shape[0]
            
            productorformRemplis=dfForm.loc[dfForm['remplis']==1,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]
            productorformRemplis.fillna(value=0,inplace=True)
            productorformNonRemplis=dfForm.loc[dfForm['remplis']==0,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]
            productorformRemplis.fillna(value=0,inplace=True)
            
            formData={
                "numberformRemplis":numberformRemplis,
                "numberFormNonRemplis":numberFormNonRemplis,
                "productorformRemplis":productorformRemplis.to_dict(orient='records'),
                "productorformNonRemplis":productorformNonRemplis.to_dict(orient='records')
            }
            idForm+=1
            
            responseData.get('forms').append(formData)
        return Response(responseData)
            
                    
                
             
            
        
        
        
        
        
        

        
        return Response()
