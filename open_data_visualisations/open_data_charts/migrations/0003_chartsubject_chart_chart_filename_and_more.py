# Generated by Django 4.0.4 on 2022-08-08 23:53

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('open_data_charts', '0002_alter_chart_chart_creation_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChartSubject',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('subject', models.CharField(max_length=200, verbose_name='File subject')),
            ],
        ),
        migrations.AddField(
            model_name='chart',
            name='chart_filename',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='chart',
            name='chart_creation_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 8, 8, 23, 53, 55, 611264, tzinfo=utc), verbose_name='Created'),
        ),
        migrations.DeleteModel(
            name='ChartFile',
        ),
        migrations.AddField(
            model_name='chartsubject',
            name='chart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='open_data_charts.chart'),
        ),
    ]