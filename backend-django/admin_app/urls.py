from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, JobLogViewSet

router = DefaultRouter()
router.register(r'reports', ReportViewSet)
router.register(r'job-logs', JobLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
