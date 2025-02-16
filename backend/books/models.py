from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
  title = models.CharField(max_length=255)
  authors = models.CharField(max_length=255)
  thumbnail = models.URLField(null=True, blank=True)
  description = models.TextField(null=True, blank=True)
  categories = models.CharField(max_length=255)

  def __str__(self):
    return self.title
  

class UserBook(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  book = models.ForeignKey(Book, on_delete=models.CASCADE)
  added_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f'{self.user.username} - {self.book.title}'