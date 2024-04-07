from django.contrib import admin
from .models import Image
from .models import LabelledImage
# Register your models here.
admin.site.register(Image)
admin.site.register(LabelledImage)