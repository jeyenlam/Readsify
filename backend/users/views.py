from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class ProtectedView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user = request.user
    return Response({"message": f"Hello, {user.username}! You are authenticated."})
      
class SignUpView(APIView):
  permission_classes = [AllowAny]

  def post(self, request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    
    # Check if email is already used
    if User.objects.filter(email=email).exists():
      return Response({
        'detail': 'Email is already been used. Please log in.'
      }, status=status.HTTP_400_BAD_REQUEST)
      
    # Create new user
    user = User.objects.create_user(
      username=username,
      password=password,
      email=email
    )
    user.save()

    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)


class LogInView(APIView):
  permission_classes = [AllowAny]

  def post(self, request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(username=username, password=password)

    if user is not None:
      # Generate JWT tokens
      refresh = RefreshToken.for_user(user)
      return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
      }, status=status.HTTP_200_OK)
    else:
      return Response({
        'detail': 'Invalid credentials. Please try again.'
      }, status=status.HTTP_401_UNAUTHORIZED)

