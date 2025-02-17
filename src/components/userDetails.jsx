import React from 'react'

function UserDetails({user}) {
    console.log(user);
  return (
    <div>
      <h1>User Credentials:</h1>
      <p>User-Email:{user.email}</p>
      
    </div>
  )
}

export default UserDetails
