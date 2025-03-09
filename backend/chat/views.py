import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationSummaryMemory
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize LLM with memory
llm = ChatOpenAI(model="gpt-3.5-turbo")
memory = ConversationSummaryMemory(llm=llm)
chat = ConversationChain(llm=llm, memory=memory)

@method_decorator(csrf_exempt, name='dispatch')
class Chat(APIView):    
    permission_classes = [IsAuthenticated]

    def post(self, request):
      user_input = request.data.get("query", "")
    
      if not user_input:
          return Response({"error": "Please provide a query"}, status=400)
      
      response = chat.predict(input=user_input)
      return Response({"response": response})