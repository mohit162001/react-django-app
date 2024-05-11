from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class RoleModel(models.Model):
    role = models.CharField(max_length = 200)
    
    def __str__(self):
        return self.role

class CustomUser(AbstractUser):
    address = models.CharField(blank=True,null=True,max_length=300)
    role = models.ForeignKey(RoleModel, on_delete=models.CASCADE, default=None, blank=True, null=True)
    image = models.ImageField(upload_to='user_image',default=None, blank=True, null=True)


class CategoryModel(models.Model):
    name = models.CharField(max_length=200)
    inserted_date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    
class ProductModel(models.Model):
    name = models.CharField(max_length=200)
    desc = models.CharField(max_length=500)
    price = models.FloatField(max_length=200)
    image = models.ImageField(upload_to='product_image')
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, default=None, blank=True, null=True)
    inserted_date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class CartModel(models.Model):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, default=None, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None, blank=True, null=True)
    quantity = models.IntegerField(default = 0)
    price = models.FloatField(default = 0)
    
    def __str__(self):
        return f"{self.user.username}'s cart item"
    
class PaymentModel(models.Model):
    payment_mode = models.CharField(max_length=200)
    
    def __str__(self) -> str:
        return self.payment_mode
    
class OrderTable(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None, blank=True, null=True)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, default=None, blank=True, null=True)
    order_date = models.DateField(auto_now_add=True)
    quantity = models.IntegerField(default = 0)
    price = models.FloatField(default = 0)
    payment_mode = models.ForeignKey(PaymentModel, on_delete=models.CASCADE, default=None, blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username}'s order item"