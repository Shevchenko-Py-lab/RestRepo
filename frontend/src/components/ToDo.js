import React from 'react'
import {Link} from 'react-router-dom'

const ToDoItem = ({todo, deleteToDo}) => {
   return (
       <tr>
           <td>{todo.task_id}</td>
           <td>{todo.task_text}</td>
           <td>{todo.is_active}</td>
           <td><button type='button'>Delete</button></td>
           <td><button onClick={()=>deleteToDo(todo.id)}
           type='button'>Delete</button></td>
       </tr>
   )
}

const ToDoList = ({todos, deleteToDo}) => {

    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Active task</th>
                    <th></th>
                </tr>
            </thead>
           {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
       </table>
       <Link to='/todo/create'>Create</Link>
       </div>
   )
}

export default ToDoList