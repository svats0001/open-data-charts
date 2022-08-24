# Generated by Django 4.0.4 on 2022-08-16 01:47

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('open_data_charts', '0007_alter_chart_chart_creation_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chart',
            name='chart_url',
        ),
        migrations.AlterField(
            model_name='chart',
            name='chart_creation_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 16, 1, 47, 59, 32038, tzinfo=utc), verbose_name='Created'),
        ),
    ]