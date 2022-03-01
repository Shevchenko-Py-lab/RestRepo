import React from 'react'


const UserItem = ({user}) => {
   return (
       <tr>
           <td>
               {user.first_name}
           </td>
           <td>
               {user.last_name}
           </td>
           <td>
               {user.user_name}
           </td>
       </tr>
   )
}

const UserList = ({users}) => {
   return (
       <table>
           <th>
               First name
           </th>
           <th>
               Last Name
           </th>
           <th>
               Username
           </th>
           {users.map((user) => <UserItem user={user} />)}
       </table>
   )
}


export default UserList