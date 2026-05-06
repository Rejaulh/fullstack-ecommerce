from django.shortcuts import render
# from . import views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product, Category, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CategorySerializer, CartItemSerializer, CartSerializer, OrderSerializer, OrderItemSerializer, RegisterSerializer
from django.contrib.auth.models import User

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

# @api_view(["GET"])
# def get_cart(request):
#     cart, created = Cart.objects.get_or_create(user=None)
#     serializer = CartSerializer(cart)
#     return Response(serializer.data)

# @api_view(["POST"])
# def add_to_cart(request):
#     product_id = request.data.get('product_id')
#     product = Product.objects.get(id=product_id)
#     cart, created = Cart.objects.get_or_create(user=None)
#     item, created = CartItem.objects.get_or_create(cart=cart, product=product)
#     if not created:
#         item.quantity += 1
#         item.save()
#     return Response({'message':'product added to cart', 'cart':CartItemSerializer(cart).data})

# @api_view(["POST"])
# def remove_from_cart(request):
#     item_id = request.data.get('item_id')
#     CartItem.objects.filter(id=item_id.delete)
#     return Response({'message':'Item remove from cart'})


@api_view(["GET"])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=None)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(["POST"])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
    cart, created = Cart.objects.get_or_create(user=None)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        item.quantity += 1
        item.save()

    return Response({
        'message': 'Product added to cart',
        'cart': CartSerializer(cart).data
    })


@api_view(["POST"])
def remove_from_cart(request):
    item_id = request.data.get('item_id')

    CartItem.objects.filter(id=item_id).delete()

    return Response({
        'message': 'Item removed from cart'
    })


@api_view(["POST"])
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
def create_order(request):
    try:
        data = request.data

        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method', 'COD')

        # Validate input
        if not name or not address or not phone:
            return Response({'error':'name , address and phone are required'}, 
            status=status.HTTP_400_BAD_REQUEST)

         # Get user's cart
        # cart = Cart.objects.filter(user=request.user).first()
        cart = Cart.objects.first()

        if not cart or not cart.items.exists():
            return Response({'error':'cart is empty'},
            status=status.HTTP_400_BAD_REQUEST)

        total = sum(float(item.product.price) * item.quantity for item in cart.items.all())

        #  Create order
        order = Order.objects.create(
            # user = request.user,
            user = None,
            total_price = total
            # name = name,
            # address = address,
            # phone = phone,
            # payment_method = payment_method
        )
        # total_price = 0

        # covert cart ------> OrderItems
        for item in cart.items.all():
            OrderItem.objects.create(
                order = order,
                product = item.product,
                quantity = item.quantity,
                price = item.product.price
            )
            # total_price += item.product.price * item.quantity

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