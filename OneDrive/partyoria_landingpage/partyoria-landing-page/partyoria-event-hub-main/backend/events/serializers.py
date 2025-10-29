from rest_framework import serializers
from .models import Event, Venue, EventGuest

class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'

class EventGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventGuest
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    guests = EventGuestSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'