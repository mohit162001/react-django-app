import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import login,logout
import graphene_django
from clothyapp.models import CartModel, CategoryModel, OrderTable, PaymentModel, ProductModel, RoleModel, CustomUser
from django.contrib.auth import authenticate
import graphql_jwt
from graphql_jwt.shortcuts import get_token

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
    
    categories = graphene.List(CategoryType)
    def resolve_categories(root,info):
        return CategoryModel.objects.all()
    
    products = graphene.List(ProductType)
    def resolve_products(root,info):
        return ProductModel.objects.all()
    
    product_by_category = graphene.List(ProductType,category_id = graphene.String())
    def resolve_product_by_category(root,info,category_id):
        return ProductModel.objects.filter(category=category_id)
    
    product = graphene.Field(ProductType,id=graphene.String())
    def resolve_product(root,info,id):
        return ProductModel.objects.get(id=id)
    
    carts = graphene.List(CartType)
    def resolve_carts(root,info):
        return CartModel.objects.all()
    
    cart = graphene.Field(CartType,id=graphene.String())
    def resolve_cart(root,info,id):
        return CartModel.objects.filter(user=id)
    
    payment_mode = graphene.List(PaymentType)
    def resolve_payment_mode(root,info):
        return PaymentModel.objects.all()
    
    orders = graphene.List(OrderType)
    def resolve_orders(root,info):
        return OrderTable.objects.all()
    

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
            # user.save()   
            token = get_token(user=user)
            return CreateUserMutation(user=user,token=token)     
        else:
            raise Exception("Enter valid Inputs")

class UserLoginMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
    
    token = graphene.String()
    user = graphene.Field(UserType)
    
    @classmethod
    def mutate(cls,root, info, username, password):
        user = authenticate(username=username, password=password)
        
        if user is not None:
            token = get_token(user=user)
            return UserLoginMutation(token=token, user=user )
        else:
            raise Exception('Invalid username or password')

class UserUpdation(graphene.Mutation):
    class Arguments:
        id = graphene.String(required = True)
        username = graphene.String()
        email = graphene.String()
        address = graphene.String()
    
    message = graphene.String()
    user = graphene.Field(UserType)
    @classmethod
    def mutate(cls,root,info,id,username=None,email=None,address=None):
        user = CustomUser.objects.get(id=id)
        if user is not None:
            if username is not None:
                user.username = username
            if email is not None:
                user.email = email
            if address is not None:
                user.address = address
            user.save()
            return UserUpdation(user=user,message ="User profile Updated")
        else:
            raise Exception("User not found")
        
class CategoryCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        
    category = graphene.Field(CategoryType)
    @classmethod
    def mutate(cls,root,info,name):
        category = CategoryModel.objects.create(name=name)
        return CategoryCreation(category=category)

class CategoryDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.String()
    
    message = graphene.String()
    
    @classmethod
    def mutate(cls,root,info,id):
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
        category_id = graphene.String(required=True)
   
    product = graphene.Field(ProductType)
    
    @classmethod
    def mutate(cls,root,info,name,price,desc,image,category_id):
        category = CategoryModel.objects.get(id=category_id)
        product = ProductModel.objects.create(name=name,desc=desc,price=price,image=image,category=category)
        return ProductCreation(product=product)

class ProductUpdation(graphene.Mutation):
    class Arguments:
        id = graphene.String()
        name = graphene.String()
        price = graphene.Float()
        desc = graphene.String()
        # image = graphene.String()
        
    product = graphene.Field(ProductType)
    
    @classmethod
    def mutate(cls,root,info,id,name=None,price=None,desc=None,image=None):
        product = ProductModel.objects.get(id=id)
        
        if name is not None:
            product.name = name
        if desc is not None:
            product.desc = desc
        if price is not None:
            product.price = price
        if image is not None:
            product.name = image

        product.save()
        return ProductCreation(product=product)

class ProductDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.String()
    
    message = graphene.String()
    @classmethod
    def mutate(cls,root,info,id):
        product = ProductModel.objects.get(id=id)
        if product:
            product.delete()
            return ProductDeletion(message="Product Deleted Successfully")
        else:
            raise Exception("Can not delete product")




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
    
    
schema = graphene.Schema(query=Query,mutation=Mutation)