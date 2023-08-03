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
        formsWithProductorInfo=HandleFormulaire.formConcatProductor(forms)
        numberForm=len(formsWithProductorInfo)
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
        df=HandleFormulaire(df).nettoyage()
        forms=HandleFormulaire.extractForm(df)
        
        
        for i in range(1, len(forms)):
            form = forms[i]
            columnsToDrop = ['NomForm', 'TypeForm', 'Type Question', 'BIO']
            for col in form.columns:
                
                for colToDrop in columnsToDrop:   
                    if colToDrop in col:
                        
                        form.drop(col,axis=1,inplace=True)
            form['remplis'] = 0
            
            form.replace(r'^\s*$', pd.NA, regex=True, inplace=True)
            
            for index, row in form.iterrows():
                
                num_cells_filled = row.notnull().sum()
                
                if num_cells_filled > 1:
                    form.loc[index,'remplis']=1
                else:
                    form.loc[index,'remplis']=0
            
        formsWithProductorInfo=HandleFormulaire.formConcatProductor(forms)
        numberForm=len(formsWithProductorInfo)
        responseData={
            "numberForm":numberForm,
            "forms":[]
        }
        
        for dfForm in formsWithProductorInfo:
            #number of productor with form['remplis']=1 and form['remplis']=0
            dfForm=dfForm.fillna(value=0)
            if zone:
                dfForm=dfForm.loc[dfForm['Zone']==zone]
            if union:
                dfForm=dfForm.loc[dfForm['Union']==union]
            numberformRemplis=dfForm.loc[dfForm['remplis']==1].shape[0]
           
            numberFormNonRemplis=dfForm.loc[dfForm['remplis']==0].shape[0]
            
            productorformRemplis=dfForm.loc[dfForm['remplis']==1,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]
            productorformNonRemplis=dfForm.loc[dfForm['remplis']==0,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]
            
            
            formData={
                "numberformRemplis":numberformRemplis,
                "numberFormNonRemplis":numberFormNonRemplis,
                "productorformRemplis":productorformRemplis.to_dict(orient='records'),
                "productorformNonRemplis":productorformNonRemplis.to_dict(orient='records')
            }
            
            
            responseData.get('forms').append(formData)
        return Response(responseData)
            
                    
                
             
            
        
        
        
        
        
        

        
        return Response()
