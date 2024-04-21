from django.urls import path
from .views import  UploadPhoto, label_image, get_single_photo, search_photos, add_comment,delete_photo,get_labelled_photos,UploadMultiple,segment_image,label_all

labelling_urlpatterns = [
    path("api/photo",UploadPhoto.as_view(), name="photo"),
    path("api/label", label_image, name="label"),
    path("api/segment-image", segment_image, name="segment_image"),
    path("api/get-photo/<int:pk>", get_single_photo, name="get_photo"),
    path("api/search-photos", search_photos, name="search_photos"),
    path("api/add-comment",add_comment),
    path("api/delete-photo/<int:pk>", delete_photo, name="delete_photo"),
    path("api/get-labelled-image/", get_labelled_photos, name="get_labelled_image"),
    path("api/upload-multiple", UploadMultiple.as_view(), name="upload_multiple_images"),
    path("api/label-all",label_all, name="label_all_images"),
]