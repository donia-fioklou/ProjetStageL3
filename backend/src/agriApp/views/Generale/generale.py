import pandas as pd
import numpy as np


class Generale():
    def __init__(self, df):
        self.df = df
    
    def nettoyage(self):
        # It seems like 'df' should be replaced with 'self.df' to refer to the class attribute
        self.df=self.df.drop_duplicates(subset=['code'], keep='last')
        self.df = self.df.drop_duplicates(subset=['Code Surface'], keep='last')
        self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']] = self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']].fillna(0)
        self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']] = self.df[['Quantité vendu en 2021(en Tonne)', 'Age de la plantation', 'Nombre de plants']].replace(to_replace='.*', value=0, regex=True)
        return self.df  # Return the modified DataFrame
    
    @staticmethod
    def delete_additionnel_col(df):
        cols_to_delete = ['Formulaire', 'Type formulaire', 'Unnamed']
        cols_to_drop = [col for col in df.columns if any(keyword in col for keyword in cols_to_delete)]
        df.drop(cols_to_drop, axis=1, inplace=True)
        return df
    
    def decoupage(self):
        # 'df=' should be removed from the parameter since 'decoupage' is now a method of the class
        self.df = Generale.delete_additionnel_col(self.df)
        forms = []
        col_name = []
        
        for col in self.df.columns:
            col_name.append(col)
            if 'Fin' in col:
                forms.append(self.df.loc[:, col_name].copy())  # Use copy() to avoid setting with copy warning
                col_name = []
        return forms

    def concat_id(self):
        forms = self.decoupage()  # Use self.decoupage() since it's now a method of the class
        forms_with_id = []
        for form in forms:
            if not form.equals(forms[0]):
                forms_with_id.append(pd.concat([forms[0], form], axis=1))
        return forms_with_id

    # @staticmethod
    # def analyse_incoherence(form):
    #     resultat = []
    #     for index, row in form.iterrows():  # Fix 'itterows()' to 'iterrows()'
    #         colonne_non_remplis = []
    #         nombre_de_col_non_remplis = 0
    #         for col in form.columns:
    #             if pd.isnull(row[col]):  # Use 'pd.isnull()' instead of checking against an empty string
    #                 nombre_de_col_non_remplis += 1
    #                 colonne_non_remplis.append(col)
    #         resultat.append({'nombre_de_col_non_remplis': nombre_de_col_non_remplis, 'colonne_non_remplis': colonne_non_remplis})
    #     resultat_df = pd.DataFrame(resultat)
    #     return resultat_df

    def liste_zone(self):
        liste_zone = self.df['Zone'].unique()
        # liste_zone = np.insert(liste_zone, 0, "Tous")
        return liste_zone

    def liste_cooperative(self, zone):
        # df = df.loc[df['Zone'] == zone]  # Commented out because 'df' is now a class attribute, not a local variable
        liste_cooperative = self.df['Union'].unique()
        # liste_cooperative = np.insert(liste_cooperative, 0, "Tous")
        return liste_cooperative

# Graphe pour la répartition par sexe
class GrapheSexe():
    def __init__(self,df):
        self.df=df
    #graphique pour le sexe
    def graph_sexe(self,zone,union):
        forms=decoupage(self.df)
        df=forms[0]
        
        if zone=="Tous" and union=="Tous":
            df=df.groupby('Sexe').size().reset_index()
        elif zone=="Tous" and union!="Tous":
            df=df.loc[df['Union']==union]
            df=df.groupby('Sexe').size().reset_index()
        elif zone!="Tous" and union=="Tous":
            df=df.loc[df['Zone']==zone]
            df=df.groupby('Sexe').size().reset_index()
        else:
            df=df.loc[df['Zone']==zone]
            df=df.loc[df['Union']==union]
            df=df.groupby('Sexe').size().reset_index()
        
        
        df.columns=['Sexe','Nombre']
        
        
        
        return 
    # nombre de producteur par sexe
    def nombre_producteur(self,zone,union):
        forms=decoupage(self.df)
        df=forms[0]
        df=df.drop_duplicates(subset=['code'],keep='last')
        if zone=="Tous" and union=="Tous":
            df=df.groupby('Sexe').size().reset_index()
        elif zone=="Tous" and union!="Tous":
            df=df.loc[df['Union']==union]
            df=df.groupby('Sexe').size().reset_index()
        elif zone!="Tous" and union=="Tous":
            df=df.loc[df['Zone']==zone]
            df=df.groupby('Sexe').size().reset_index()
        else:
            df=df.loc[df['Zone']==zone]
            df=df.loc[df['Union']==union]
            df=df.groupby('Sexe').size().reset_index()
        df.columns=['Sexe','Nombre']
        return df
#graphe pour la repartition des producteurs par zone    
class GrapheProducteur():
    def __init__(self,df):
        self.df=df
    
    #nombre de producteur par zone
    def graph_producteur_zone(self,union):
        forms=decoupage(self.df)
        df=forms[0]
        df=df.drop_duplicates(subset=['code'],keep='last')
        if union=="Tous":
            df=df.groupby('Zone').size().reset_index()
        else:
            df=df.loc[df['Union']==union]
            df=df.groupby('Zone').size().reset_index()
        df.columns=['Zone','nombre']
        df.sort_values('nombre',ascending=False,inplace=True)
        nombre=df['nombre']
        zone=df['Zone']
        
        fig, ax = plt.subplots()
        ax.bar(height=nombre, x=zone)
        ax.tick_params(axis='x', rotation=45)
        
        chart_zone=st.pyplot(fig)
        return chart_zone
    #nombre de producteur par zone
    def nombre_producteur_zone(self,union):
        forms=decoupage(self.df)
        df=forms[0]
        df=df.drop_duplicates(subset=['code'],keep='last')
        if union=="Tous":
            df=df.groupby('Zone').size().reset_index()
        else:
            df=df.loc[df['Union']==union]
            df=df.groupby('Zone').size().reset_index()
        df.columns=['Zone','nombre']
        df=df.pivot_table(columns='Zone', values='nombre')
        return df
    
     


    