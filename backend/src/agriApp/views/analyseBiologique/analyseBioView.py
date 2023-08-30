import numpy as np
from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response

from agriApp.views.formulaire.formulaire import HandleFormulaire

from agriApp.models.File import File
from agriApp.views.analyseBiologique.bio import ProduitAmdec
class AnalyseBio(APIView):
    def get(self, request):
        searchKey = request.GET.get('searchKey')
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df.columns = df.columns.str.strip()
        newColonneName={
            'Nom et Prénoms':'NomPrenom',
            'Code Surface':'CodeSurface',
        }
        
        df.rename(columns=newColonneName, inplace=True)
       
        df=HandleFormulaire(df).nettoyage()
        df=df.drop_duplicates(subset=['CodeSurface'],keep='first')
        if searchKey:
            # Utilisez str.contains() pour filtrer les résultats basés sur la recherche
            df = df.loc[df['NomPrenom'].str.contains(searchKey, case=False),:]

           
        forms=HandleFormulaire.extractForm(df)
        # sumBio=0
        dfWithScoreBio=df.loc[:,['NomPrenom','Sexe','Contact','Village','Union','Zone','CodeSurface']]
        counter=0
        # for form in forms:
        #     questions=HandleFormulaire.extractQuestion(form)
        questions=HandleFormulaire.extractQuestion(forms[2])   
        for question in questions:
            counter+=1
            score_column_name = f'scoreBio_{counter}'    
            questionType=[col for col in question.columns if 'Type Question' in col]
            if question.at[1,questionType[0]] in [2,3]: 
                question[score_column_name]=0
                amdec=[col for col in question.columns if 'AMDEC' in col]
                amdec=amdec[0]
                bio=[col for col in question.columns if 'BIO' in col]
                bio=bio[0]
                print(question)
                for index,row in question.iterrows():
                    scoreAmdec=ProduitAmdec(question.at[index,amdec])
                    print("scoreAmdec")                    
                    #question.at[index,amdec]
                    scoreBio=[col for col in question.columns if 'scoreBio' in col]
                    question.loc[index,scoreBio]=question.at[index,bio]*scoreAmdec
                    print(question.loc[index,scoreBio])
                        
                #ajouter question au dataframe dfWithScoreBio
                dfWithScoreBio=pd.concat([dfWithScoreBio,question],axis=1)

        dfWithScoreBio['totalScoreBio']=0
        
        #print(dfWithScoreBio)
        for index,row in dfWithScoreBio.iterrows():
            sumBio=0
            for col in dfWithScoreBio.columns:
                
                if 'scoreBio' in col:     
                    dfWithScoreBio.at[index,'totalScoreBio']=dfWithScoreBio.at[index,'totalScoreBio']+dfWithScoreBio.at[index,col]
                    
                #calculer la somme de colonnes bio
                if 'BIO' in col:
                    value = dfWithScoreBio.at[index,col]
                    if not pd.isna(value):
                        sumBio+=value      
            dfWithScoreBio.at[index,'totalScoreBio']=round((((dfWithScoreBio.at[index,'totalScoreBio']/sumBio)*100)/64),2)
            
            # totalscoreBio=round(((totalScoreBio*100)/64),2)
            #dfWithScoreBio.at[index,'totalScoreBio']=totalscoreBio
            #print(dfWithScoreBio.at[index,'totalScoreBio'])
            #print(sumBio)
        dfWithScoreBio = dfWithScoreBio.replace(np.nan, '')
        productorWithScoreBio=dfWithScoreBio.to_dict(orient="records")      
        return Response(productorWithScoreBio)
           
            
        