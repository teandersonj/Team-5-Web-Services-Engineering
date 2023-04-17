# api/migrations/0002_create_test_users_and_players.py

from django.conf import settings
from django.db import migrations
from api.apimodels.player import Player  # import Player model
import random

# define user data
USERS_DATA = [
    {'username': 'PixelatedNinja', 'first_name': 'Pixel',
        'last_name': 'Ninja', 'email': 'pixelninja@example.com'},
    {'username': 'GamerGoddess', 'first_name': 'Gamer',
        'last_name': 'Goddess', 'email': 'gamergoddess@example.com'},
    {'username': 'NerdWarrior', 'first_name': 'Nerd',
        'last_name': 'Warrior', 'email': 'nerdwarrior@example.com'},
    {'username': 'CodeWizard', 'first_name': 'Code',
        'last_name': 'Wizard', 'email': 'codewizard@example.com'},
    {'username': 'MasterGamer', 'first_name': 'Master',
        'last_name': 'Gamer', 'email': 'mastergamer@example.com'},
    {'username': 'RetroGamer', 'first_name': 'Retro',
        'last_name': 'Gamer', 'email': 'retrogamer@example.com'},
    {'username': 'GamingFanatic', 'first_name': 'Gaming',
        'last_name': 'Fanatic', 'email': 'gamingfanatic@example.com'},
    {'username': 'VirtualWarrior', 'first_name': 'Virtual',
        'last_name': 'Warrior', 'email': 'virtualwarrior@example.com'},
    {'username': 'DigitalNinja', 'first_name': 'Digital',
        'last_name': 'Ninja', 'email': 'digitalninja@example.com'},
    {'username': 'GamingJunkie', 'first_name': 'Gaming',
        'last_name': 'Junkie', 'email': 'gamingjunkie@example.com'}
]

# define player data
PLAYER_DATA = [
    {'AvatarName': 'avatar1', 'Playstyle': 'Casual', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I am a casual gamer who enjoys playing games in my free time.'},
    {'AvatarName': 'avatar2', 'Playstyle': 'Semi-Casual', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I play games regularly, but I have other priorities in life as well.'},
    {'AvatarName': 'avatar3', 'Playstyle': 'Competitive', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I am a serious gamer who loves to compete and win.'},
    {'AvatarName': 'avatar4', 'Playstyle': 'Casual', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I play games for fun and relaxation.'},
    {'AvatarName': 'avatar1', 'Playstyle': 'Semi-Casual', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I love playing games with my friends and having a good time.'},
    {'AvatarName': 'avatar2', 'Playstyle': 'Competitive', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I am always striving to improve my skills and dominate my opponents.'},
    {'AvatarName': 'avatar3', 'Playstyle': 'Casual', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I like to relax and unwind by playing games after a long day.'},
    {'AvatarName': 'avatar4', 'Playstyle': 'Semi-Casual', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I play games regularly, but I also have other hobbies and interests.'},
    {'AvatarName': 'avatar1', 'Playstyle': 'Competitive', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I am a born competitor and I love nothing more than winning.'},
    {'AvatarName': 'avatar2', 'Playstyle': 'Casual', 'CompositeSkillLevel': random.uniform(0.0, 10.0),
     'Bio': 'I play games for fun and relaxation.'},
]


def create_test_users_and_players(apps, schema_editor):
    User = apps.get_model(settings.AUTH_USER_MODEL)

    for user_data in USERS_DATA:
        # create user
        user = User.objects.create(
            username=user_data['username'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            email=user_data['email'],
        )
        
        user.set_password(user_data['username'] + "Password")
        user.save()

        # create player
        player_data = PLAYER_DATA[random.randint(0, len(PLAYER_DATA)-1)]
        player_data['CompositeSkillLevel'] = round(
            player_data['CompositeSkillLevel'], 2)
        player = Player.objects.create(
            pk=user.pk,
            AvatarName=player_data['AvatarName'],
            Playstyle=player_data['Playstyle'],
            CompositeSkillLevel=player_data['CompositeSkillLevel'],
            Bio=player_data['Bio'],
            user_id=user.pk
        )

        # print confirmation message
        print(f'Created user {user.username} with player data {player_data}')


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_test_users_and_players),
    ]
