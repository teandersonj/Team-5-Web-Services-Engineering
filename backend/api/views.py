from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from api.apiserializers.tokenserializer import MyTokenObtainPairSerializer
from api.serializer import RegisterSerializer
from api.serializer import CurrentUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status

#class MyTokenObtainPairView(TokenObtainPairView):
#    serializer_class = MyTokenObtainPairSerializer


#class RegisterView(generics.CreateAPIView):
#    queryset = User.objects.all()
#    permission_classes = (AllowAny,)
#    serializer_class = RegisterSerializer

# # Need to extract this to the proper separate file
# class CurrentUserViewSet(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = CurrentUserSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def getRoutes(request):
    routes = [
        '/api/user/'  # Get user-specifc/account level information
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/player/',
        '/api/test/'
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


# TODO: Extract this to the proper separate file
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
# def playerInfo(request):
def userInfo(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'data': {"username": request.user.username,
                                  "first_name": request.user.first_name, "last_name": request.user.last_name,
                                  "email": request.user.email}}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email
        }
        return Response(data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
