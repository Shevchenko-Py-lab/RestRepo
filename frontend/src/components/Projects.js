import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>{project.project_name}</td>
           <td>{project.project_priority}</td>
           <td><button type='button'>Delete</button></td>
           <td><button onClick={()=>deleteProject(project.id)}
           type='button'>Delete</button></td>
       </tr>
   )
}


const ProjectList = ({projects, deleteProject}) => {

    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Priority</th>
                    <th></th>
                </tr>
            </thead>
           {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/create'>Create</Link>
        </div>

    )
}

export default ProjectList