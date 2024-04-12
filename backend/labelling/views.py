from ultralytics import YOLO
import cv2
from django.http import JsonResponse
import requests
import numpy as np
from rest_framework.decorators import api_view
from .models import LabelledImage, Image, LabelledImagesAnalytics, ImageComments
from PIL import Image as PILImage
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.views import APIView
from io import BytesIO
from .serializers import PhotoSerializer,   LabelledImageSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from log.models import Log
from django.core.mail import EmailMultiAlternatives



# Upload photo view class to handle photo uploads
class UploadPhoto(APIView):
    serializer_class = Image

    def post(self, request, *args, **kwargs):
        print(request.user)
        serializer = PhotoSerializer(data=request.data)
      
        if serializer.is_valid():
            serializer.save(user=request.user)
            log_url = "/api/photo"
            Log.objects.create(log="image.uploaded",url=log_url,method="GET", user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
        


# Get single photo view function to get a single photo by id
@api_view(['GET'])
def get_single_photo(request, pk):
    try:
        photo = Image.objects.get(pk=pk)
        serializer = PhotoSerializer(photo)
        labelled_images = LabelledImage.objects.filter(image=photo)
        labeled_photo = labelled_images.first().labelled_image.url if labelled_images else None
        comments = ImageComments.objects.filter(image=photo)

        return Response({"photo": serializer.data, "labelled_image": labeled_photo, "comments": comments.values()})
    
    except Image.DoesNotExist:
        return Response({"error": "Photo does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Search photos view function to search for photos by name
@api_view(['GET'])
def search_photos(request):
    query = request.query_params.get('query')
    photos = Image.objects.filter(name__icontains=query)
    serializer = PhotoSerializer(photos, many=True)

    return Response(serializer.data)

# Get all photos view function to get all photos uploaded by all users
@api_view(['POST'])
def label_image(request):
    try:
    # Load YOLOv8 model
        id = request.data['id']
        model = YOLO("../yolov8n-seg.pt")
        image_url = request.data['image']
        response = requests.get(image_url)
        image_bytes = response.content
        image_array = np.frombuffer(image_bytes, dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        results = model.predict(source=image) 
    
        
        for r in results:
            im_array = r.plot() 
            im = PILImage.fromarray(im_array[..., ::-1])  
        image_io = BytesIO()
        im.save(image_io, format='JPEG')
        image_num = Image.objects.get(pk=id)
        log_url = "/api/label"
        user=User.objects.get(username=request.user)
        Log.objects.create(log="image.labelled.success",url=log_url,method="GET", user=user)
        
        # Create InMemoryUploadedFile from BytesIO
        image_file = InMemoryUploadedFile(image_io, None, 'image.jpg', 'image/jpeg', image_io.tell(), None)
        ijs =LabelledImagesAnalytics.objects.create(amount=1, user=User.objects.get(username=request.user))
        ijs.save()
        
        ii = LabelledImage(image=image_num,labelled_image=image_file, label="test", confidence=0.5, x=0.5, y=0.5, w=0.5, h=0.5)


        ii.save()
        subject, from_email, to = "hello", "alisiddique10@hotmail.com", user.email
        text_content = "This is an important message."
        html_content = f"<div> <img src={ii.labelled_image.url} /> is an <strong>important</strong> message.</div>"
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        image_num.isLabelled = True
        image_num.tag = "labelled"

        image_num.save()
        labelled_image = ii.labelled_image.url

        return JsonResponse({"results": labelled_image})
    except Image.DoesNotExist:
        return Response({"error": "Image does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Add comment view function to add a comment to a photo
@api_view(['POST'])
def add_comment(request):
    image_id = request.data['id']
    comment = request.data['comment']
    image = Image.objects.get(pk=image_id)
    user = User.objects.get(username=request.user)
    Log.objects.create(log="image.comment",url="/api/comment",method="POST", user=user)   
    ic = ImageComments(image=image, comment=comment, user=user)
    ic.save()

    return JsonResponse({"results": "Comment added"})


# Delete photo view function to delete a photo by id
@api_view(['DELETE'])
def delete_photo(request, pk):
    try:
        image = Image.objects.get(id=pk)
        image.delete()
        Log.objects.create(log="image.deleted",url="/api/photo",method="DELETE", user=request.user)
        return JsonResponse({"results": "Photo deleted"})
    
    except Image.DoesNotExist:
        return Response({"error": "Photo does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get labelled photos view function to get all labelled photos
@api_view(['GET'])
def get_labelled_photos(request):
    try:
        # Get labelled photos for the current user
        labelled_photos = LabelledImage.objects.filter(image__user=request.user)
        
        # Serialize the labelled photos
        serializer = LabelledImageSerializer(labelled_photos, many=True)
        
        # Extract the URLs of labelled images
        labelled_images = [labelled.labelled_image.url for labelled in labelled_photos]

        return Response({"labelled_images": labelled_images})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)