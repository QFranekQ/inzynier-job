# pages/urls.py
from django.urls import path, re_path
from . import views
from django.shortcuts import render


urlpatterns = [
    path("", views.index, name="index"),
    re_path(
         r'login', views.LoginUser),
    re_path(
         r'register', views.RegisterUser),
     re_path(
         r'save', views.ConfirmCards),
     re_path(
         r'load', views.LoadCards),
    re_path(
         r'update', views.Changecards),
]