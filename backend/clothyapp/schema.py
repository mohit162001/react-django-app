from django.core.mail import send_mail,EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import re
import graphene
from graphene_django import DjangoObjectType
from graphene import relay
from django.contrib.auth import login,logout
from clothyapp.models import CartModel, CategoryModel, OrderTable, PaymentModel, ProductModel, RoleModel, CustomUser
from django.contrib.auth import authenticate
import graphql_jwt
from graphql_jwt.shortcuts import get_token
import base64
from django.core.files.base import ContentFile
from datetime import datetime, timedelta
from graphene_django.filter import DjangoFilterConnectionField


class RoleType(DjangoObjectType):
    class Meta:
        model = RoleModel
        filter_fields={
        'id':['exact'],
        'role':['exact'],
        }
        interfaces = (relay.Node,)

class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser


class CategoryType(DjangoObjectType):
    class Meta:
        model = CategoryModel
        filter_fields={
        'id':['exact'],
        'name':['exact'],
        }
        interfaces = (relay.Node,)
        
class ProductType(DjangoObjectType):
    class Meta:
        model = ProductModel
        filter_fields = {
            'id':['exact'],
            'name': ['exact', 'icontains', 'istartswith'],
            'desc': ['exact', 'icontains', 'istartswith'],
            'price': ['exact','gte','lte'],
            'category__id':['exact'],
            'inserted_date':['exact','gte','lte'],
            'category__name':['exact'],
        }
        interfaces = (relay.Node,)


class CartType(DjangoObjectType):
    class Meta:
        model = CartModel
        filter_fields={
        'id':['exact'],
        'user__username':['exact'],
        'product__category':['exact'],
        "price":['exact','gte','lte'],
        "quantity":['exact','gte','lte']  
        }
        interfaces = (relay.Node,)
        
class PaymentType(DjangoObjectType):
    class Meta:
        model = PaymentModel
        filter_fields={
        'id':['exact'],
        "payment_mode":['exact']    
        }
        interfaces = (relay.Node,)
        
class OrderType(DjangoObjectType):
    class Meta:
        model = OrderTable
        filter_fields = {
        "user__id":['exact'],
        "user__username":['exact'],   
        "quantity":['exact','gte','lte'],
        "price":['exact','gte','lte'],
        "payment_mode__payment_mode":['exact'],
        'product__category__name':['exact']
        }
        interfaces = (relay.Node,)
        

class CustomProductType(graphene.ObjectType):
    productId = graphene.String()
    product_name = graphene.String()
    product_desc = graphene.String()
    product_image = graphene.String()
    product_price = graphene.Float()
    product_category = graphene.String()

        
        
class CustomOrderType(graphene.ObjectType):
    username = graphene.String()
    productId = graphene.String()
    orderId = graphene.String()
    product_name = graphene.String()
    product_image = graphene.String()
    product_price = graphene.Float()
    totalPrice = graphene.Float()
    quantity = graphene.Int()
    order_date = graphene.String()
    paymentMode = graphene.String()

class CustomCartType(graphene.ObjectType):
    cartItemId = graphene.String()
    productId = graphene.String()
    product_name = graphene.String()
    product_image = graphene.String()
    product_price = graphene.Float()
    totalPrice = graphene.Float()
    quantity = graphene.Int()
    username = graphene.String()
    userrole = graphene.String()

class UserAuthentictaion:
    def user_authentication(self, info):
        user = info.context.user
        # print("UserAuthClass--------",user)
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        

class Query(graphene.ObjectType):
        
      
    roles = DjangoFilterConnectionField(RoleType)
    def resolve_roles(root,info,**kwargs):
        return RoleModel.objects.all()
    

    users = graphene.List(UserType)
    def resolve_users(self, info, **kwargs):
        users = CustomUser.objects.all().order_by('-id')
        return users
    

    userDetails = graphene.Field(UserType,userId=graphene.String(required=True))
    def resolve_userDetails(root,info,userId):
        UserAuthentictaion.user_authentication(root,info)
        return CustomUser.objects.get(id=userId)
    
    categories = DjangoFilterConnectionField(CategoryType)
    # categories = graphene.List(CategoryType)
    def resolve_categories(root,info):
        UserAuthentictaion.user_authentication(root,info)
        return CategoryModel.objects.all()
    
    products = DjangoFilterConnectionField(ProductType)
    def resolve_products(root,info,**kwargs):
        
        products = ProductModel.objects.all().order_by('-id')
        return products
    
    '''
    # products = graphene.List(CustomProductType)
    
    # products = graphene.List(CustomProductType, name=graphene.String(), price_min=graphene.Float(), price_max=graphene.Float(), category=graphene.String())
    # def resolve_products(root, info, name=None, price_min=None, price_max=None, category=None):
    #     products = ProductModel.objects.all()

    #     if name:
    #         products = products.filter(name__icontains=name)
    #     if price_min is not None:
    #         products = products.filter(price__gte=price_min)
    #     if price_max is not None:
    #         products = products.filter(price__lte=price_max)
    #     if category:
    #         products = products.filter(category__name__iexact=category)
            
    #     products_dict =[]
    #     for product in products:
    #         products_dict.append(
    #             {
    #             "productId":product.id,
    #             "product_name":product.name,
    #             "product_image":product.image,
    #             "product_price":product.price,
    #             "product_desc":product.desc,
    #             "product_category":product.category
    #             }
    #         )
    #     return products_dict
    '''
    
    product = graphene.Field(CustomProductType,productId=graphene.String())
    def resolve_product(root,info,productId):
        # UserAuthentictaion.user_authentication(root,info)
        
        decoded_bytes = base64.b64decode(productId)
        decoded_id = decoded_bytes.decode('utf-8').split(':')[1]
        product = ProductModel.objects.get(id=decoded_id)
        product_dict = {
            "productId":product.id,
            "product_name":product.name,
            "product_image":product.image,
            "product_price":product.price,
            "product_desc":product.desc,
            "product_category":product.category
        }
        return product_dict
    
    carts = DjangoFilterConnectionField(CartType)
    def resolve_carts(root,info,**kwargs):
        carts = CartModel.objects.filter(**kwargs)
    
    popular_product = DjangoFilterConnectionField(ProductType)
    def resolve_popular_product(root,info,**kwargs):
        curr_date  =datetime.today()
        six_day_ago = curr_date - timedelta(days=6)
        older_product = ProductModel.objects.filter(inserted_date__lte=six_day_ago,**kwargs)
        return older_product
    
    
    new_products = graphene.List(ProductType)
    def resolve_new_products(root,info):
        # UserAuthentictaion.user_authentication(root,info)
        
        curr_date = datetime.today()

        startfrom = curr_date - timedelta(days=6)
        print(startfrom)
        print(curr_date)
        products = ProductModel.objects.all()
        new_products = ProductModel.objects.filter(inserted_date__range = [startfrom.date(),curr_date.date()])
        if new_products.__len__() != 0:
            products=new_products
            return products
        else:
            return products
        
    new_products = graphene.List(ProductType)
    def resolve_new_products(root,info):
        # UserAuthentictaion.user_authentication(root,info)
        
        curr_date = datetime.today()

        startfrom = curr_date - timedelta(days=6)
        print(startfrom)
        print(curr_date)
        products = ProductModel.objects.all()
        new_products = ProductModel.objects.filter(inserted_date__range = [startfrom.date(),curr_date.date()])
        print(new_products)
        if new_products.__len__() != 0:
            products=new_products.order_by('-id')
            return products
        else:
            return products

    user_cart = graphene.List(CustomCartType, user_id=graphene.String(required=True))
    def resolve_user_cart(root,info,user_id):
        UserAuthentictaion.user_authentication(root,info)
        
        user = CustomUser.objects.get(id=user_id)
        cartItems = CartModel.objects.filter(user=user).order_by('id')
        # print(cartItems)
        cartData = []
        for item in cartItems:
            # print(item.product)
            product = ProductModel.objects.get(id = item.product.id)
            cartData.append(
                {
                "cartItemId":item.id,
                "productId":product.id,
                "product_name":product.name,
                "product_image":product.image,
                "product_price":product.price,
                "totalPrice":item.price,
                "quantity":item.quantity,
                "username":user.username,
                "userrole":user.role
                }
            )
            
        return cartData
    # abc = [{"productId":}]
    payment_mode = DjangoFilterConnectionField(PaymentType)
    def resolve_payment_mode(root,info):
        UserAuthentictaion.user_authentication(root,info)
        
        return PaymentModel.objects.all()
    
    orders = graphene.List(CustomOrderType)
    def resolve_orders(root,info):
        UserAuthentictaion.user_authentication(root,info)
        
        orders = OrderTable.objects.all().order_by('-id')
        order_data = []
        for order in orders:
            product = ProductModel.objects.get(id = order.product.id)
            payment_mode = PaymentModel.objects.get(id=order.payment_mode.id)
            order_data.append(
                {
                "orderId":order.id,
                "username":order.user.username,
                "productId":order.product.id,
                "product_name":product.name,
                "product_image":product.image,
                "product_price":product.price,
                "totalPrice":order.price,
                "quantity":order.quantity,
                "order_date":order.order_date,
                "paymentMode":payment_mode.payment_mode
                 }
            )
        return order_data
    
    
    user_orders = graphene.List(CustomOrderType, user_id=graphene.String(required=True))
    def resolve_user_orders(root,info,user_id):
        UserAuthentictaion.user_authentication(root,info)
        
        user = CustomUser.objects.get(id=user_id)
        orders = OrderTable.objects.filter(user=user).order_by('-id')
        # print(orders)
        orderData = []
        for order in orders:
            orderData.append(CustomOrderType(
                orderId = order.id,
                username=order.user.username,
                productId=order.product.id,
                product_name=order.product.name,
                product_image=order.product.image,
                product_price=order.product.price,
                totalPrice=order.price,
                quantity=order.quantity,
                order_date=order.order_date,
                paymentMode=order.payment_mode.payment_mode
            ))
            
        return orderData
    

class CreateUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(UserType)
    token = graphene.String()
    @classmethod
    def mutate(cls,root, info, username, password, email):
        
        print(username,password,email)
        if username and email and password:
            role = RoleModel.objects.get(role="user")
            user = CustomUser.objects.create_user(username=username,email=email,password=password,role=role)
            user.set_password(password)
            user.save()   
            token = get_token(user=user)
            user_auth = authenticate(username=username, password=password)
            if user_auth:
                login(request=info.context,user=user_auth)
            return CreateUserMutation(user=user,token=token)     
        else:
            raise Exception("Enter valid Inputs")

class UserLoginMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
    
    token = graphene.String()
    user = graphene.Field(UserType)
    message = graphene.String() 
    @classmethod
    def mutate(cls,root, info, username, password):
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            token = get_token(user=user)
            print("Authenticate user-----",user)
            login(request=info.context,user=user)
            print("currently logged in user-----",info.context.user)
            
            return UserLoginMutation(token=token, user=user, message="User logged in" )
        else:
            raise Exception('Invalid username or password')

class UserUpdation(graphene.Mutation):
    class Arguments:
        userId = graphene.String(required = True)
        username = graphene.String(required = True)
        email = graphene.String(required = True)
        address = graphene.String()
        image = graphene.String()
    
    message = graphene.String()
    user = graphene.Field(UserType)
    token = graphene.String()
    
    @classmethod
    def mutate(cls,root,info,userId,username=None,email=None,address=None,image=None):
        UserAuthentictaion.user_authentication(root,info)
        
        user  = CustomUser.objects.get(id=userId)
        if user.is_authenticated:
            if username is not None:
                user.username = username
            if email is not None:
                user.email = email
            if address is not None:
                user.address = address
            if image is not None:
                format, imgstr = image.split(';base64,')
                ext = format.split('/')[-1]
                image_data = ContentFile(base64.b64decode(imgstr), name='tempuser.' + ext)
                user.image = image_data
            token = get_token(user=user)
            user.save()
            return UserUpdation(user=user,message ="User profile Updated",token=token)
        else:
            raise Exception("User not authorized")
        
class UserLogoutMutation(graphene.Mutation):
    message = graphene.String()

    @classmethod
    def mutate(cls, root, info):
        logout(request=info.context)
        return UserLogoutMutation(message=f"logged out successfully")

class UserStatusManage(graphene.Mutation):
    class Arguments:
        userId = graphene.String(required=True)
        status = graphene.Boolean(required=True)
        
    userStatus = graphene.Boolean()
    user=graphene.Field(UserType)
    @classmethod
    def mutate(cls,root,info,userId,status):
        user = CustomUser.objects.get(id=userId)
        if user.role.role =='user':
            print(user.is_active)
            print(status)
            user.is_active=status
            user.save()
            return UserStatusManage(userStatus=user.is_active,user=user)
        else:
            raise Exception("Unauthorized")
        
    
class CategoryCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,name):
        UserAuthentictaion.user_authentication(root,info)
        if name !='':
            CategoryModel.objects.create(name=name)
            return CategoryCreation(message = "New Category Created")
        else:
            raise Exception("Enter valid input")

        
class CategoryDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
    
    message = graphene.String()
    
    @classmethod
    def mutate(cls,root,info,id):
        UserAuthentictaion.user_authentication(root,info)

        category = CategoryModel.objects.get(id=id)
        if category:
            category.delete()
            return CategoryDeletion(message="Category Deleted Successfully")
        else:
            raise Exception("Can not delete category")
 

class ProductCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        price = graphene.Float(required=True)
        desc = graphene.String(required=True)
        image = graphene.String(required=True)
        category_name = graphene.String(required=True)
   
    product = graphene.Field(ProductType)
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,name,price,desc,image,category_name):
        UserAuthentictaion.user_authentication(root,info)
        
        user = info.context.user
        print(user.role.role)
        if user.is_authenticated:
            if name and price and desc and image and category_name:
                category = CategoryModel.objects.get(name=category_name)
                print("category name------",category)
                format, imgstr = image.split(';base64,')
                ext = format.split('/')[-1]
                image_data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
            
                product = ProductModel.objects.create(name=name,desc=desc,price=price,image=image_data,category=category)
                return ProductCreation(message = "product created",product=product)
            else:
                raise Exception("Invalid inputs")
        else:
            raise Exception("User is not authorized") 

class ProductUpdation(graphene.Mutation):
    class Arguments:
        productId = graphene.String(required=True)
        name = graphene.String()
        price = graphene.Float()
        desc = graphene.String()
        image=graphene.String()
        category_name = graphene.String()
        
    product = graphene.Field(ProductType)
    
    @classmethod
    def mutate(cls,root,info,productId,name=None,price=None,desc=None,image=None,category_name=None):
        UserAuthentictaion.user_authentication(root,info)

        decoded_bytes = base64.b64decode(productId)
        decoded_id = decoded_bytes.decode('utf-8').split(':')[1]
        product = ProductModel.objects.get(id=decoded_id)
        
            
        if name is not None:
            product.name = name
        if desc is not None:
            product.desc = desc
        if price is not None:
            product.price = price
        if category_name is not None:
            category = CategoryModel.objects.get(name=category_name)
            product.category=category
        if image is not None:
            format, imgstr = image.split(';base64,')
            ext = format.split('/')[-1]
            image_data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
            product.image = image_data

        product.save()
        return ProductCreation(product=product)    

class ProductDeletion(graphene.Mutation):
    class Arguments:
        productId = graphene.String(required=True)
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,productId):
        UserAuthentictaion.user_authentication(root,info)

        decoded_bytes = base64.b64decode(productId)
        decoded_id = decoded_bytes.decode('utf-8').split(':')[1]
        product = ProductModel.objects.get(id=decoded_id)
        if product:
            product.delete()
            return ProductDeletion(message="Product Deleted Successfully")
        else:
            raise Exception("Can not delete product")
        

class CartItemAdd(graphene.Mutation):
    class Arguments:
        user_id = graphene.String(required=True)
        product_id = graphene.String(required=True)
        quantity = graphene.Int()
        # price = graphene.Float()
        
    message = graphene.String()
    
    @classmethod
    def mutate(cls,root,info,user_id,product_id,quantity=1):
        UserAuthentictaion.user_authentication(root,info)
        if quantity<=1:
            quantity=1
        already_product = CartModel.objects.filter(user=user_id,product = product_id)
        # print("product count======",already_product.__len__())
        product = ProductModel.objects.get(id=product_id)
        user = CustomUser.objects.get(id=user_id)
        product_price = product.price
  
        # existing_product = CartModel.objects.get(user=user_id,product = product_id) 
        # print("exist",existing_product.quantity)
        
        if already_product.__len__()==0:
            newCartItem = CartModel.objects.create(user=user,product=product,quantity=quantity,price=quantity*product_price)
            newCartItem.save()
            return CartItemAdd(message = "Item added")
        elif already_product.__len__()>0:
            existing_item = CartModel.objects.get(user=user_id,product = product_id) 
            existing_item.quantity = existing_item.quantity+quantity
            existing_item.price = product_price * existing_item.quantity
            existing_item.save()
            return CartItemAdd(message = "Item quantity increment")

        return CartItemAdd(message="testing cart")

class CartItemRemove(graphene.Mutation):
    class Arguments:
        user_id = graphene.String(required=True)
        product_id = graphene.String(required=True)
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,user_id,product_id):        
        already_product = CartModel.objects.get(user=user_id,product = product_id)
        print("product count======",already_product.quantity)
        product = ProductModel.objects.get(id=product_id)
        user = CustomUser.objects.get(id=user_id)
        product_price = product.price
        
        if already_product.quantity != 1:
            already_product.quantity=already_product.quantity-1
            already_product.price= product_price*already_product.quantity
            already_product.save()
            return CartItemAdd(message = "existing item quantity deducted")
        elif already_product.quantity ==1:
            already_product.delete()
            return CartItemAdd(message = "single existing item removed")
        else:
            raise Exception("Something went wrong")

class CartRemoveEntierItem(graphene.Mutation):
    class Arguments:
        cartItemId = graphene.String(required=True)
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,self,cartItemId):
        
        cartItem = CartModel.objects.get(id=cartItemId)
        cartItem.delete()
        return CartRemoveEntierItem(message = "Entier item removed")
    
class CartRemoveAllItem(graphene.Mutation):
    class Arguments:
        userId = graphene.String(required=True)
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,userId):
        UserAuthentictaion.user_authentication(root,info)
        
        user = CustomUser.objects.get(id=userId)
        print(user)
        CartModel.objects.filter(user=user).delete()
        return CartRemoveAllItem(message = "All item removed")    
    
class OrderCreate(graphene.Mutation):
    class Arguments:
        user_id = graphene.String(required=True)
        payment_mode = graphene.String(required=True)
    
    message = graphene.String()
    orders = graphene.List(OrderType)
    @classmethod
    def mutate(cls,root,info,user_id,payment_mode):
        UserAuthentictaion.user_authentication(root,info)
        
        cartItem  = CartModel.objects.filter(user=user_id)
        user = CustomUser.objects.get(id=user_id)
        print("current cart items",cartItem)
        curr_order=[]
        for item in cartItem:
            product = ProductModel.objects.get(id=item.product_id)
            paymode = PaymentModel.objects.get(payment_mode=payment_mode)
            print(paymode)
            print(item.quantity)
            order = OrderTable.objects.create(user=user,product=product,quantity=item.quantity,price=item.price,payment_mode=paymode)
            curr_order.append(order)
        # orders = OrderTable.objects.filter(user=user,order_date__exact=datetime.today())
        print("today order",curr_order)
        # send_mail(
        #     "Subject here",
        #     "Here is the message.",
        #     "clothyshopofficial@gmail.com",
        #     ["mohitdevade2001@gmail.com"],
        #     fail_silently=False,
        #     )
        print("before email sent")
        SendEmail.send_order_email(user.username,user.address,curr_order,user.email)
        print("after email sent")

        return OrderCreate(message = "Order testing",orders = curr_order )
    
class SendEmail:
    def send_order_email(username,address,orders,useremail):
        html_content = render_to_string("orderemail.html",{"username":username,"address":address,"orders":orders,"date":datetime.today()})
        text_content = strip_tags(html_content)
        email = EmailMultiAlternatives("Your Order is Placed",text_content,'clothyshopofficial@gmail.com',[useremail])
        email.attach_alternative(html_content,"text/html")
        email.send()
        
class OrderDeletion(graphene.Mutation):
    class Arguments:
        orderId = graphene.String(required=True)
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,orderId):
        UserAuthentictaion.user_authentication(root,info)
        order = OrderTable.objects.get(id=orderId)
        if order:
            order.delete()
            return ProductDeletion(message="Order Deleted Successfully")
        else:
            raise Exception("Can not delete order")
  
class Mutation(graphene.ObjectType):
    createUser = CreateUserMutation.Field()
    userLogin = UserLoginMutation.Field()
    userUpate = UserUpdation.Field()
    userStatus = UserStatusManage.Field()
    userLogout = UserLogoutMutation.Field()
    
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    
    createCategory = CategoryCreation.Field()
    deleteCategory = CategoryDeletion.Field()
    
    createProduct = ProductCreation.Field()
    updateProduct = ProductUpdation.Field()
    deleteProduct = ProductDeletion.Field()
    
    cartItemAdd  = CartItemAdd.Field()
    cartItemRemove = CartItemRemove.Field()
    cartRemoveEnrtierItem = CartRemoveEntierItem.Field()
    cartRemoveAll = CartRemoveAllItem.Field()
    
    orderCreate = OrderCreate.Field()
    orderDelete = OrderDeletion.Field()
schema = graphene.Schema(query=Query,mutation=Mutation)