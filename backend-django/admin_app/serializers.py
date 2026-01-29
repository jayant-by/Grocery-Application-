from rest_framework import serializers
from .models import Report, JobLog


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'title', 'report_type', 'data', 'created_at', 'created_by']
        read_only_fields = ['id', 'created_at']


class JobLogSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = JobLog
        fields = ['id', 'job_name', 'status', 'started_at', 'completed_at', 
                  'error_message', 'result', 'duration']
        read_only_fields = ['id', 'started_at']

    def get_duration(self, obj):
        if obj.completed_at and obj.started_at:
            delta = obj.completed_at - obj.started_at
            return delta.total_seconds()
        return None
