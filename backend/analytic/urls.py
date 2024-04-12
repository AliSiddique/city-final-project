from django.urls import path
from .views import get_analytics
analytics_urlpatterns = [
    path("api/analytics", get_analytics, name="analytics"),

]