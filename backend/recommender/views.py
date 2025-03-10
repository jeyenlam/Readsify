from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv
import pandas as pd
from langchain.docstore.document import Document
import os
from django.conf import settings
import numpy as np

load_dotenv()

PREPROCCESSED_BOOK_DATA_FILE = os.path.join(settings.BASE_DIR, "training", "preprocessed_book_data.csv")
print(PREPROCCESSED_BOOK_DATA_FILE)
books = pd.read_csv("./../training/preprocessed_book_data.csv")

def get_chroma_db():
    """Initialize Chroma only when needed"""
    documents = [
        Document(
            page_content=f"Title: {row['title']}, Description: {row['description']}",
            metadata={"title": row["title"], "categories": row["categories"]},
        )
        for _, row in books.iterrows()
    ]
    return Chroma.from_documents(documents, OpenAIEmbeddings())

# Store Chroma instance globally (but lazy-load)
db_books = None

def retrieve_books(query: str, top_k: int = 10) -> list:
  
  global db_books
  if db_books is None:
    db_books = get_chroma_db()  # Lazy-load Chroma
  
  retrieved_books = db_books.similarity_search(query, k=20)

  books_list = [doc.metadata["title"] for doc in retrieved_books]
  
  books_df = books[books["title"].isin(books_list)].copy()
  books_df = books_df.replace({np.nan: ""})   # Replace NaN values with an empty string

  # Convert DataFrame to JSON-serializable format
  return books_df.to_dict(orient="records")

@method_decorator(csrf_exempt, name='dispatch')
class Recommender(APIView):    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
      user_input = request.data.get("query", "")
    
      if not user_input:
        return Response({"error": "Please provide a query"}, status=400)
      
      response = retrieve_books(user_input)
      return Response({"book_recs": response})