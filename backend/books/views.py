import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Book, UserBook
from .serializers import BookSerializer


GOOGLE_BOOKS_API_KEY = os.environ.get('GOOGLE_BOOKS_API_KEY')
GOOGLE_BOOKS_API_URL = os.environ.get('GOOGLE_BOOKS_API_URL')

@method_decorator(csrf_exempt, name='dispatch')
class FetchBookInfoView(APIView):    
    permission_classes = [IsAuthenticated]

    def post(self, request):    
        searchTerms = json.loads(request.body).get('searchTerms')
        user = request.user
        print(user)
        
        if searchTerms:
            params = {'q': searchTerms, 'key': GOOGLE_BOOKS_API_KEY}
            response = requests.get(GOOGLE_BOOKS_API_URL, params=params)

            if response.status_code == 200:
                return JsonResponse(response.json(), safe=False)
            else:
                return JsonResponse({'error': 'Failed to fetch book info'}, status=response.status_code)
                    
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@method_decorator(csrf_exempt, name='dispatch')
class AddBookView(APIView):    
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print('Here')
        data = json.loads(request.body)
        user = request.user
        
        title =  data.get('title')
        authors = ', '.join(data.get('authors', []))
        thumbnail = data.get('thumbnail')
        description = data.get('description')
        categories = ', '.join(data.get('categories', []))
        
        book, created = Book.objects.get_or_create(
            title=title,
            authors=authors,
            defaults={
                'thumbnail': thumbnail,
                'description': description,
                'categories': categories,
            }
        )
        
        userBook, userBookCreated = UserBook.objects.get_or_create(user=user, book=book)
        if userBookCreated:
            return JsonResponse({'message': 'Book added successfully!'}, status=201)
        else:
            return JsonResponse({'message': 'Book already exists in your shelf'}, status=200)

# @method_decorator(csrf_exempt, name='dispatch')
class FetchBooksOnShelfView(APIView):    
    permission_classes = [IsAuthenticated]

    def get(self, request):        
        user = request.user
    
        user_books = UserBook.objects.filter(user=user).select_related('book')
        books = [user_book.book for user_book in user_books]
        
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)