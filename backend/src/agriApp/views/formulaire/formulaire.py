
import pandas as pd

class HandleFormulaire():
    def __init__(self, df):
        self.df = df
    
    def nettoyage(self):
        # It seems like 'df' should be replaced with 'self.df' to refer to the class attribute
        self.df = self.df.drop_duplicates(subset=['Code Surface'], keep='last')
        self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']] = self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']].fillna('')
        self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']] = self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']].replace(to_replace='.*', value='', regex=True)
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
        for col in form.columns[2:]:
            col_name.append(col)
            if 'Bio'in col:
                questions.append(form.loc[:,col_name])
                col_name=[]
        return questions