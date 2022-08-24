from operator import mod
from django.db import models

from django.utils import timezone

class Category(models.Model):
    cat_id = models.IntegerField(primary_key=True)
    cat_name = models.CharField(max_length=100, verbose_name='Category name')

    def __str__(self):
        return self.cat_name

class Chart(models.Model):
    chart_id = models.IntegerField(primary_key=True)
    chart_title = models.CharField(max_length=500, verbose_name='Title')
    chart_category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, verbose_name='Category')
    chart_description = models.CharField(max_length=1000)
    chart_creation_date = models.DateTimeField(default=timezone.now(), verbose_name='Created')
    chart_filename = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.chart_title

class ChartSubject(models.Model):
    id = models.IntegerField(primary_key=True)
    subject = models.CharField(max_length=200, verbose_name='File subject')
    chart = models.ForeignKey(Chart, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject

class ChartMeasure(models.Model):
    id = models.IntegerField(primary_key=True)
    measure = models.CharField(max_length=100)
    chart = models.ForeignKey(Chart, on_delete=models.CASCADE)

    def __str__(self):
        return self.measure

class ChartUrl(models.Model):
    id = models.IntegerField(primary_key=True)
    url = models.CharField(max_length=1000)
    chart = models.ForeignKey(Chart, on_delete=models.CASCADE)

    def __str__(self):
        return self.url