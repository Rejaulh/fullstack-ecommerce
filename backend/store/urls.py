from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


urlpatterns = [
    path('register/', views.register_user, name='register'),
    # path('login/', views.login_user, name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', views.get_products, name='product_list'),
    path('products/<int:pk>/', views.get_product, name='product_details'),
    path('categories/', views.get_categories, name='categories_list'),
    path('cart/', views.get_cart, name='cart_details'),
    path('cart/add/', views.add_to_cart, name='addtocart'),
    path('cart/remove/', views.remove_from_cart, name='remove_cart'),
    path('cart/update/', views.update_cart_quantity, name='update_cart'),
    path('cart/order/', views.create_order, name='order-item'),
]