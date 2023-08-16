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
        # Supprimer les espaces en début et fin de chaînes de caractères
        colonneTexte = self.df.select_dtypes(include=['object']).columns
        self.df[colonneTexte] = self.df[colonneTexte].apply(lambda x: x.str.strip() if x.dtype == "object" else x)

        # Convertir les valeurs non numériques en NaN dans les colonnes numériques
        colonneNumerique = self.df.select_dtypes(include=['int64', 'float64']).columns
        self.df[colonneNumerique] = self.df[colonneNumerique].apply(pd.to_numeric, errors='coerce')
        return self.df 
        

   


     


    