from rest_framework import generics, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import MediaUpload
from .serializers import MediaUploadSerializer

class MediaUploadListCreateView(generics.ListCreateAPIView):
    queryset = MediaUpload.objects.all()
    serializer_class = MediaUploadSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def perform_create(self, serializer):
        file_obj = self.request.FILES.get('file')
        file_size = file_obj.size if file_obj else None
        serializer.save(
            uploaded_by=self.request.user if self.request.user.is_authenticated else None,
            file_size=file_size
        )

class MediaUploadDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MediaUpload.objects.all()
    serializer_class = MediaUploadSerializer
    parser_classes = [MultiPartParser, FormParser]

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    serializer = MediaUploadSerializer(data=request.data)
    if serializer.is_valid():
        file_obj = request.FILES.get('file')
        file_size = file_obj.size if file_obj else None
        media_upload = serializer.save(
            uploaded_by=request.user if request.user.is_authenticated else None,
            file_size=file_size
        )
        return Response(MediaUploadSerializer(media_upload).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)