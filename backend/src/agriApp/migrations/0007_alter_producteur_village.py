# Generated by Django 4.2.3 on 2023-08-07 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agriApp', '0006_alter_reponse_libelle_alter_reponse_reponsebio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producteur',
            name='village',
            field=models.CharField(max_length=100, null=True),
        ),
    ]