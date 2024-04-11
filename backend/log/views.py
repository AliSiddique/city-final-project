from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Log
from .serializers import LogSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def get_logs(request):
    users_logs = Log.objects.filter(user=request.user)
    serialized_logs = LogSerializer(users_logs, many=True)
    return Response(serialized_logs.data)
    