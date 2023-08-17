
import pandas as pd

class HandleFormulaire():
    def __init__(self, df):
        self.df = df
    
    def nettoyage(self):
        # Supprimer les espaces en début et fin de chaînes de caractères
        colonneTexte = self.df.select_dtypes(include=['object']).columns
        self.df[colonneTexte] = self.df[colonneTexte].apply(lambda x: x.str.strip() if x.dtype == "object" else x)
        # Convertir les valeurs non numériques en NaN dans les colonnes numériques
        colonneNumerique = self.df.select_dtypes(include=['int64', 'float64']).columns
        self.df[colonneNumerique] = self.df[colonneNumerique].apply(pd.to_numeric, errors='coerce')
        return self.df  
    
    
    @staticmethod
    def extractForm(df):
        forms=[]
        col_name=[]
        
        for col in df.columns:
            if 'Fin'not in col:
                col_name.append(col)
            if 'Fin'in col:
                #supprimer Fin dans col_name
                forms.append(df.loc[:,col_name])
                col_name=[]
        return forms
    
    @staticmethod
    def formConcatProductor(forms):
        
        formsConcatProductor=[]
        for form in forms:  
            if not form.equals(forms[0]):     
                formsConcatProductor.append(pd.concat([forms[0],form],axis=1))
        return formsConcatProductor
    
    @staticmethod
    def extractQuestion(form):
        questions=[]
        col_name=[]
        #parcourir les colonnes à partir de la 3ème
        print(form.columns[2:])
        for col in form.columns[2:]:
            col_name.append(col)
            if 'AMDEC'in col:
                questions.append(form.loc[:,col_name])
                col_name=[]
        return questions