'use client'
import React, { useState } from 'react'
import { useAppContext } from '@/app/provider'
import Image from 'next/image'
import logo from '../../../public/R.png'

const SignUp = () => {
  const { handleSignUp, setAuth} = useAppContext()
  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-teal-200 to-blue-300'>
      <Image src={logo} alt='logo' width={100} />
      <form onSubmit={(e) => {
          e.preventDefault()
          handleSignUp(signUpFormData)
        }} 
        className='mt-5 bg-slate-100 flex flex-col gap-5 p-5 rounded-md border border-sinc-200'
      >
        <p className='text-center text-sm'>Reasify, an AI-powered book recommender web app</p>
        <hr/>
        <div className='grid grid-cols-2 gap-5'>
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
        <button type='submit' className='w-full bg-teal-600 rounded-md text-slate-50 hover:bg-teal-500 p-1'>Log in</button>
        <hr/>
        <div className='flex gap-2 col-span-2 items-center justify-center'>
          <p>Already have an account?</p>
          <button className='hover:text-teal-600' onClick={() => setAuth("login")}>Log in</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp