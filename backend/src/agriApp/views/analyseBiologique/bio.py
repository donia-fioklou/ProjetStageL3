def ProduitAmdec(chaine):
    chaine=str(chaine)
    nombres = chaine.split('|')  # Divise la chaîne en liste de nombres en utilisant le séparateur '|'
    produit = 1 
    
    for nombre in nombres:
        try:
            produit =produit* int(nombre)  # Convertit chaque nombre en entier et ajoute à la somme
        except ValueError:
            pass  # Ignore les valeurs qui ne peuvent pas être converties en entier
    
    return produit