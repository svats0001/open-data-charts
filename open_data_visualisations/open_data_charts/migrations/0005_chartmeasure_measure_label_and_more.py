# Generated by Django 4.0.4 on 2022-08-11 06:16

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('open_data_charts', '0004_alter_chart_chart_creation_date_chartmeasure'),
    ]

    operations = [
        migrations.AddField(
            model_name='chartmeasure',
            name='measure_label',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='chart',
            name='chart_creation_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 11, 6, 16, 42, 631863, tzinfo=utc), verbose_name='Created'),
        ),
    ]
