from django.shortcuts import render
from ultralytics import YOLO
from .functions import video_detection
import cv2
from django.http import JsonResponse
import requests
import numpy as np
from rest_framework.decorators import api_view
from .models import LabelledImage, Image
from django.core.files.base import ContentFile
from PIL import Image as PILImage
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.views import APIView
from io import BytesIO
from .serializers import PhotoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User



class UploadPhoto(APIView):
    serializer_class = Image
    # parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        print(request.user)
        user = User.objects.get(username=request.user)
        serializer = PhotoSerializer(data=request.data)
      
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

@api_view(['POST'])
def label(request):
    # Load YOLOv8 model
    images = request.data['image']
    print(images)
    model = YOLO("../yolov8m.pt")

    # Get image from URL
    image_url = "https://unsplash.com/photos/an-aerial-view-of-a-house-in-the-middle-of-a-forest-jydr6E3DvyI"
    response = requests.get(image_url)
    image_bytes = response.content
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    # Get predictions
    results = model.predict(source=image, save=True, save_txt=True) 
    # image = cv2.imdecode(results[0].orig_img, cv2.IMREAD_COLOR)
   
    
    for r in results:
        im_array = r.plot()  # plot a BGR numpy array of predictions
        im = PILImage.fromarray(im_array[..., ::-1])  
        print(im_array)
        print(im)
        im.show()  # show image
        im.save('results.jpg')  # save image
    image_io = BytesIO()
    im.save(image_io, format='JPEG')
    
    # Create InMemoryUploadedFile from BytesIO
    image_file = InMemoryUploadedFile(image_io, None, 'image.jpg', 'image/jpeg', image_io.tell(), None)
    
    ii = LabelledImage(image=Image.objects.first(),labelled_image=image_file, label="test", confidence=0.5, x=0.5, y=0.5, w=0.5, h=0.5)
    # ii.labelled_image.save("ad.png", ContentFile(im_array.tobytes()))



    ii.save()

    return JsonResponse({"results": "hi"})



@api_view(['GET'])
def get_users_photos(request):
    user = User.objects.get(username=request.user)
    photos = Image.objects.filter(user=user)
    serializer = PhotoSerializer(photos, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_single_photo(request, pk):
    photo = Image.objects.get(pk=pk)
    serializer = PhotoSerializer(photo)

    return Response(serializer.data)

@api_view(['POST'])
def label_image(request):
    # Load YOLOv8 model
    images = request.data['image']
    print(images)
    model = YOLO("../yolov8m.pt")

    # Get image from URL
    image_url = images
    response = requests.get(image_url)
    image_bytes = response.content
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    # Get predictions
    results = model.predict(source=image) 
    # image = cv2.imdecode(results[0].orig_img, cv2.IMREAD_COLOR)
   
    
    for r in results:
        im_array = r.plot()  # plot a BGR numpy array of predictions
        im = PILImage.fromarray(im_array[..., ::-1])  
        print(im_array)
        print(im)
    image_io = BytesIO()
    im.save(image_io, format='JPEG')
    
    # Create InMemoryUploadedFile from BytesIO
    image_file = InMemoryUploadedFile(image_io, None, 'image.jpg', 'image/jpeg', image_io.tell(), None)
    
    ii = LabelledImage(image=Image.objects.first(),labelled_image=image_file, label="test", confidence=0.5, x=0.5, y=0.5, w=0.5, h=0.5)
    # ii.labelled_image.save("ad.png", ContentFile(im_array.tobytes()))



    ii.save()
    labelled_image = ii.labelled_image.url

    return JsonResponse({"results": labelled_image})