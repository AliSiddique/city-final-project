# Generated by Django 4.2.2 on 2024-04-11 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('log', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
