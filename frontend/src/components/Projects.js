import React from 'react'


const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>
               {project.project_name}
           </td>
           <td>
               {project.project_priority}
           </td>
           <td>

              /* {project.user_responsible}
              Objects are not valid as a React child (found: object with keys {user_name}).
              If you meant to render a collection of children, use an array instead.*/

           </td>
       </tr>
   )
}

const ProjectList = ({projects}) => {
   return (
       <table>
           <th>
               Project
           </th>
           <th>
               Priority
           </th>
           <th>
               // Username
           </th>
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}


export default ProjectList