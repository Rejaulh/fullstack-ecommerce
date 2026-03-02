from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='product_list'),
    path('products/<int:pk>/', views.get_product, name='product_details'),
    path('categories/', views.get_categories, name='categories_list'),
]