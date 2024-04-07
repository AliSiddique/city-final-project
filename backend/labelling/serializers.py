from .models import Image
from rest_framework import serializers


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image')
        read_only_fields = ('user',)