import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfilePage({viewUser}) {
    console.log(viewUser)

    const navigate = useNavigate()

  return (
    <div>
        <p>{viewUser.id}</p>
        <p>{viewUser.name}</p>
    </div>
  )
}

export default ProfilePage