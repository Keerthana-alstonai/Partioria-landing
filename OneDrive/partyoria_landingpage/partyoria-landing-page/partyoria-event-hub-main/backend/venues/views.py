from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Q
from .models import VenueDetails
from .serializers import VenueDetailsSerializer

class VenueListView(generics.ListAPIView):
    serializer_class = VenueDetailsSerializer
    
    def get_queryset(self):
        queryset = VenueDetails.objects.all()
        city = self.request.query_params.get('city', None)
        if city:
            queryset = queryset.filter(location__icontains=city)
        return queryset
