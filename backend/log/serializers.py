from rest_framework import serializers
from .models import Log

# Log Serializer
class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = "__all__"
        read_only_fields = ["user"]