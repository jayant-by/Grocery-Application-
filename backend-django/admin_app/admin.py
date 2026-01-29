from django.contrib import admin
from .models import Report, JobLog


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['title', 'report_type', 'created_by', 'created_at']
    list_filter = ['report_type', 'created_at']
    search_fields = ['title', 'created_by']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'


@admin.register(JobLog)
class JobLogAdmin(admin.ModelAdmin):
    list_display = ['job_name', 'status', 'started_at', 'completed_at']
    list_filter = ['status', 'started_at']
    search_fields = ['job_name', 'error_message']
    readonly_fields = ['started_at', 'completed_at']
    date_hierarchy = 'started_at'
    
    def has_add_permission(self, request):
        # Don't allow manual creation of job logs
        return False
