from django.urls import path
from . import views

urlpatterns = [
    path('api/locations/', views.LocationListView.as_view(), name='location-list'),
]