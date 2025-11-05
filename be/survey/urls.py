from django.urls import path
from . import views

urlpatterns = [
    path('survey/', views.survey_list_create, name='survey-list-create'),
    path('survey/<int:pk>/', views.survey_detail, name='survey-detail'),
    path('survey/statistics/', views.survey_statistics, name='survey-statistics'),
    path('survey/export/', views.survey_export_csv, name='survey-export'),
]