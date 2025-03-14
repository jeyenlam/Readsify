from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    
)
from users.views import SignUpView, LogInView, ProtectedView
from books.views import FetchBookInfoView, AddBookView, FetchBooksOnShelfView, DeleteBookView
from chat.views import Chat
from recommender.views import Recommender

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('api/login/', LogInView.as_view(), name="login"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/protected/', ProtectedView.as_view(), name='protected_view'),
    path('api/books/', FetchBookInfoView.as_view(), name='fetch_book_info'),
    path('api/books/add-book/', AddBookView.as_view(), name='add_book'),
    path('api/books/fetch-books-on-shelf/', FetchBooksOnShelfView.as_view(), name='fetch_books_on_shelf'),
    path('api/books/delete-book/', DeleteBookView.as_view(), name='delete_book'),
    path('api/chat/', Chat.as_view(), name='chat'),
    path('api/recommender/', Recommender.as_view(), name='recommender'),
]
