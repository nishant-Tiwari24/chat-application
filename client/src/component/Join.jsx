import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Join = () => {
    const [name, setName] = useState('');
    const [room,setRoom] = useState('')

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>  
      <div className='w-full max-w-sm bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-xl font-bold text-center mb-4'>Join Room</h1>
        <div className='mb-4'>
          <input type="text" placeholder='Name' className='w-full px-3 py-2 rounded-lg border-transparent bg-zinc-200' onChange={(e) => {setName(e.target.value)}} />
        </div>
        <div>
          <input type="text" placeholder='Room' className='w-full px-3 py-2 rounded-lg border-transparent bg-zinc-200' onChange={(e) => {setRoom(e.target.value)}} />
        </div>
        <Link onClick={e => (!name || !room)? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} >
            <button className='w-full py-2 mt-4 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600'>Join</button>
        </Link>
      </div>
    </div>
  )
}

export default Join

