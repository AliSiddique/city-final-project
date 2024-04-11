from django.db import models

OPTIONS = (
    ("image.uploaded", "Image Uploaded"),
    ("image.labelled.success", "Image Labelled Successfully"),
    ("image.comment", "Image Commented"),
    ("image.analytics", "Image Analytics"),
    ("image.delete", "Image Deleted"),
    ("image.labelled.failed", "Failed to Label Image"),
)
method_options = (
    ("GET", "GET"),
    ("POST", "POST"),
    ("PUT", "PUT"),
    ("DELETE", "DELETE"),
    ("PATCH", "PATCH"),
    ("OPTIONS", "OPTIONS"),

)
class Log(models.Model):
    log = models.CharField(max_length=255, choices=OPTIONS)
    created_at = models.DateTimeField(auto_now_add=True)
    url = models.CharField(max_length=255,null=True, blank=True)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    method = models.CharField(max_length=255,choices=method_options, null=True, blank=True)

    def formatted_created_at(self):
        return self.created_at.strftime("%Y-%m-%d %H:%M:%S")

    def __str__(self):
        return f"{self.log} - {self.created_at}"
