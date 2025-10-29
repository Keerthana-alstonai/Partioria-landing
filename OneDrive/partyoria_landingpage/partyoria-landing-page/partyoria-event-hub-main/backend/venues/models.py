from django.db import models

class VenueDetails(models.Model):
    venue_name = models.TextField()
    location = models.TextField()
    capacity = models.IntegerField()
    price_range = models.TextField()
    image_url = models.TextField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'venue_details'
    
    def __str__(self):
        return self.venue_name