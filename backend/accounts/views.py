from django.shortcuts import render
from rest_framework.decorators import api_view
from labelling.models import Image
from labelling.serializers import PhotoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User


# Create your views here.
# Get users photos view function to get all photos uploaded by the user
@api_view(['GET'])
def get_users_photos(request):
    try:
        user = User.objects.get(username=request.user)
        photos = Image.objects.filter(user=user)
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)