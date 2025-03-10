'use client'
import React, { useState } from 'react'
import { useAppContext } from '@/app/provider'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'

const Auth = () => {
  const { auth } = useAppContext()

  return (
    auth === "login" ? <LogIn/> : <SignUp/>
  )
}

export default Auth