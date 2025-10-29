from rest_framework import serializers
from .models import MediaUpload

class MediaUploadSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = MediaUpload
        fields = ['id', 'title', 'description', 'file', 'file_url', 'media_type', 
                 'file_size', 'uploaded_by', 'uploaded_by_name', 'event', 'created_at']
        read_only_fields = ['id', 'file_size', 'created_at']
    
    def get_file_url(self, obj):
        if obj.file:
            return obj.file.url
        return None