from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Event, Venue
from .serializers import EventSerializer, VenueSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

@api_view(['GET'])
def venues_by_city(request, city):
    """Get venues by city name"""
    venues = Venue.objects.filter(city__iexact=city)
    serializer = VenueSerializer(venues, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def all_venues(request):
    """Get all venues grouped by city"""
    venues = Venue.objects.all().order_by('city', 'name')
    
    # Group venues by city
    venues_by_city = {}
    for venue in venues:
        if venue.city not in venues_by_city:
            venues_by_city[venue.city] = []
        venues_by_city[venue.city].append(VenueSerializer(venue).data)
    
    return Response(venues_by_city)

@api_view(['GET'])
def cities_list(request):
    """Get list of all cities with venues"""
    cities = Venue.objects.values_list('city', flat=True).distinct().order_by('city')
    return Response(list(cities))

@api_view(['GET'])
def locations(request):
    """Get states and cities data from locations table"""
    from locations.models import Location
    
    try:
        # Get all states
        states = Location.objects.values_list('state', flat=True).distinct().order_by('state')
        
        # Get cities grouped by state
        cities_by_state = {}
        for state in states:
            cities = Location.objects.filter(state=state).values_list('city', flat=True).order_by('city')
            cities_by_state[state] = list(cities)
        
        # Get popular cities (first 15 cities alphabetically)
        popular_cities = Location.objects.values_list('city', flat=True).distinct().order_by('city')[:15]
        
        return Response({
            'states': list(states),
            'cities_by_state': cities_by_state,
            'popular_cities': list(popular_cities)
        })
        
    except Exception as e:
        return Response({
            'error': f'Failed to fetch locations: {str(e)}',
            'states': [],
            'cities_by_state': {},
            'popular_cities': []
        }, status=500)