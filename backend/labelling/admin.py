from django.contrib import admin
from .models import Image
from .models import LabelledImage, LabelledImagesAnalytics
# Register your models here.
admin.site.register(Image)
admin.site.register(LabelledImage)


admin.site.register(LabelledImagesAnalytics)