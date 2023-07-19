from rest_framework.viewsets import ModelViewSet
from agriApp.serializers.FileSerializers import  FileSerializer
from agriApp.models.File import File

class ExcelFileUploadView(ModelViewSet):
    serializer_class=FileSerializer
    queryset=File.objects.all()