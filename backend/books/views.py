import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

GOOGLE_BOOKS_API_KEY = os.environ.get('GOOGLE_BOOKS_API_KEY')
GOOGLE_BOOKS_API_URL = os.environ.get('GOOGLE_BOOKS_API_URL')

@method_decorator(csrf_exempt, name='dispatch')
class FetchBookInfoView(APIView):    
    permission_classes = [AllowAny]

    def post(self, request):
        
        print('ji')        
        print(GOOGLE_BOOKS_API_URL)
        print(GOOGLE_BOOKS_API_KEY)
    
        searchTerms = json.loads(request.body).get('searchTerms')
        
        if searchTerms:
            params = {'q': searchTerms, 'key': GOOGLE_BOOKS_API_KEY}
            response = requests.get(GOOGLE_BOOKS_API_URL, params=params)

            if response.status_code == 200:
                return JsonResponse(response.json(), safe=False)
            else:
                return JsonResponse({'error': 'Failed to fetch book info'}, status=response.status_code)
                    
        return JsonResponse({'error': 'Invalid request method'}, status=405)
