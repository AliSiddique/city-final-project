from django.db import models

# Create your models here.

class Image(models.Model):
    image = models.ImageField(upload_to="images/")
    name = models.CharField(max_length=255, null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    isLabelled = models.BooleanField(default=False)
  
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, null=True, blank=True)
    def formatted_uploaded_at(self):
        return self.uploaded_at.strftime("%Y-%m-%d %H:%M:%S")
    
    def __str__(self):
        return f"{self.name} - {self.uploaded_at}"
    
    

class ImageComments(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, null=True, blank=True)
    def formatted_created_at(self):
        return self.created_at.strftime("%Y-%m-%d %H:%M:%S")

class LabelledImage(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE,null=True, blank=True)
    labelled_image = models.ImageField(upload_to="images/",null=True, blank=True)
    label = models.CharField(max_length=255, null=True, blank=True)
    confidence = models.FloatField(null=True, blank=True)
    x = models.FloatField(null=True, blank=True)
    y = models.FloatField(null=True, blank=True)
    w = models.FloatField(null=True, blank=True)
    h = models.FloatField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)



class LabelledImagesAnalytics(models.Model):
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, null=True, blank=True)

    def formatted_created_at(self):
        return self.created_at.strftime("%Y-%m-%d")