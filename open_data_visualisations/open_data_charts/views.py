from django.views import generic
from django.utils import timezone
from django.templatetags.static import static

from .models import Chart, Category

class IndexView(generic.ListView):
    template_name = 'open_data_charts/index.html'
    context_object_name = 'categories_charts'

    def get_queryset(self):
        query = self.request.GET.get('search')
        result = Chart.objects.all()
        if query:
            result = Chart.objects.filter(chart_title__contains=query)
        return {'recent_charts': Chart.objects.filter(chart_creation_date__lte=timezone.now()).order_by('-chart_creation_date')[:5],
        'categories': Category.objects.all(), 'charts': result}

class CategoryView(generic.ListView):
    template_name = 'open_data_charts/category.html'
    context_object_name = 'chart_list'

    def get_queryset(self):
        query = self.request.GET.get('search')
        result = Chart.objects.all()
        if query:
            result = Chart.objects.filter(chart_title__contains=query)
        try:
            return {'categories': Category.objects.all(), 'specific_category': Category.objects.filter(cat_name=self.kwargs['cat'])[0], 'charts': result}
        except:
            return {'categories': Category.objects.all(), 'specific_category': Category.objects.filter(cat_name=self.kwargs['cat']), 'charts': result}

class ChartView(generic.DetailView):
    model = Chart
    template_name = 'open_data_charts/chart.html'
    
    def get_queryset(self):
        return Chart.objects.filter(chart_creation_date__lte = timezone.now())

    def get_context_data(self, **kwargs):
        query = self.request.GET.get('search')
        result = Chart.objects.all()
        if query:
            result = Chart.objects.filter(chart_title__contains=query)
        context = super(ChartView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['static_url'] = static(self.get_object().chart_filename)
        context['charts'] = result
        return context