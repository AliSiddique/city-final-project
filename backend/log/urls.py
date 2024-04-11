from django.urls import path
from .views import get_logs

log_urlpatterns = [
    path("api/users-logs", get_logs, name="logs"),
]