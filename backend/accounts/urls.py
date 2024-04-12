from django.conf.urls import include
from django.urls import path
from .views import get_users_photos

accounts_urlpatterns = [
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/register/", include("dj_rest_auth.registration.urls")),
    path("api/users-photos", get_users_photos, name="users_photos"),

]