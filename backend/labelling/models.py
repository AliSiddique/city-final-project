from django.db import models

# Create your models here.

class Image(models.Model):
    image = models.ImageField(upload_to="images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
  
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, null=True, blank=True)


class LabelledImage(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    labelled_image = models.ImageField(upload_to="images/",null=True, blank=True)
    label = models.CharField(max_length=255)
    confidence = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    w = models.FloatField()
    h = models.FloatField()
    uploaded_at = models.DateTimeField(auto_now_add=True)


