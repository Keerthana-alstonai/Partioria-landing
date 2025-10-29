from django.urls import path
from .views import VenueListView

urlpatterns = [
    path('api/venue-details/', VenueListView.as_view(), name='venue-details-list'),
]