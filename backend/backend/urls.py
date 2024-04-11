from django.contrib import admin
from django.urls import path
from accounts.urls import accounts_urlpatterns
from labelling.urls import labelling_urlpatterns
from log.urls import log_urlpatterns


urlpatterns = [
    path("admin/", admin.site.urls),
]
urlpatterns += accounts_urlpatterns
urlpatterns += labelling_urlpatterns
urlpatterns += log_urlpatterns