'use client'
import React, { useState } from 'react'
import { useAppContext } from '@/app/provider'

const LogIn = () => {
  const { handleLogIn } = useAppContext()
  const [logInFormData, setLogInFormData] = useState({
    username: '',
    password: ''
  })

  return (
    <div className='flex justify-center'>
      <form 
        onSubmit={(e) => {
          e.preventDefault(); 
          handleLogIn(logInFormData)
          }}
        className='bg-slate-200'
      >
        <div className='grid grid-cols-2'>
          <label>Username: </label>
          <input type='text'name='name'value={logInFormData.username} required
            onChange={(e) => setLogInFormData({...logInFormData, username: e.target.value})}
          />
          <label>Password: </label>
          <input type='password' name='password' value={logInFormData.password} required
            onChange={(e) => setLogInFormData({...logInFormData, password: e.target.value})}
          />
        </div>
        <button className='default-button' type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default LogIn