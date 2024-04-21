from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from accounts.models import UserProfile

# User profile serializer
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("plan",)

# Add the user profile to the user serializer
class UserSerializer(UserDetailsSerializer):

    profile = UserProfileSerializer()

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ("profile",)
