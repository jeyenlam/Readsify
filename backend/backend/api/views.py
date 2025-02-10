from transformers import pipeline
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Load the model
classifier = pipeline("sentiment-analysis")

@api_view(['POST'])
def classify_text(request):
    text = request.data.get('text')
    result = classifier(text)
    return Response(result)
