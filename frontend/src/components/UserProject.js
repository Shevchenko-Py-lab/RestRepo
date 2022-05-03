import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.user.user_name}</td>
            <td><button type='button'>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.user.id == id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>USER</th>
                <th></th>
            </tr>
            {filtered_items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectList
