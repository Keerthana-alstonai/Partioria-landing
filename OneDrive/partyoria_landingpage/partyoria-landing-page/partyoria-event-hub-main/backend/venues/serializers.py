from rest_framework import serializers
from .models import VenueDetails

class VenueDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VenueDetails
        fields = ['id', 'venue_name', 'location', 'capacity', 'price_range', 'image_url', 'description', 'created_at']