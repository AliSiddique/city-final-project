from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Log
from .serializers import LogSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(["GET"])
def get_logs(request):
    try:
        # Retrieve logs for the current user and order them by created_at in descending order
        users_logs = Log.objects.filter(user=request.user).order_by("-created_at")
        
        # Serialize the logs
        serialized_logs = LogSerializer(users_logs, many=True)
        
        return Response(serialized_logs.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
