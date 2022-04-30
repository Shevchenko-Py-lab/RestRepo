import graphene
from graphene_django import DjangoObjectType
from users.models import User
from todo.models import ToDo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)

    user_by_name = graphene.Field(UserType,
                                  user_name=graphene.String(required=True))

    projects_by_user_name = graphene.List(ProjectType,
                                          user_name=graphene.String(required=False))

    def resolve_user_by_name(self, info, user_name):
        try:
            return User.objects.get(user_name=user_name)
        except User.DoesNotExist:
            return None

    def resolve_projects_by_user_name(self, info, name=None):
        projects = Project.objects.all()
        todos = Project.objects.all()
        if name:
            projects = projects.filter(user_responsible__name=name)
            todos = projects.filter(users_responsible__name=name)
        return projects, todos

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
