from django.urls import path
from . import views

app_name = 'open_data_charts'
urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('<str:cat>/', views.CategoryView.as_view(), name="category"),
    path('<str:cat>/<int:pk>/', views.ChartView.as_view(), name="chart")
]