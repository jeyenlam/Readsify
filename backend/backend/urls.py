from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import SignUpView
from users.views import LogInView
from books.views import FetchBookInfoView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/login/', LogInView.as_view(), name="login"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/books/', FetchBookInfoView.as_view(), name='FetchBookInfoView'),
]
