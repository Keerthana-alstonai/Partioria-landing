from django.urls import path
from . import views

urlpatterns = [
    path('', views.MediaUploadListCreateView.as_view(), name='media-list-create'),
    path('<int:pk>/', views.MediaUploadDetailView.as_view(), name='media-detail'),
    path('upload/', views.upload_file, name='file-upload'),
]