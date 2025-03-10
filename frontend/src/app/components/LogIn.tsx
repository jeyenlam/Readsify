'use client'
import React, { useState } from 'react'
import { useAppContext } from '@/app/provider'
import logo from '../../../public/R.png'
import Image from 'next/image'

const LogIn = () => {
  const { handleLogIn, setAuth} = useAppContext()
  const [logInFormData, setLogInFormData] = useState({
    username: '',
    password: ''
  })

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-teal-200 to-blue-300'>
      <Image src={logo} alt='logo' width={100} />
      <form 
        onSubmit={(e) => {
          e.preventDefault(); 
          handleLogIn(logInFormData)
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
            value={logInFormData.username}
            required
            onChange={(e) => setLogInFormData({...logInFormData, username: e.target.value})}
          />
          <label>Password: </label>
          <input
            type='password'
            name='password'
            value={logInFormData.password}
            required
            onChange={(e) => setLogInFormData({...logInFormData, password: e.target.value})}
          />
        </div>
        <button className='w-full bg-teal-600 rounded-md text-slate-50 hover:bg-teal-500 p-1' type='submit'>Log in</button>
        <hr/>
        <div className='flex gap-2 col-span-2 items-center justify-center'>
          <p>Don't have an account?</p>
          <button className='hover:text-teal-600' onClick={() => setAuth("signup")}>Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn