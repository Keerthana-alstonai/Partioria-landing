from django.contrib import admin
from .models import Location

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('city', 'state')
    list_filter = ('state',)
    search_fields = ('city', 'state')
    ordering = ('state', 'city')