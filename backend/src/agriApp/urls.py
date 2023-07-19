from django.urls import include, path
from rest_framework import routers
from agriApp.views.Generale.GeneraleView import GenderStats, ZoneStats,LocalisationStats,PolygoneStats
from agriApp.views.UploadFileView import ExcelFileUploadView

app_name = 'agriApp'

router = routers.SimpleRouter()
router.register('upload-excel',ExcelFileUploadView,basename='upload-file')

urlpatterns = [
    path('', include(router.urls)),
    path('gender-stats/', GenderStats.as_view(),name='gender-stats'),
    path('zone-stats/',ZoneStats.as_view(),name='zone-stats'),
    path('localisation-stats/',LocalisationStats.as_view(),name='localisation-stats'),
    path('polygone-stats/',PolygoneStats.as_view(),name='polygone-stats'),
]
