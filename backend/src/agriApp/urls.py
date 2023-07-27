from django.urls import include, path
from rest_framework import routers
from agriApp.views.Generale.GeneraleView import GenderStats, NumberOfProducer, ZoneStats,LocalisationStats,PolygoneStats
from agriApp.views.UploadFileView import ExcelFileUploadView
from agriApp.views.filtre.filtre import FilterZoneCooperative

app_name = 'agriApp'

router = routers.SimpleRouter()
router.register('upload-excel',ExcelFileUploadView,basename='upload-file')

urlpatterns = [
    path('', include(router.urls)),
    path('number-of-producer/',NumberOfProducer.as_view(),name='number-of-producer'),
    path('filter-zone-cooperative/',FilterZoneCooperative.as_view(),name='filter-zone'),
    
    path('gender-stats/', GenderStats.as_view(),name='gender-stats'),
    path('zone-stats/',ZoneStats.as_view(),name='zone-stats'),
    path('localisation-stats/',LocalisationStats.as_view(),name='localisation-stats'),
    path('polygone-stats/',PolygoneStats.as_view(),name='polygone-stats'),
    
]
