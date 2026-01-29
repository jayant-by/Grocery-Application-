from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import Report, JobLog
from .serializers import ReportSerializer, JobLogSerializer
from .tasks import generate_sales_report, generate_inventory_report


class ReportViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing reports
    """
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['post'])
    def generate_sales(self, request):
        """Trigger sales report generation"""
        task = generate_sales_report.delay()
        return Response({
            'message': 'Sales report generation started',
            'task_id': task.id
        }, status=status.HTTP_202_ACCEPTED)

    @action(detail=False, methods=['post'])
    def generate_inventory(self, request):
        """Trigger inventory report generation"""
        task = generate_inventory_report.delay()
        return Response({
            'message': 'Inventory report generation started',
            'task_id': task.id
        }, status=status.HTTP_202_ACCEPTED)


class JobLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing job logs
    """
    queryset = JobLog.objects.all()
    serializer_class = JobLogSerializer
    permission_classes = [IsAdminUser]
    
    def get_queryset(self):
        queryset = JobLog.objects.all()
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset
