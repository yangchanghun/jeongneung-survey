from django.urls import path
from . import views

urlpatterns = [
    path('', views.survey_list_create, name='survey-list-create'),
    path('<int:pk>/', views.survey_detail, name='survey-detail'),
    path('statistics/', views.survey_statistics, name='survey-statistics'),
    path('export/', views.survey_export_csv, name='survey-export'),
]