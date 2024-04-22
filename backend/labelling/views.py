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
from .serializers import PhotoSerializer,   LabelledImageSerializer,ImageCommentSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from log.models import Log
from django.core.mail import EmailMultiAlternatives
import uuid
import time
import datetime
    

# Upload multiple view class to handle multiple photo uploads    
class UploadMultiple(APIView):
    # Set the serializer class to Image
    serializer_class = Image
    # Loop through the uploaded files and create an instance of the Image model for each file
    def post(self, request, *args, **kwargs):
        images_dict = request.FILES
        for key in images_dict.keys():
            for image in images_dict.getlist(key):
                if request.data["name"]:
                    name = request.data["name"]
                else:
                    name = image.name + uuid.uuid4()[:5]   
                if request.data["description"]:
                    description = request.data["description"]   
                else:
                    description = image.name + " uploaded on" + str(datetime.datetime.now())  
                # Create an instance of the Image model for each uploaded file
                try:
                    Image.objects.create(name=name, description=description, image=image, user=request.user)
                    
                    # Create a log entry for the upload
                    Log.objects.create(log="image.uploaded", url="api/upload-multiple", method="POST", user=request.user)
                except Exception as e:
                    # Handle any errors that occur during image creation or log creation
                    print(f"An error occurred: {e}")

        return Response({"results": "Images uploaded successfully"})
 
        
# Upload photo view class to handle photo uploads
class UploadPhoto(APIView):
    # Set the serializer class to Image
    serializer_class = Image
    # Create an instance of the Image model for the uploaded file
    def post(self, request, *args, **kwargs):
        print(request.user)
        serializer = PhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            log_url = "/api/photo"
            Log.objects.create(log="image.uploaded",url=log_url,method="POST", user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
        


# Get single photo view function to get a single photo by id
@api_view(['GET'])
def get_single_photo(request, pk):
    try:
        # Get the photo by id
        photo = Image.objects.get(pk=pk)
        # Serialize the photo
        serializer = PhotoSerializer(photo)
        # Get the labelled image for the photo
        labelled_images = LabelledImage.objects.filter(image=photo).filter(isSegmented=False)
        # Get the comments for the photo
        labeled_photo = labelled_images.first().labelled_image.url if labelled_images else None # Get the labelled image URL
        comments = ImageComments.objects.filter(image=photo)
        # Get the segmented image for the photo
        segmented_images = LabelledImage.objects.filter(image=photo).filter(isSegmented=True).first().labelled_image.url if LabelledImage.objects.filter(image=photo).filter(isSegmented=True) else None

        return Response({"photo": serializer.data, "labelled_image": labeled_photo, "comments": comments.values(), "segmented_image": segmented_images})
    except Image.DoesNotExist:
        return Response({"error": "Photo does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)})



# Search photos view function to search for photos by name
@api_view(['GET'])
def search_photos(request):
    try:
        query = request.query_params.get('query')
        # Filter photos based on the query and user
        photos = Image.objects.filter(name__icontains=query).filter(user=request.user)
        # Serialize the queryset
        serializer = PhotoSerializer(photos, many=True)
        # Return the serialized data in a response
        return Response(serializer.data)
    except Exception as e:
        # Handle any errors that occur during the process
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Label image view function to label an image
@api_view(['POST'])
def label_image(request):
    try:
        # Get the image id and image URL from the request data
        id = request.data['id']
        # Load YOLOv8 model
        model = YOLO("../yolov8n.pt")
        image_url = request.data['image']
        # Get the image from the URL
        response = requests.get(image_url)
        image_bytes = response.content
        # Convert the image to a numpy array
        image_array = np.frombuffer(image_bytes, dtype=np.uint8)
        # Decode the image
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        start_time = time.time()

        results = model.predict(source=image) 
        end_time = time.time()

        prediction_time = end_time - start_time
        # Loop through the results and plot the bounding boxes
        for r in results:
            im_array = r.plot() 
            im = PILImage.fromarray(im_array[..., ::-1])  
        # Save the image to a BytesIO object    
        image_io = BytesIO()
        # Save the image to the BytesIO object
        im.save(image_io, format='JPEG')
        # Get the image by id
        image_num = Image.objects.get(pk=id)
        log_url = "/api/label"
        user=User.objects.get(username=request.user)
        Log.objects.create(log="image.labelled.success",url=log_url,method="GET", user=user)
        
        # Create InMemoryUploadedFile from BytesIO
        image_file = InMemoryUploadedFile(image_io, None, 'image.jpg', 'image/jpeg', image_io.tell(), None)
        # Create an instance of the LabelledImagesAnalytics model
        analytics =LabelledImagesAnalytics.objects.create(amount=1, user=User.objects.get(username=request.user))
        analytics.save()
        
        saved_image = LabelledImage(image=image_num,labelled_image=image_file, label="test")


        saved_image.save()
        subject, from_email, to = "hello", "alisiddique10@hotmail.com", user.email
        text_content = "Your image has been labelled."
        html_content = f"<div> <img src={saved_image.labelled_image.url} /> is an <strong>important</strong> message.</div>"
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        # Update the image to be labelled
        image_num.isLabelled = True
        image_num.tag = "labelled"
        image_num.save()
        # Get the URL of the labelled image
        labelled_image = saved_image.labelled_image.url
        # Return the URL of the labelled image
        return JsonResponse({"results": labelled_image})
    except Image.DoesNotExist:
        return Response({"error": "Image does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Add comment view function to add a comment to a photo
@api_view(['POST'])
def add_comment(request):
    try:
        # Extract data from the request
        image_id = request.data.get('id')
        comment = request.data.get('comment')
        
        # Retrieve the image and user objects
        image = Image.objects.get(pk=image_id)
        user = User.objects.get(username=request.user)
        
        # Create a log entry for the comment
        Log.objects.create(log="image.comment", url="/api/comment", method="POST", user=user)
        
        # Create and save the ImageComments instance
        ic = ImageComments(image=image, comment=comment, user=user)
        ic.save()
        
        # Serialize the ImageComments instance
        serializer = ImageCommentSerializer(ic)
        
        # Return the serialized data in a response
        return Response({"data": serializer.data})
    except Exception as e:
        # Handle any errors that occur during the process
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Delete photo view function to delete a photo by id
@api_view(['DELETE'])
def delete_photo(request, pk):
    try:
        # Get the image by id
        image = Image.objects.get(id=pk)
        # Delete the image
        image.delete()
        # Create a log entry for the deletion
        Log.objects.create(log="image.deleted",url="/api/photo",method="DELETE", user=request.user)
        # Return a response
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
        
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# Segment image view function to segment an image
@api_view(['POST'])
def segment_image(request):
    try:
        # Get the image id and image URL from the request data
        id = request.data['id']
        # Load YOLOv8 model
        model = YOLO("../yolov8n-seg.pt")
        image_url = request.data['image']
        response = requests.get(image_url)
        image_bytes = response.content
        # Convert the image to a numpy array
        image_array = np.frombuffer(image_bytes, dtype=np.uint8)
        # Decode the image
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        start_time = time.time()
        # Predict the image
        results = model.predict(source=image) 
        end_time = time.time()

        prediction_time = end_time - start_time
        # Loop through the results and plot the bounding boxes
        for r in results:
            im_array = r.plot() 
            im = PILImage.fromarray(im_array[..., ::-1])  
        # Save the image to a BytesIO object
        image_io = BytesIO()
        # Save the image to the BytesIO object
        im.save(image_io, format='JPEG')
        # Get the image by id
        image_num = Image.objects.get(pk=id)
        log_url = "/api/label"
        user=User.objects.get(username=request.user)
        # Create a log entry for the upload
        Log.objects.create(log="image.labelled.success",url=log_url,method="POST", user=user)
        
        # Create InMemoryUploadedFile from BytesIO
        image_file = InMemoryUploadedFile(image_io, None, 'image.jpg', 'image/jpeg', image_io.tell(), None)
        # Create an instance of the LabelledImagesAnalytics model
        analytics =LabelledImagesAnalytics.objects.create(amount=1, user=User.objects.get(username=request.user))
        analytics.save()
        
        saved_image = LabelledImage(image=image_num,labelled_image=image_file, label="test", confidence=0.5,isSegmented=True, prediction_time=prediction_time)

        saved_image.save()
        subject, from_email, to = "Segmented Model", "alisiddique10@hotmail.com", user.email
        text_content = "Your image has been segmented."
        html_content = f"""
        <div>
            <img src="{saved_image.labelled_image.url}" />
            <p><strong>This is an important message.</strong></p>
        </div>
        """        
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        image_num.isLabelled = True
        image_num.tag = "labelled"

        image_num.save()
        labelled_image = saved_image.labelled_image.url

        return JsonResponse({"results": labelled_image})
    except Image.DoesNotExist:
        return Response({"error": "Image does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Get segmented photos view function to get all segmented photos
@api_view(['POST'])
def label_all(request):
    try:
        user=User.objects.get(username=request.user)
        # Get all images that are not labelled
        images = Image.objects.filter(isLabelled=False).filter(user=user)
        # Loop through the images and label them
        for image in images:
            # Load YOLOv8 model
            model = YOLO("../yolov8n.pt")
            # Get the image URL
            image_url = image.image.url
            response = requests.get(image_url)
            image_bytes = response.content
            # Convert the image to a numpy array
            image_array = np.frombuffer(image_bytes, dtype=np.uint8)
            # Decode the image
            image_decoded = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            # Predict the image
            results = model.predict(source=image_decoded) 

            # Loop through the results and plot the bounding boxes
            for r in results:
                im_array = r.plot() 
                im = PILImage.fromarray(im_array[..., ::-1])  
            # Save the image to a BytesIO object
            image_io = BytesIO()
            # Save the image to the BytesIO object
            im.save(image_io, format='JPEG')
            image_num = Image.objects.get(pk=image.id)
            log_url = "/api/label"
            # Create a log entry for the upload
            Log.objects.create(log="image.labelled.success",url=log_url,method="POST", user=user)
            
            # Create InMemoryUploadedFile from BytesIO
            image_file = InMemoryUploadedFile(image_io, None, 'image.jpg', 'image/jpeg', image_io.tell(), None)
            # Create an instance of the LabelledImagesAnalytics model
            analytics =LabelledImagesAnalytics.objects.create(amount=1, user=User.objects.get(username=request.user))
            analytics.save()
            
            saved_image = LabelledImage(image=image_num,labelled_image=image_file, label="test")


            saved_image.save()
            image_num.isLabelled = True
            image_num.tag = "labelled"
            image_num.save()
            labelled_image = saved_image.labelled_image.url

        subject, from_email, to = "Images Labelled", "alisiddique10@hotmail.com", user.email
        text_content = "Hi there, all images have been labelled successfully."
        html_content = f"<div> All images have been labelled successfully.</div>"
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return JsonResponse({"results": "Images labelled successfully"})
    except Image.DoesNotExist:
        return Response({"error": "Image does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        Log.objects.create(log="image.labelled.failed",url="/api/label",method="POST", user=user)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    




