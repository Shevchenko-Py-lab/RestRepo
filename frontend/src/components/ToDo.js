import React from 'react'

const ToDoItem = ({todo}) => {
   return (
       <tr>
           <td>{todo.task_id}</td>
           <td>{todo.task_text}</td>
           <td>{todo.is_active}</td>
       </tr>
   )
}

const ToDoList = ({todos}) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Active task</th>
                </tr>
            </thead>
           {todos.map((todo) => <ToDoItem todo={todo} />)}
       </table>
   )
}

export default ToDoList