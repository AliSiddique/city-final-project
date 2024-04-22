from .models import Image, LabelledImage,   LabelledImagesAnalytics, ImageComments
from rest_framework import serializers



# Image Serializer
class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image',"name","uploaded_at","isLabelled","tag")
        read_only_fields = ('user',)

# Labelled Image Serializer
class LabelledImageSerializer(serializers.ModelSerializer):
    # images = serializers.ReadOnlyField(source='image.image')
    class Meta:
        model = LabelledImage
        fields = "__all__"

# Labelled Image Serializer
class AnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabelledImagesAnalytics
        fields = ('id', 'amount',"created_at")
        read_only_fields = ('user',)


# Image Comment Serializer
class ImageCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageComments
        fields = ('id', 'image',"comment","created_at")
        read_only_fields = ('user',)