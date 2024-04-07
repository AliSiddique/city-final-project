# Generated by Django 4.2.2 on 2024-04-07 13:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('labelling', '0007_image_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labelledimage',
            name='confidence',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='labelledimage',
            name='h',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='labelledimage',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='labelling.image'),
        ),
        migrations.AlterField(
            model_name='labelledimage',
            name='label',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='labelledimage',
            name='w',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='labelledimage',
            name='x',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='labelledimage',
            name='y',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
