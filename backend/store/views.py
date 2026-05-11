from django.shortcuts import render
# from . import views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product, Category, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CategorySerializer, CartItemSerializer, CartSerializer, OrderSerializer, OrderItemSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

@api_view(["GET"])
def get_products(request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

@api_view(["GET"])
def get_product(request, pk):
    try:
        product= Product.objects.get(id=pk)
        serializer = ProductSerializer(product, context = {'request': request})
        return Response(serializer.data) 
    except Product.DoesNotExist:
        return Response({'error': 'product not found'}, status=404)

@api_view(["GET"])
def get_categories(request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        item.quantity += 1
        item.save()

    return Response({
        'message': 'Product added to cart',
        'cart': CartSerializer(cart).data
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')

    CartItem.objects.filter(id=item_id).delete()

    return Response({
        'message': 'Item removed from cart'
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or quantity is None:
        return Response({'error': 'item id and quantity are required'}, status=400)

    try:
        item = CartItem.objects.get(id=item_id)    
        quantity = int(quantity)

        if quantity < 1:
            item.delete()
            return Response({'error': 'item removed from cart'}, status=200)
        
        item.quantity = quantity
        item.save()   

        serializer = CartItemSerializer(item)
        return Response(serializer.data)
        
    except CartItem.DoesNotExist:
        return Response({'error': 'cart item not found'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def create_order(request):
    try:
        data = request.data

        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method', 'COD')

        # Validate phone number
        if phone and (not phone.isdigit() or len(phone) < 10):
            return Response({'error':'invalid phone number'}, 
                            status=status.HTTP_400_BAD_REQUEST)

        
        cart , created = Cart.objects.get_or_create(user=request.user)
        if not cart or not cart.items.exists():
            return Response({'error':'cart is empty'},
            status=status.HTTP_400_BAD_REQUEST)

        total = sum(float(item.product.price) * item.quantity for item in cart.items.all())

        #  Create order
        order = Order.objects.create(
            user = request.user,
            total_price = total
        )

        # covert cart ------> OrderItems
        for item in cart.items.all():
            OrderItem.objects.create(
                order = order,
                product = item.product,
                quantity = item.quantity,
                price = item.product.price
            )

        #  clear cart after order
        cart.items.all().delete()

        return Response({
            'message': 'Order placed successfully',
            'order_id': order.id,
            'total_price' : total
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

# Register view
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User registered successfully',
            'user':{
                'id': user.id,
                'username': user.username,
                'email': user.email 
                }
            }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


