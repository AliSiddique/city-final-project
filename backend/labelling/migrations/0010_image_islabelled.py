# Generated by Django 4.2.2 on 2024-04-08 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('labelling', '0009_labelledimagesanalytics'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='isLabelled',
            field=models.BooleanField(default=False),
        ),
    ]
