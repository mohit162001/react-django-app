
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
        fields = "__all__"

class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"

class CategoryType(DjangoObjectType):
    class Meta:
        model = CategoryModel
        fields = "__all__"
        
class ProductType(DjangoObjectType):
    class Meta:
        model = ProductModel
        fields = "__all__"

class CartType(DjangoObjectType):
    class Meta:
        model = CartModel
        fields = "__all__"
        
class PaymentType(DjangoObjectType):
    class Meta:
        model = PaymentModel
        fields = "__all__"
        
class OrderType(DjangoObjectType):
    class Meta:
        model = OrderTable
        fields = "__all__"
class Query(graphene.ObjectType):
        
    roles = graphene.List(RoleType)
    def resolve_roles(root,info):
        return RoleModel.objects.all()
    
    users = graphene.List(UserType)
    def resolve_users(root,info):
        
        return CustomUser.objects.all()

    
    userDetails = graphene.Field(UserType,userId=graphene.String(required=True))
    def resolve_userDetails(root,info,userId):
        return CustomUser.objects.get(id=userId)
    
    categories = graphene.Field(CategoryType)
    def resolve_categories(root,info):
        return CategoryModel.objects.all()
    
    products = graphene.List(ProductType)
    def resolve_products(root,info):
        return ProductModel.objects.all()
    
    product_by_category = graphene.List(ProductType,category_id = graphene.String())
    def resolve_product_by_category(root,info,category_id):
        return ProductModel.objects.filter(category=category_id)
    
    product = graphene.Field(ProductType,productId=graphene.String())
    def resolve_product(root,info,productId):
        return ProductModel.objects.get(id=productId)
    
    # new_products = graphene.List(ProductType)
    # def resolve_new_products(root,info):
    #     curr_date = datetime.today()

    #     startfrom = curr_date - timedelta(days=6)
    #     print(startfrom)
    #     print(curr_date)
    #     return ProductModel.objects.filter(inserted_date__range = [startfrom.date(),curr_date.date()])
        
    
    carts = graphene.List(CartType)
    def resolve_carts(root,info):
        return CartModel.objects.all()
    
    cart = graphene.List(CartType,userId=graphene.String())
    def resolve_cart(root,info,userId):
        return CartModel.objects.filter(user=userId).order_by('id')
    
    payment_mode = graphene.List(PaymentType)
    def resolve_payment_mode(root,info):
        return PaymentModel.objects.all()
    
    orders = graphene.List(OrderType)
    def resolve_orders(root,info):

        return OrderTable.objects.all()

    order_by_user = graphene.List(OrderType,userId = graphene.String())
    def resolve_order_by_user(root,info,userId):
        return OrderTable.objects.filter(user=userId)
        
    
    

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
            user = CustomUser.objects.create_user(username=username,email=email,password=password)
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
            print("currently logged in user-----",user)
           
            login(request=info.context,user=user)
            print("currently logged in user-----",info.context.user.role)
            return UserLoginMutation(token=token, user=user, message="User logged in" )
        else:
            raise Exception('Invalid username or password')

class UserUpdation(graphene.Mutation):
    class Arguments:
        userId = graphene.String(required = True)
        username = graphene.String(required = True)
        email = graphene.String(required = True)
        address = graphene.String()
    
    message = graphene.String()
    user = graphene.Field(UserType)
    @classmethod
    def mutate(cls,root,info,userId,username=None,email=None,address=None):
        print("--------------------",info.context.user)
        
        user  = CustomUser.objects.get(id=userId)
        if user.is_authenticated:
            if username is not None:
                user.username = username
            if email is not None:
                user.email = email
            if address is not None:
                user.address = address
            user.save()
            return UserUpdation(user=user,message ="User profile Updated")
        else:
            raise Exception("User not authorized")
        
class CategoryCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        
    category = graphene.Field(CategoryType)
    @classmethod
    def mutate(cls,root,info,name):
        user = info.context.user
        if user.is_authenticated and user.role.role=='admin':
            category = CategoryModel.objects.create(name=name)
            return CategoryCreation(category=category)
        else:
            raise Exception("User is not authorized")
        
class CategoryDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
    
    message = graphene.String()
    
    @classmethod
    def mutate(cls,root,info,id):
        user = info.context.user
        if user.is_authenticated and user.role.role=='admin':
            category = CategoryModel.objects.get(id=id)
            if category:
                category.delete()
                return CategoryDeletion(message="Category Deleted Successfully")
            else:
                raise Exception("Can not delete category")
        else:
            raise Exception("User is not authorized")    

class ProductCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        price = graphene.Float(required=True)
        desc = graphene.String(required=True)
        image = graphene.String(required=True)
        category_id = graphene.String(required=True)
   
    product = graphene.Field(ProductType)
    
    @classmethod
    def mutate(cls,root,info,name,price,desc,image,category_id):
        user = info.context.user
        print(user.role.role)
        if user.is_authenticated and user.role.role=='admin':
            if name and price and desc and image and category_id:
                category = CategoryModel.objects.get(id=category_id)
            
                format, imgstr = image.split(';base64,')
                ext = format.split('/')[-1]
                image_data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
            
                product = ProductModel.objects.create(name=name,desc=desc,price=price,image=image_data,category=category)
                return ProductCreation(product=product)
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
        
    product = graphene.Field(ProductType)
    
    @classmethod
    def mutate(cls,root,info,productId,name=None,price=None,desc=None,image=None):
        user = info.context.user
        if user.is_authenticated and user.role.role=='admin':
            product = ProductModel.objects.get(id=productId)
            
            if name is not None:
                product.name = name
            if desc is not None:
                product.desc = desc
            if price is not None:
                product.price = price
            if image is not None:
                format, imgstr = image.split(';base64,')
                ext = format.split('/')[-1]
                image_data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
                product.image = image_data

            product.save()
            return ProductCreation(product=product)
        else:
            raise Exception("User is not authorized") 

class ProductDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,id):
        user = info.context.user
        if user.is_authenticated and user.role.role=='admin':
            product = ProductModel.objects.get(id=id)
            if product:
                product.delete()
                return ProductDeletion(message="Product Deleted Successfully")
            else:
                raise Exception("Can not delete product")
        else:
            raise Exception("User is not authorized")

class CartItemAdd(graphene.Mutation):
    class Arguments:
        user_id = graphene.String(required=True)
        product_id = graphene.String(required=True)
        quantity = graphene.Int()
        price = graphene.Float()
        
    message = graphene.String()
    product = graphene.Field(ProductType)
    userCart = graphene.List(CartType)
    
    @classmethod
    def mutate(cls,root,info,user_id,product_id,quantity=0,price=0):
        
        already_product = CartModel.objects.filter(user=user_id,product = product_id)
        print("product count======",already_product.__len__())
        product = ProductModel.objects.get(id=product_id)
        user = CustomUser.objects.get(id=user_id)
        product_price = product.price
  
        # existing_product = CartModel.objects.get(user=user_id,product = product_id) 
        # print("exist",existing_product.quantity)
        
        if already_product.__len__()==0:
            newCartItem = CartModel.objects.create(user=user,product=product,quantity=1,price=product_price)
            newCartItem.save()
            return CartItemAdd(message = "Item added")
        elif already_product.__len__()>0:
            existing_item = CartModel.objects.get(user=user_id,product = product_id) 
            existing_item.quantity = existing_item.quantity+1
            existing_item.price = existing_item.price * existing_item.quantity
            existing_item.save()
            return CartItemAdd(message = "Item quantity increment")

        return CartItemAdd(message="testing cart")

class CartItemRemove(graphene.Mutation):
    class Arguments:
        user_id = graphene.String(required=True)
        product_id = graphene.String(required=True)
        quantity = graphene.Int()
        price = graphene.Float()
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,user_id,product_id,quantity=0,price=0):
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
        return CartItemAdd(message="testing cart remove")
    
    
class CartRemoveAllItem(graphene.Mutation):
    class Arguments:
        userId = graphene.String(required=True)
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,userId):
        user = CustomUser.objects.get(id=userId)
        print(user)
        CartModel.objects.filter(user=user).delete()
        return CartRemoveAllItem(message = "All item removed")    
    
class OrderCreate(graphene.Mutation):
    class Arguments:
        user_id = graphene.String(required=True)
        payment_mode = graphene.String(required=True)
        quantity = graphene.Int()
        price = graphene.Float()
    
    message = graphene.String()
    
    @classmethod
    def mutate(cls,root,info,user_id,payment_mode):
        cartItem  = CartModel.objects.filter(user=user_id)
        user = CustomUser.objects.get(id=user_id)
        print(cartItem)
        for item in cartItem:
            product = ProductModel.objects.get(id=item.product_id)
            paymode = PaymentModel.objects.get(id=payment_mode)
            print(item.quantity)
            orderItem = OrderTable.objects.create(user=user,product=product,quantity=item.quantity,price=item.price,payment_mode=paymode)
            
        return OrderCreate(message = "Order testing")
        
class Mutation(graphene.ObjectType):
    createUser = CreateUserMutation.Field()
    userLogin = UserLoginMutation.Field()
    userUpate = UserUpdation.Field()
    
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
    cartRemoveAll = CartRemoveAllItem.Field()
    
    orderCreate = OrderCreate.Field()
    
schema = graphene.Schema(query=Query,mutation=Mutation)