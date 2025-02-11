'use client'
import React, { useState } from 'react'
import axios from 'axios'

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/signup/', signUpFormData);
      const { access, refresh } = response.data
      
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)

    } catch (error) {
      alert(`An account with this email exists. Try login`)
      console.log('Signup Failed', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit} className='bg-slate-200'>
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