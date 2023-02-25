https://blog.devgenius.io/django-rest-framework-react-authentication-workflow-2022-part-2-d299b7fef875

https://sushil-kamble.medium.com/django-rest-framework-react-authentication-workflow-2022-part-1-a21f22b3f358

https://blog.devgenius.io/django-rest-framework-react-authentication-workflow-2022-part-2-d299b7fef875

https://docs.djangoproject.com/en/4.1/contents/

api/token/ - get with username/password gives a bearer token and refresh token
example request payload:
{
    "username": "root",
    "password": "password"
}
example response payload:

{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MTYxNTA4MiwiaWF0IjoxNjc3Mjk1MDgyLCJqdGkiOiI1ZDkxNGJiMjEwMDg0ZWZmYTkyMTg3YzY0Yzc5NGNkNyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoicm9vdCIsImVtYWlsIjoicm9vdEBhYmMuY29tIn0.vE5f3X-iys9HusXUCt4ldbat9IALVyGYIVY-bpMigk4",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3Mjk1MzgyLCJpYXQiOjE2NzcyOTUwODIsImp0aSI6IjBiMWVkMDY2ZjdiZjQ5MGM5MGVlOWU0ZGIyMDgyM2MyIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJyb290IiwiZW1haWwiOiJyb290QGFiYy5jb20ifQ.8q5Kv89osTGfYIKhWPZ88E1OEWReClg0Mp7W1RhAs_0"
}

api/token/refresh/
example request payload:
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MTYxNTA4MiwiaWF0IjoxNjc3Mjk1MDgyLCJqdGkiOiI1ZDkxNGJiMjEwMDg0ZWZmYTkyMTg3YzY0Yzc5NGNkNyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoicm9vdCIsImVtYWlsIjoicm9vdEBhYmMuY29tIn0.vE5f3X-iys9HusXUCt4ldbat9IALVyGYIVY-bpMigk4"
}
example response payload:
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3Mjk1NzA4LCJpYXQiOjE2NzcyOTUzNzQsImp0aSI6IjNhNmVlMmUzNTk5MzRiYzA4ZWZkZDgzOTU4NDkzZGY1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJyb290IiwiZW1haWwiOiJyb290QGFiYy5jb20ifQ.xAW0hMTE0H-0SbZ2HlOWE47psrFXxNxopGfFyN7D4EU",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MTYxNTQwOCwiaWF0IjoxNjc3Mjk1NDA4LCJqdGkiOiI0MWViMWM5N2FmYzM0ODY2YWQ3MDA3NWU0ZDAwOTUyZSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoicm9vdCIsImVtYWlsIjoicm9vdEBhYmMuY29tIn0.TAXAMc35P5HATrtv7rlEQ4zxL8ahKlgFP4v4M2M5c2g"
}

api/token/blacklist/
example request payload:
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MTYxNTA4MiwiaWF0IjoxNjc3Mjk1MDgyLCJqdGkiOiI1ZDkxNGJiMjEwMDg0ZWZmYTkyMTg3YzY0Yzc5NGNkNyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoicm9vdCIsImVtYWlsIjoicm9vdEBhYmMuY29tIn0.vE5f3X-iys9HusXUCt4ldbat9IALVyGYIVY-bpMigk4"
}
example response payload:
{}

api/token/verify/
example request payload:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MTYxNTA4MiwiaWF0IjoxNjc3Mjk1MDgyLCJqdGkiOiI1ZDkxNGJiMjEwMDg0ZWZmYTkyMTg3YzY0Yzc5NGNkNyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoicm9vdCIsImVtYWlsIjoicm9vdEBhYmMuY29tIn0.vE5f3X-iys9HusXUCt4ldbat9IALVyGYIVY-bpMigk4"
}

api/player/<pk>
example request: 
api/player/1(http-get) or http-put(update) - player information
{
    "PlayerId": 1,
    "Username": "abc123",
    "Email": "hello@world.com",
    "AvatarName": "Popeye",
    "Playstyle": "Passive",
    "CompositeSkillLevel": 1.0,
    "Attitude": "Bad"
}
example response:
{
    "PlayerId": 1,
    "Username": "abc123",
    "Email": "hello@world.com",
    "AvatarName": "Popeye",
    "Playstyle": "Passive",
    "CompositeSkillLevel": 1.0,
    "Attitude": "Bad"
}

api/players/
example request: 
	http-get w/o parameters 
	http-get with ?search=somethingtosearchby
	fields searched - ['Username', 'Email', 'Playstyle', 'CompositeSkillLevel', 'Attitude']
example response:
[
    {
        "PlayerId": 1,
        "Username": "abc123",
        "Email": "hello@world.com",
        "AvatarName": "Popeye",
        "Playstyle": "Passive",
        "CompositeSkillLevel": 1.0,
        "Attitude": "Bad"
    },
    {
        "PlayerId": 2,
        "Username": "123abc",
        "Email": "world@hello.com",
        "AvatarName": "OliveOil",
        "Playstyle": "Aggressive",
        "CompositeSkillLevel": 2.0,
        "Attitude": "Good"
    },
    {
        "PlayerId": 3,
        "Username": "1a2b3c",
        "Email": "end-of-theworld@hello.com",
        "AvatarName": "Hamburglar",
        "Playstyle": "Chill",
        "CompositeSkillLevel": 1.5,
        "Attitude": "Meh"
    },
    {
        "PlayerId": 4,
        "Username": "root",
        "Email": "root@abc.com",
        "AvatarName": "Hamburglar",
        "Playstyle": "Chill",
        "CompositeSkillLevel": 1.5,
        "Attitude": "Meh"
    }
]

api/game/<pk>
example request: 
api/api/game/1(http-get) with no payload or http-put(update) - game information
{
    "GameId": 1,
    "Name": "Zelda",
    "Image": "NA",
    "Genre": "Fantasy",
    "Platform": 0,
    "PlayerCount": 1,
    "Map": "NA",
    "Gamemode": "2D"
}

api/games/
example request: api/games/ with no payload
example response:
[
    {
        "GameId": 1,
        "Name": "Zelda",
        "Image": "NP",
        "Genre": "Fantasy",
        "Platform": 0,
        "PlayerCount": 1,
        "Map": "NA",
        "Gamemode": "2D"
    },
    {
        "GameId": 2,
        "Name": "Smash Brothers",
        "Image": "NA",
        "Genre": "Fantasy",
        "Platform": 6,
        "PlayerCount": 10,
        "Map": "NA",
        "Gamemode": "1P"
    }
]

api/register/ - endpoint to register new username
example post request:
{
    "username": "",
    "password": "",
    "password2": ""
}
example response:
{
    "username": "chwill"
}

api/test/ - example authenticated user api request using bearer token
response from http-get sending a bearer token for auth:
{
    "response": "Congratulation root, your API just responded to GET request"
}