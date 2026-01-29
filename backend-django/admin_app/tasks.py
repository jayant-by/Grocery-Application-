from celery import shared_task
from django.utils import timezone
from .models import JobLog, Report
import time


@shared_task
def example_periodic_task():
    """
    Example periodic task that runs every hour
    """
    print("Running periodic task...")
    return "Periodic task completed"


@shared_task
def generate_sales_report():
    """
    Background task to generate sales report
    """
    job_log = JobLog.objects.create(
        job_name='Generate Sales Report',
        status='running'
    )
    
    try:
        # Simulate report generation
        time.sleep(2)
        
        report_data = {
            'total_sales': 15000,
            'orders_count': 150,
            'average_order_value': 100,
            'top_products': [
                {'name': 'Product 1', 'sales': 5000},
                {'name': 'Product 2', 'sales': 3000},
            ]
        }
        
        report = Report.objects.create(
            title=f'Sales Report - {timezone.now().strftime("%Y-%m-%d")}',
            report_type='sales',
            data=report_data,
            created_by='System'
        )
        
        job_log.status = 'completed'
        job_log.completed_at = timezone.now()
        job_log.result = {'report_id': str(report._id)}
        job_log.save()
        
        return f'Sales report generated successfully: {report._id}'
        
    except Exception as e:
        job_log.status = 'failed'
        job_log.error_message = str(e)
        job_log.completed_at = timezone.now()
        job_log.save()
        raise


@shared_task
def generate_inventory_report():
    """
    Background task to generate inventory report
    """
    job_log = JobLog.objects.create(
        job_name='Generate Inventory Report',
        status='running'
    )
    
    try:
        # Simulate report generation
        time.sleep(2)
        
        report_data = {
            'total_products': 500,
            'low_stock_items': 25,
            'out_of_stock': 5,
            'categories': [
                {'name': 'Electronics', 'count': 150},
                {'name': 'Clothing', 'count': 200},
            ]
        }
        
        report = Report.objects.create(
            title=f'Inventory Report - {timezone.now().strftime("%Y-%m-%d")}',
            report_type='inventory',
            data=report_data,
            created_by='System'
        )
        
        job_log.status = 'completed'
        job_log.completed_at = timezone.now()
        job_log.result = {'report_id': str(report._id)}
        job_log.save()
        
        return f'Inventory report generated successfully: {report._id}'
        
    except Exception as e:
        job_log.status = 'failed'
        job_log.error_message = str(e)
        job_log.completed_at = timezone.now()
        job_log.save()
        raise
