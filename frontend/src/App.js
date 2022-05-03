import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import ToDoList from './components/ToDo.js';
import UserProjectList from './components/UserProject.js'
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js';
import ToDoForm from './components/ToDoForm.js';
import axios from 'axios'
import {BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        'users': [],
        'projects': [],
        'todo': [],
        'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
            cookies.set('token', token)
            this.setState({'token': token}, ()=>this.load_data())
            }
        is_authenticated() {
            return this.state.token != ''
        }
            logout() {
                this.set_token('')
        }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
        }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
            console.log(response.data)
            }).catch(error => alert('Неверный логин или пароль'))
        }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
    if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                this.setState({todos: response.data})
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(project_name, user_responsible) {
        const headers = this.get_headers()
        const data = {project_name: project_name, user_responsible: user_responsible}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
                let new_project = response.data
                const user_responsible = this.state.users.filter((item) => item.id ===
            new_project.user_responsible)[0]
                new_project.user_responsible = user_responsible
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers, headers})
            .then(response => {
                this.setState({todo: this.state.projects.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

        createToDo(task_text, users_responsible) {
        const headers = this.get_headers()
        const data = {task_text: task_text, users_responsible: users_responsible}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
                let new_todo = response.data
                const users_responsible = this.state.users.filter((item) => item.id ===
            new_todo.users_responsible)[0]
                new_todo.users_responsible = users_responsible
                this.setState({todo: [...this.state.todo, new_todo]})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                <nav>
                    <Link to="/">Projects</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/todo">ToDo</Link>
                    <Link to="/login">Login</Link>
                </nav>


                <Routes>
                    <Route
                        path='/users'
                        element={<UserList items={this.state.users} />}
                    />
                    <Route
                        path='/'
                        element={<ProjectList items={this.state.projects} />}
                    />
                    <Route
                        exact path='/'
                        element={() => <ProjectList items={this.state.projects}
                        deleteProject={(id)=>this.deleteProject(id)} />}
                    />
                    <Route
                        path='/create'
                        element={() => <ProjectForm
                        createProject={(project_name, user_responsible) =>
                        this.createProject(project_name, user_responsible)} />}
                    />
                    <Route
                        path='/' component={() => <ProjectList
                        items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />}
                    />
                    <Route
                        path='/todo'
                        element={<ToDoList items={this.state.todo} />}
                    />
                    <Route
                        exact path='/todo'
                        element={() => <ToDoList items={this.state.todo}
                        deleteToDo={(id)=>this.deleteToDo(id)} />}
                    />
                    <Route
                        path='/todo/create'
                        element={() => <ToDoForm
                        createToDo={(task_text, users_responsible) => this.createProject(task_text, users_responsible)} />}
                    />
                    <Route
                        path='/todo' component={() => <ToDoList
                        items={this.state.todo} deleteToDo={(id)=>this.deleteToDo(id)} />}
                    />
                    <Route
                        path='/login'
                        element={<LoginForm />}
                    />
                    <Route
                        path='/login'
                        element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />}
                    />

                    <Route path="/users/:id">
                        <UserProjectList items={this.state.projects} />
                    </Route>

                    <Route path="*" element={NotFound404} />

                </Routes>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
