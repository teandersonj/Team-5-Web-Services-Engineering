from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from api.apimodels.player import Player

@api_view(['GET'])
@permission_classes([AllowAny])
def getRoutes(request):
    routes = [
        '/api/user/',  # Get user-specifc/account level information
        '/api/token/',
        '/api/token/verify/',
        '/api/token/blacklist/',
        '/api/player/<int:userid>',
        '/api/players/',
        '/api/blockedplayers/',
        '/api/friends/',
        '/api/game/<int:gameid>',
        '/api/games/',
        '/api/passwordchange/',
        '/api/login',
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userInfo(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({"id": request.user.id, "username": request.user.username,
                                  "first_name": request.user.first_name, "last_name": request.user.last_name,
                                  "email": request.user.email}, status=status.HTTP_200_OK)



#@api_view(['POST'])
#def register(request):
#    serializer = RegisterSerializer(data=request.data)
#    if serializer.is_valid():
#        user = serializer.save()
#        data = {
#            'id': user.id,
#            'first_name': user.first_name,
#            'last_name': user.last_name,
#            'username': user.username,
#            'email': user.email
#        }
#        return Response(data, status=status.HTTP_201_CREATED)
#    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
