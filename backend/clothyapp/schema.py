import graphene
from graphene_django import DjangoObjectType

from clothyapp.models import CartModel, CategoryModel, OrderTable, PaymentModel, ProductModel, RoleModel, CustomUser

class RoleType(DjangoObjectType):
    class Meta:
        model = RoleModel
        fields = "__all__"
        # ---------------------------------------------------------dekhna he
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
        
# --------------------------------------------------types ends---------------------------------------------------

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
    
# --------------------------------------------------query ends---------------------------------------------------

class ProductCreation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        price = graphene.Float(required=True)
        desc = graphene.String(required=True)
        image = graphene.String(required=True)
        category_id = graphene.String(required=True)
        
    @classmethod
    def mutate(cls,root,info,name,price,desc,image,category_id):
        category = CategoryModel.objects.get(id=category_id)
        ProductModel.objects.create(name=name,desc=desc,price=price,image=image,category=category)
        


class Mutation(graphene.ObjectType):
    createProduct = ProductCreation.Field()

schema = graphene.Schema(query=Query)