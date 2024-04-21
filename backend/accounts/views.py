from django.shortcuts import render
from rest_framework.decorators import api_view
from labelling.models import Image
from labelling.serializers import PhotoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Get users photos view function to get all photos uploaded by the user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users_photos(request):
    try:
        # Get the user object
        user = User.objects.get(username=request.user)
        # Get all the photos uploaded by the user
        photos = Image.objects.filter(user=user)
        # Serialize the photos
        serializer = PhotoSerializer(photos, many=True)
        # Return the serialized photos
        return Response(serializer.data)
    # Handle the case where the user does not exist
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    # Handle any other exceptions
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)