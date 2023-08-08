import pandas as pd
import numpy as np


class Generale():
    def __init__(self, df):
        self.df = df

    # def check_and_fix_numeric(value):
    #     try:
    #         return int(value)  
    #     except ValueError:
    #         return None 
        
    # def check_and_fix_string(value):
    #     if isinstance(value, str):
    #         return value.strip()  
    #     return None

    def nettoyage(self):
            numericColumn=['Contact','Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']
            self.df = self.df.drop_duplicates(subset=['Code Surface'], keep='last')
            self.df[numericColumn] = self.df[numericColumn].fillna(0)
            self.df[numericColumn] = self.df[numericColumn].replace(to_replace='.*', value=0, regex=True)
            self.df.replace('',None,inplace=True)

            # int_fields = ['Contact','Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']
            # for field in int_fields:
            #     self.df[field] = self.df[field].apply(self.check_and_fix_numeric)

            # string_fields = ['Zone', 'Union', 'Nom et Prénoms', 'Village', 'Code Surface', 'Surface Parcelle', 'Si Parcelle', 'Si Polygon', 'Varieté']
            # for field in string_fields:
            #     self.df[field] = self.df[field].apply(self.check_and_fix_string)
            return self.df  
        

   


     


    