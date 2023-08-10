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
            columnsToDrop = ['TypeForm', 'Type Question', 'BIO']
            for col in form.columns:    
                for colToDrop in columnsToDrop:   
                    if colToDrop in col:  
                        form.drop(col,axis=1,inplace=True)
            form['remplis'] = 0
            
            form.replace(r'^\s*$', pd.NA, regex=True, inplace=True)
            
            for index, row in form.iterrows():
                
                num_cells_filled = row.notnull().sum()
                
                if num_cells_filled > 2:
                    form.loc[index,'remplis']=1
                else:
                    form.loc[index,'remplis']=0
            
        formsWithProductorInfo=HandleFormulaire.formConcatProductor(forms)
        numberForm=len(formsWithProductorInfo)
        responseData={
            "numberForm":numberForm,
            "forms":[]
        }
        
        for i in range(0, len(formsWithProductorInfo)):
            #number of productor with form['remplis']=1 and form['remplis']=0
            dfForm=formsWithProductorInfo[i]
            dfForm=dfForm.fillna(value=0)
            if zone:
                dfForm=dfForm.loc[dfForm['Zone']==zone]
            if union:
                dfForm=dfForm.loc[dfForm['Union']==union]
            colForm=[col for col in dfForm.columns if 'NomForm' in col]
            nomForm=dfForm[colForm[0]].iloc[0]
            numberformRemplis=dfForm.loc[dfForm['remplis']==1].shape[0]
           
            numberFormNonRemplis=dfForm.loc[dfForm['remplis']==0].shape[0]
            
            productorformRemplis=dfForm.loc[dfForm['remplis']==1,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]
            productorformNonRemplis=dfForm.loc[dfForm['remplis']==0,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]

            formData={
                "nomForm":nomForm,
                "numberformRemplis":numberformRemplis,
                "numberFormNonRemplis":numberFormNonRemplis,
                "productorformRemplis":productorformRemplis.to_dict(orient='records'),
                "productorformNonRemplis":productorformNonRemplis.to_dict(orient='records')
            }
            
            
            responseData.get('forms').append(formData)
                
        return Response(responseData)

class RapportForm(APIView):
    def get(self, request):
        formId=request.GET.get('formId', None)
        filterBaseQuestion=request.GET.get('filterBaseQuestion',None)
        filterBaseResponse=request.GET.get('filterBaseResponse',None)
        
        formId=int(formId)
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=HandleFormulaire(df).nettoyage()
        forms=HandleFormulaire.extractForm(df)
        form=forms[formId]
        formType=[col for col in form.columns if 'TypeForm' in col]
        if form.at[1,formType[0]]== 0:
            df = df.drop_duplicates(subset=['code'], keep='last')
        elif form.at[1,formType[0]]== 1:
            df = df.drop_duplicates(subset=['Code Surface'], keep='last')
        df.fillna(pd.NA)
        forms=HandleFormulaire.extractForm(df)
        form=forms[formId]   
        questions=HandleFormulaire.extractQuestion(form)
        tabResponseData=[]
        responseData={}
        for question in questions:
            questionType=[col for col in question.columns if 'Type Question' in col]
            if question.at[1,questionType[0]] in [2,3]: 
                questionLibelle=question.columns[1]
                countOfResponse=question.groupby(questionLibelle).size().reset_index(name='count')
                
                dicCountOfResponse={}
                for index, row in countOfResponse.iterrows():
                    dicCountOfResponse[row[questionLibelle]] = row['count'] 
                    
                responseData[questionLibelle]=dicCountOfResponse 
                tabResponseData.append(responseData)  
                if filterBaseQuestion and filterBaseResponse:   
                    productorInfo=df.loc[df[filterBaseQuestion] == filterBaseResponse ,[ 'code','Nom et Prénoms','Sexe','Contact','Village','Union','Zone','Code Surface','Surface Parcelle']]
                     
                    productorInfo.fillna(value=0,inplace=True)
                    productorInfo=productorInfo.to_dict(orient='records') 
                    tabResponseData.append(productorInfo)  
                
            elif question.at[1,questionType[0]] == 6 :
                questionLibelle=question.columns[1]
                
                question[questionLibelle] = df[questionLibelle].str.replace(',', '.').str.strip()
                question[questionLibelle] = pd.to_numeric(df[questionLibelle], errors='coerce')
                
                #calculer la sum ,la moyenne, le max et le min
                sumQuestion = round(question[questionLibelle].sum(),0)
                moyQuestion = round(question[questionLibelle].mean(),2)
                maxQuestion = question[questionLibelle].max()
                minQuestion = question[questionLibelle].min()
                responseData[questionLibelle] = {
                    'sum':sumQuestion,
                    'moy':moyQuestion,
                    'max':maxQuestion,
                    'min':minQuestion
                }
        
                
                
                
        return Response(tabResponseData)
        
        
        
        

             
        
        
    