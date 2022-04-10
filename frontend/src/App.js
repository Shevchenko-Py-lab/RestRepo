import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Projects.js';
import ToDoList from './components/ToDo.js';
import UserProjectList from './components/UserProject.js'
import axios from 'axios'
import {BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'

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
        'todos': []
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                <nav>
                    <ul>
                        <li><Link to='/'>Projects</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                        <li><Link to='/todo'>ToDo</Link></li>
                    </ul>
                </nav>
                    <Routes>
                        <Route path='/todo' element={() => <ToDoList items={this.state.todos} />} />
                        <Route path='/projects' element={() => <ProjectList items={this.state.projects} />} />

                        <Route path="/projects/:id">
                            <ProjectList projects={this.state.projects} />
                        </Route>

                       <Route path="/users/:id">
                            <UserProjectList items={this.state.projects} />
                        </Route>

                        <Navigate from='/users' to='/' />
                        <Route component={NotFound404} />
                    </Routes>

                </BrowserRouter>

            </div>

        )
    }
}



export default App;
