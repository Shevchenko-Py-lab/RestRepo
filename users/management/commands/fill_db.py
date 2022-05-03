from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_user(
            username='somebody',
            first_name='Once_told',
            last_name='Me',
            email='MailTest@mail.ru',
        )
