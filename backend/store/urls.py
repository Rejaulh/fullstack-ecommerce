from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='product_list'),
    path('products/<int:pk>/', views.get_product, name='product_details'),
    path('categories/', views.get_categories, name='categories_list'),
    path('cart/', views.get_cart, name='cart_details'),
    path('cart/add/', views.add_to_cart, name='addtocart'),
    path('cart/remove/', views.remove_from_cart, name='remove_cart'),
    path('cart/update/', views.update_cart_quantity, name='update_cart'),
]