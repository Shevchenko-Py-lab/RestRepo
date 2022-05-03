import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from users.views import UserModelViewSet
from users.models import User
from todo.models import ToDo, Project


class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'user_name': 'Пушкин',
                                               'password': 'django', 'email': 'testfortest@mail.ru'}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = Project.objects.create(project_name='Библиотека', project_priority='Низкий')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')

        self.client.login(username='admin', password='admin123456')
        response = client.put(f'/api/projects/{project.uid}/', {'project_name': 'Магазин',
                                                                'project_priority': 'Высокий'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(uid=project.uid)
        self.assertEqual(project.project_name, 'Магазин')
        self.assertEqual(project.project_priority, 'Высокий')
        client.logout()


class TestBookViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        todo = mixer.blend(ToDo, task_text='Выпустить патч')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.uid}/', {'task_text': 'Выпустить патч',
                                                               'project': todo.task_id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(uid=todo.task_id)
        self.assertEqual(todo.task_text, 'Выпустить патч')
