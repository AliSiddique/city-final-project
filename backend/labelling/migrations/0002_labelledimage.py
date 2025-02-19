# Generated by Django 4.2.2 on 2024-04-06 12:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('labelling', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LabelledImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=255)),
                ('confidence', models.FloatField()),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('w', models.FloatField()),
                ('h', models.FloatField()),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='labelling.image')),
            ],
        ),
    ]
