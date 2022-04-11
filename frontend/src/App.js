import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import ToDoList from './components/ToDo.js';
import UserProjectList from './components/UserProject.js'
import LoginForm from './components/Auth.js'
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
                        path='/'
                        element={<ProjectList items={this.state.projects} />}
                    />
                    <Route
                        path='/users'
                        element={<UserList items={this.state.users} />}
                    />
                    <Route
                        path='/todo'
                        element={<ToDoList items={this.state.todo} />}
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
