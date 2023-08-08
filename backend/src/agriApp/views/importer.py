import pandas as pd
from agriApp.models import Formulaire
from agriApp.models.Cooperative import Cooperative
from agriApp.models.File import File
from agriApp.models.Parcelle import Parcelle
from agriApp.models.Producteur import Producteur
from agriApp.models.Question import Question
from agriApp.models.Reponse import Reponse

from agriApp.models.Zone import Zone
from agriApp.models.parcelle_question import ParcelleQuestion
from agriApp.views.formulaire.formulaire import HandleFormulaire
from agriApp.views.Generale.generale import Generale

class Importer():
    @staticmethod
    def handle(filePath):
        fichier=File.objects.last()
        df=pd.read_excel(filePath)
        df=df.fillna('')
        df=Generale(df).nettoyage()
        
       
        for index, row in df.iterrows():
            if row['Zone'] not in [None, 'n/a']:
                if not Zone.objects.filter(name=row['Zone']).exists():
                    zone=Zone.objects.create(name=row['Zone'])
                else:
                    zone=Zone.objects.get(name=row['Zone'])
            if row['Union'] not in [None, 'n/a']:
                if not Cooperative.objects.filter(name=row['Union']).exists():
                    cooperative=Cooperative.objects.create(name=row['Union'],zone=zone)
                else:
                    cooperative=Cooperative.objects.get(name=row['Union'])
            if not Producteur.objects.filter(code=row['code']).exists():
                Producteur.objects.create(code=row['code'],nomPrenom=row['Nom et Prénoms'],sexe=row['Sexe'],contact=row['Contact'],village=row['Village'],cooperative=cooperative)    
            parcelle=Parcelle.objects.create(codeSurface=row['Code Surface'],surfaceParcelle=row['Surface Parcelle'],localisation=row['Si Parcelle'],polygone=row['Si Polygon'],variete=row['Varieté'],producteur=Producteur.objects.get(code=row['code']))
            
            forms=HandleFormulaire.extractForm(df)
            #delete the first form (producteur information)
            forms.remove(forms[0])
            for form in forms:
                    NomForm=[col for col in form.columns if 'NomForm' in col ]
                    TypeForm=[col for col in form.columns if 'TypeForm' in col ]
                    if not Formulaire.objects.filter(name=form.at[index,NomForm[0]]).exists():
                        formulaire=Formulaire.objects.create(name=form.at[index,NomForm[0]],type=form.at[index,TypeForm[0]])
                    else:
                        formulaire=Formulaire.objects.get(name=form.at[index,NomForm[0]])
                    questions=HandleFormulaire.extractQuestion(form)
                    for question in questions:    
                        for col in question.columns:
                            TypeQuestion=[col for col in question.columns if 'Type Question' in col ]
                            Bio=[col for col in question.columns if 'BIO' in col ]
                            if not Question.objects.filter(libelle=col).exists():
                                questionObjet=Question.objects.create(libelle=col,typeQuestion=question.at[index,TypeQuestion[0]],formulaire=formulaire)
                                ParcelleQuestion.objects.create(parcelle=parcelle,question=questionObjet)
                            else:
                                questionObjet=Question.objects.get(libelle=col)
                            Reponse.objects.create(question=questionObjet,fichier=fichier,reponseBio=question.at[index,Bio[0]],libelle=question.at[index,question.columns[1]])
                        
                                
                                
                        
                            
                        
                        
            