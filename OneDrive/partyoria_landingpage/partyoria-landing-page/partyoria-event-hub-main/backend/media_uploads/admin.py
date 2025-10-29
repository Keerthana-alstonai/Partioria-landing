from django.contrib import admin
from .models import MediaUpload

@admin.register(MediaUpload)
class MediaUploadAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type', 'uploaded_by', 'event', 'file_size', 'created_at']
    list_filter = ['media_type', 'created_at']
    search_fields = ['title', 'description']