from rest_framework import serializers

from agriApp.models.Producteur import Producteur

class ProductorSerializers(serializers.ModelSerializer):
    class Meta :
        model=Producteur
        fields=['code',
                'nomPrenom',
                'sexe',
                'contact',
                'village',]