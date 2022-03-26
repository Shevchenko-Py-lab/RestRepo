import React from 'react'


const ProjectItem = ({project}, {users}) => {
   return (
       <tr>
           <td>{project.project_name}</td>
           <td>{project.project_priority}</td>
           <td>{project.users_user.user_name}</td>
       </tr>
   )
}


const ProjectList = ({projects}) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Username</th>
                </tr>
            </thead>
           {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList