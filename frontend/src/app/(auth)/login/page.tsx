'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LogIn = () => {
  const router = useRouter()
  const [logInFormData, setLogInFormData] = useState({
    username: '',
    password: ''
  })

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', logInFormData);
      const { access, refresh } = response.data
      console.log(response)

      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)

      router.push('/')

    } catch (error) {
      console.log('Signup Failed', error)
    }
  }

  useEffect(() => {
    
  }
  ,[])

  return (
    <div>
      <form onSubmit={handleOnSubmit} className='bg-slate-200'>
        <div className='grid grid-cols-2'>
          <label>Username: </label>
          <input 
            type='text'
            name='name' 
            value={logInFormData.username}
            onChange={(e) => setLogInFormData({...logInFormData, username: e.target.value})}
            required/>
          <label>Password: </label>
          <input
            type='password'
            name='password'
            value={logInFormData.password}
            onChange={(e) => setLogInFormData({...logInFormData, password: e.target.value})}
            required/>
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default LogIn