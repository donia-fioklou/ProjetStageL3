import pandas as pd
import numpy as np


class Generale():
    def __init__(self, df):
        self.df = df
    
    def nettoyage(self):
            # It seems like 'df' should be replaced with 'self.df' to refer to the class attribute
            
            self.df = self.df.drop_duplicates(subset=['Code Surface'], keep='last')
            self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']] = self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']].fillna('')
            self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']] = self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']].replace(to_replace='.*', value='', regex=True)
            return self.df  # Return the modified DataFrame
        
        

   


     


    