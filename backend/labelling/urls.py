from django.urls import path
from .views import label, UploadPhoto, get_users_photos, label_image, get_single_photo, search_photos, get_analytics

labelling_urlpatterns = [
    path("api/upload-image", label, name="upload_image"),
    path("api/photo",UploadPhoto.as_view(), name="photo"),
    path("api/users-photos", get_users_photos, name="users_photos"),
    path("api/label", label_image, name="label"),
    path("api/get-photo/<int:pk>", get_single_photo, name="get_photo"),
    path("api/search-photos", search_photos, name="search_photos"),
    path("api/analytics", get_analytics, name="analytics")
]