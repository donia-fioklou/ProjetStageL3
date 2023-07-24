from rest_framework.viewsets import ModelViewSet
from agriApp.serializers.FileSerializers import  FileSerializer
from agriApp.models.File import File

from rest_framework import status
from rest_framework.response import Response


class ExcelFileUploadView(ModelViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()

    def create(self, request, *args, **kwargs):
        file_serializer = self.serializer_class(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)