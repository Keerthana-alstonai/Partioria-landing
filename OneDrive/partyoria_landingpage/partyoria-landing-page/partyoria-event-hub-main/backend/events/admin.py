from django.contrib import admin
from .models import Event, EventGuest

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'status', 'date', 'organizer', 'attendees_count']
    list_filter = ['event_type', 'status', 'date']
    search_fields = ['title', 'description', 'location']

@admin.register(EventGuest)
class EventGuestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'event', 'rsvp_status']
    list_filter = ['rsvp_status', 'event']