from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'events', views.EventViewSet)
router.register(r'venues', views.VenueViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/venues/city/<str:city>/', views.venues_by_city, name='venues-by-city'),
    path('api/venues/all/', views.all_venues, name='all-venues'),
    path('api/cities/', views.cities_list, name='cities-list'),
    path('api/locations/', views.locations, name='locations'),
]