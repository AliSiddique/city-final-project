from .models import Image, LabelledImage
from rest_framework import serializers




class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('id', 'image',"name","uploaded_at")
        read_only_fields = ('user',)


class LabelledImageSerializer(serializers.ModelSerializer):
    images = serializers.ReadOnlyField(source='image.image')
    class Meta:
        model = LabelledImage
        fields = ('id', 'images',"labelled_image","uploaded_at")