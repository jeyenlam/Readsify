'use client'
import React, { useState } from 'react'
import { useAppContext } from '@/app/provider'

const SignUp = () => {
  const { handleSignUp } = useAppContext()
  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault()
          handleSignUp(signUpFormData)

      }} className='bg-slate-200'>
        <div className='grid grid-cols-2'>
          <label>Username: </label>
          <input 
            type='text'
            name='name' 
            value={signUpFormData.username}
            onChange={(e) => setSignUpFormData({...signUpFormData, username: e.target.value})}
            required/>
          <label>Email: </label>
          <input 
            type='email'
            name='email'
            value={signUpFormData.email}
            onChange={(e) => setSignUpFormData({...signUpFormData, email: e.target.value})}
            required/>
          <label>Password: </label>
          <input
            type='password'
            name='password'
            value={signUpFormData.password}
            onChange={(e) => setSignUpFormData({...signUpFormData, password: e.target.value})}
            required/>
        </div>
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}

export default SignUp