from django.contrib import admin

from .models import Chart, Category, ChartSubject

class ChartSubjectInline(admin.TabularInline):
    model = ChartSubject
    fields = ['subject']
    extra = 1

class ChartAdmin(admin.ModelAdmin):
    fields = ['chart_title', 'chart_category', 'chart_description', 'chart_url']
    inlines = [ChartSubjectInline]
    list_display = ('chart_title', 'chart_category', 'chart_creation_date')
    list_filter = ['chart_category']
    search_fields = ['chart_title']

class CategoryAdmin(admin.ModelAdmin):
    fields = ['cat_name']

admin.site.register(Chart, ChartAdmin)
admin.site.register(Category, CategoryAdmin)