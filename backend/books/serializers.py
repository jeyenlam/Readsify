from rest_framework import serializers
from .models import Book, UserBook

class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = '__all__'  # Or list specific fields if needed
