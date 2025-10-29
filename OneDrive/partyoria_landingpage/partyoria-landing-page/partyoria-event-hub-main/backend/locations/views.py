from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Location

class LocationListView(APIView):
    def get(self, request):
        locations = Location.objects.all()
        
        # Group cities by state
        cities_by_state = {}
        popular_cities = []
        
        for location in locations:
            if location.state not in cities_by_state:
                cities_by_state[location.state] = []
            cities_by_state[location.state].append(location.city)
            
            if location.is_popular:
                popular_cities.append(location.city)
        
        return Response({
            'cities_by_state': cities_by_state,
            'popular_cities': popular_cities
        })