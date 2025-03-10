'use client'
import React, { useState } from 'react'
import { useAppContext } from '@/app/provider'
import logo from '../../../public/R.png'
import Image from 'next/image'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'

const Auth = () => {
  const { handleLogIn, handleSignUp, auth, setAuth } = useAppContext()
  const [logInFormData, setLogInFormData] = useState({
    username: '',
    password: ''
  })

  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  return (
    auth === "login" ? <LogIn/> : <SignUp/>
  )

}

export default Auth