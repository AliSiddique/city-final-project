from django.shortcuts import render
from ultralytics import YOLO
from .functions import video_detection
import cv2
from django.http import JsonResponse
import requests
import numpy as np
from rest_framework.decorators import api_view
from .models import LabelledImage, Image, LabelledImagesAnalytics, ImageComments
from django.core.files.base import ContentFile
from PIL import Image as PILImage
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.views import APIView
from io import BytesIO
from .serializers import PhotoSerializer,   LabelledImageSerializer, AnalyticsSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count
from django.db.models.functions import TruncDate
from datetime import datetime
from django.db.models import Sum
from log.models import Log
from django.core.mail import EmailMessage
from django.core.mail import EmailMultiAlternatives




class UploadPhoto(APIView):
    serializer_class = Image

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
    labelled_images = LabelledImage.objects.filter(image=photo)
    labeled_photo = labelled_images.first().labelled_image.url if labelled_images else None
    comments = ImageComments.objects.filter(image=photo)

    return Response({"photo": serializer.data, "labelled_image":labeled_photo, "comments": comments.values()})

    # return Response(serializer.data)
@api_view(['GET'])
def get_analytics(request):
    user = User.objects.get(username=request.user)
    # Calculate the date 7 days ago from today
    seven_days_ago = timezone.now() - timedelta(days=7)
    
    # Get analytics data for the last 7 days
    analytics = LabelledImagesAnalytics.objects.filter(
        user=user,
        created_at__gte=seven_days_ago
    ).annotate(
        date=TruncDate('created_at')
    ).values('date').annotate(
        total_amount=Count('*')
    ).order_by('-date')
    
    today = timezone.now().date()
    yesterday = today - timedelta(days=1)
    day_before_yesterday = yesterday - timedelta(days=1)
    today = LabelledImagesAnalytics.objects.filter(
        user=user,
        created_at__lte=today
    ).count()
    print(today)
   
    yesterday = LabelledImagesAnalytics.objects.filter(
        user=user,
        created_at__lte=yesterday
    ).count()

    difference_from_yesterday =  today - yesterday
    print(f"differece {difference_from_yesterday}")
    # Calculate the difference between yesterday and the day before yesterday
    # Create a list of dates for the last 7 days
    date_list = [(seven_days_ago + timedelta(days=x)).date() for x in range(7)]

    # Convert the dates to string in the same format as in the analytics data
    date_strings = [date.strftime("%Y-%m-%d") for date in date_list]

    # Create a dictionary to store the analytics data for each date
    # Create a dictionary to store the analytics data for each date
    analytics_dict = {entry['date']: entry['total_amount'] for entry in analytics}

    # Populate missing dates with 0 total_amount
    for date_string in date_strings:
        if date_string not in analytics_dict:
            analytics_dict[date_string] = 0

    # Create a list of dictionaries containing date and total_amount
    analytics_data = [{'date': date, 'total_amount': total_amount} for date, total_amount in analytics_dict.items()]


    return Response({"analytics": analytics_data})


@api_view(['GET'])
def search_photos(request):
    query = request.query_params.get('query')
    photos = Image.objects.filter(name__icontains=query)
    serializer = PhotoSerializer(photos, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def label_image(request):
    # Load YOLOv8 model
    id = request.data['id']
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
    image_num = Image.objects.get(pk=id)
    log_url = "/api/label"
    Log.objects.create(log="image.labelled.success",url=log_url,method="GET", user=User.objects.get(username=request.user))
    
    # Create InMemoryUploadedFile from BytesIO
    image_file = InMemoryUploadedFile(image_io, None, 'image.jpg', 'image/jpeg', image_io.tell(), None)
    ijs =LabelledImagesAnalytics.objects.create(amount=1, user=User.objects.get(username=request.user))
    ijs.save()
    # email = EmailMessage("ali", "Your image was just labelled", to=["alisiddique0402@gmail.com"], from_email='alisiddique10@hotmail.com',body=`<img src="https://unsplash.com/photos/an-aerial-view-of-a-house-in-the-middle-of-a-forest-jydr6E3DvyI">`)
    # email.send()
    
    ii = LabelledImage(image=image_num,labelled_image=image_file, label="test", confidence=0.5, x=0.5, y=0.5, w=0.5, h=0.5)
    # ii.labelled_image.save("ad.png", ContentFile(im_array.tobytes()))

    subject, from_email, to = "hello", "alisiddique10@hotmail.com", "alisiddique0402@gmail.com"
    text_content = "This is an important message."
    html_content = f"<div> <img src={ii.labelled_image.url} /> is an <strong>important</strong> message.</div>"
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

    ii.save()
    image_num.isLabelled = True
    image_num.save()
    labelled_image = ii.labelled_image.url

    return JsonResponse({"results": labelled_image})



@api_view(['POST'])
def add_comment(request):
    image_id = request.data['id']
    comment = request.data['comment']
    image = Image.objects.get(pk=image_id)
    user = User.objects.get(username=request.user)
    ic = ImageComments(image=image, comment=comment, user=user)
    ic.save()

    return JsonResponse({"results": "Comment added"})



@api_view(['DELETE'])
def delete_photo(request, pk):
    image = Image.objects.get(id=pk)
    image.delete()

    return JsonResponse({"results": "Photo deleted"})



@api_view(['GET'])
def get_labelled_photos(request):
    labelled_photos = LabelledImage.objects.filter(image__user=request.user)
    serializer = LabelledImageSerializer(labelled_photos, many=True)
    labelled_images = [labelled.labelled_image.url for labelled in labelled_photos]


    return Response({"labelled_images": labelled_images})