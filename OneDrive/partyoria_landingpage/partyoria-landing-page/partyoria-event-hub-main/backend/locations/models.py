from django.db import models

class Location(models.Model):
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'locations'
        unique_together = ['state', 'city']
    
    def __str__(self):
        return f"{self.city}, {self.state}"