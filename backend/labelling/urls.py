from django.urls import path
from .views import  UploadPhoto, label_image, get_single_photo, search_photos, add_comment,delete_photo,get_labelled_photos

labelling_urlpatterns = [
    path("api/photo",UploadPhoto.as_view(), name="photo"),
    path("api/label", label_image, name="label"),
    path("api/get-photo/<int:pk>", get_single_photo, name="get_photo"),
    path("api/search-photos", search_photos, name="search_photos"),
    path("api/add-comment",add_comment),
    path("api/delete-photo/<int:pk>", delete_photo, name="delete_photo"),
    path("api/get-labelled-image/", get_labelled_photos, name="get_labelled_image")
]