from rest_framework.views import APIView
import pandas as pd
from rest_framework.response import Response

from agriApp.views.formulaire.formulaire import HandleFormulaire
from agriApp.views.analyseBiologique.bio import sommeAmdec
from agriApp.models.File import File
class AnalyseBio(APIView):
    def get(self, request):
        searchKey = request.GET.get('searchKey')
        last_file=File.objects.last()
        last_file=last_file.filePath
        df=pd.read_excel(last_file)
        df=HandleFormulaire(df).nettoyage()
        forms=HandleFormulaire.extractForm(df)
        sumBio=0
        for form in forms:
            questions=HandleFormulaire.extractQuestion(form)
            for question in questions:
                
                questionType=[col for col in question.columns if 'Type Question' in col]
                if question.at[1,questionType[0]] in [2,3]: 
                    question['scoreBio']=0
                    amdec=[col for col in question.columns if 'AMDEC' in col]
                    amdec=amdec[0]
                    bio=[col for col in question.columns if 'BIO' in col]
                    bio=bio[0]
                    for index,row in question.iterrows():
                        sumBio=sumBio+question.at[index,bio]
                        print(question.at[index,amdec])
                        scoreAmdec=sommeAmdec(question.at[index,amdec])
                        question.at[index,amdec]
                        question.loc[index,'scoreBio']=question.at[index,bio]*scoreAmdec
        dfWithScoreBio=HandleFormulaire.formConcatProductor(forms)
        dfWithScoreBio['totalScoreBio']=0
        
        for index,row in dfWithScoreBio.iterrows():
            for col in dfWithScoreBio.columns:
                if 'scoreBio' in col:
                    dfWithScoreBio.loc[index,'totalScoreBio']=dfWithScoreBio.loc[index,'totalScoreBio']+dfWithScoreBio.loc[index,col]
            dfWithScoreBio.loc[index,'totalScoreBio']=dfWithScoreBio.loc[index,'totalScoreBio']/sumBio
                
        return Response(dfWithScoreBio.to_json(orient="records"))
            
            
        