# Generated by Django 4.1.6 on 2023-04-05 18:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('GameId', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, unique=True)),
                ('Name', models.CharField(max_length=100, unique=True)),
                ('Image', models.CharField(max_length=300)),
                ('Genre', models.CharField(max_length=300)),
                ('Platform', models.IntegerField()),
                ('PlayerCount', models.IntegerField()),
                ('Map', models.CharField(max_length=300)),
                ('Gamemode', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('AvatarName', models.CharField(max_length=300)),
                ('Playstyle', models.CharField(max_length=100)),
                ('CompositeSkillLevel', models.FloatField(default=0.0)),
                ('Attitude', models.CharField(max_length=100)),
                ('user', models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ActiveStatus', models.BooleanField(default=True)),
                ('FriendPlayer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='FriendPlayer', to='api.player')),
                ('Primary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Primary', to='api.player')),
            ],
            options={
                'unique_together': {('Primary', 'FriendPlayer')},
            },
        ),
        migrations.CreateModel(
            name='BlockedPlayer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Blocked', models.BooleanField(default=True)),
                ('BlockedPlayer', models.ForeignKey(db_column='BlockedPlayer', on_delete=django.db.models.deletion.CASCADE, related_name='BlockedPlayer', to='api.player')),
                ('Player1', models.ForeignKey(db_column='Player1', on_delete=django.db.models.deletion.CASCADE, related_name='Player1', to='api.player')),
            ],
            options={
                'unique_together': {('Player1', 'BlockedPlayer')},
            },
        ),
    ]
