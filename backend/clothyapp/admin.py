from django.contrib import admin

from clothyapp.models import PaymentModel, RoleModel,CustomUser,CategoryModel,ProductModel,CartModel,PaymentModel,OrderTable

# Register your models here.
admin.site.register(RoleModel)
admin.site.register(CustomUser)
admin.site.register(CategoryModel)
admin.site.register(ProductModel)
admin.site.register(CartModel)
admin.site.register(PaymentModel)
admin.site.register(OrderTable)