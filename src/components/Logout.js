import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate=useNavigate();
  return (
    <div className='flex items-center justify-around  '>
        <button onClick={()=>{navigate('/login')}} className='button my-10'>Please login First to access this page</button>
    </div>
  )
}
