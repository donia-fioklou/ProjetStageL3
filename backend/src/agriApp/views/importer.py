import pandas as pd
from backend.src.agriApp.models import Formulaire
from backend.src.agriApp.models.Cooperative import Cooperative
from backend.src.agriApp.models.File import File
from backend.src.agriApp.models.Parcelle import Parcelle
from backend.src.agriApp.models.Producteur import Producteur
from backend.src.agriApp.models.Question import Question
from backend.src.agriApp.models.Reponse import Reponse

from backend.src.agriApp.models.Zone import Zone
from backend.src.agriApp.models.parcelle_question import ParcelleQuestion
from backend.src.agriApp.views.formulaire.formulaire import HandleFormulaire

class Importer():
    @staticmethod
    def handle(filePath):
        fichier=File.objects.last()
        df=pd.read_excel(filePath)
        df=df.fillna(None)
       
        for index, row in df.iterrows():
            if row['Zone'] not in [None, 'n/a']:
                if not Zone.objects.filter(name=row['zone']).exists():
                    zone=Zone.objects.create(name=row['zone'])
                else:
                    zone=Zone.objects.get(name=row['zone'])
            if row['Union'] not in [None, 'n/a']:
                if not Cooperative.objects.filter(name=row['union']).exists():
                    cooperative=Cooperative.objects.create(name=row['union'],zone=zone)
                else:
                    cooperative=Cooperative.objects.get(name=row['union'])
            Producteur.objects.create(code=row['code'],nomPrenom=row['nomPrenom'],sexe=row['sexe'],contact=row['contact'],village=row['village'],cooperative=cooperative)
            
            parcelle=Parcelle.objects.create(codeSurface=row['Code Surface'],surfaceParcelle=row['Surface Parcelle'],localisation=row['Si Parcelle'],polygone=row['Si Polygon'],variete=row['Varieté'],producteur=Producteur.objects.get(code=row['code']))
            
            forms=HandleFormulaire.extractForm(df)
            for form in forms:
                    if not Formulaire.objects.filter(name=form.at[1,'nomForm']).exists():
                        formulaire=Formulaire.objects.create(name=form.at[1,'nomForm'],type=form.at[1,'typeForm'])
                    else:
                        formulaire=Formulaire.objects.get(name=form.at[1,'nomForm'])
                    questions=HandleFormulaire.extractQuestion(form)
                    for question in questions:
                        for col in question.columns:
                            if not Question.objects.filter(libelle=col).exists():
                                question=Question.objects.create(libelle=col,typeQuestion=question.at[1,'Type Question'],formulaire=formulaire)
                            else:
                                question=Question.objects.get(libelle=col)
                            Reponse.objects.create(question=question,fichier=fichier,reponseBio=question.at[index,question['Bio']],libelle=question.at[index,question.libelle])
                        
                                
                                
                        
                            
                        
                        
            