from django.urls import path

from clothyapp.views import clothy

urlpatterns = [
    path('',clothy)
]
