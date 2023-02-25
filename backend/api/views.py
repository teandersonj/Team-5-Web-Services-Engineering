from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from api.apiserializers.tokenserializer import MyTokenObtainPairSerializer
from api.serializer import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated


#class MyTokenObtainPairView(TokenObtainPairView):
#    serializer_class = MyTokenObtainPairSerializer


#class RegisterView(generics.CreateAPIView):
#    queryset = User.objects.all()
#    permission_classes = (AllowAny,)
#    serializer_class = RegisterSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def getRoutes(request):
    routes = [
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


#@api_view(['GET', 'POST'])
#@permission_classes([IsAuthenticated])
#def playerInfo(request):
#    if request.method == 'GET':
#        data = f"Congratulation {request.user}, your API just responded to GET request"
#        return Response({'response': data}, status=status.HTTP_200_OK)
#    elif request.method == 'POST':
#        text = request.POST.get('text')
#        data = f'Congratulation your API just responded to POST request with text: {text}'
#        return Response({'response': data}, status=status.HTTP_200_OK)
#    return Response({}, status.HTTP_400_BAD_REQUEST)
