from django.urls import path
from . import views

# Mounted under /api/ in core/urls.py
urlpatterns = [
    path("students/", views.student_list),  # GET all, POST new
    path("students/<int:pk>/", views.student_detail),  # GET, PUT, DELETE one
]
