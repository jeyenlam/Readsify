'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Auth = () => {
  const router = useRouter()

  useEffect(() => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        router.push('/')
      }
      console.log(accessToken)
    }, [])
  
  return (
    <div>
      <button onClick={ () => router.push('/auth/signup')}>Signup</button>
      <button onClick={ () => router.push('/auth/login')}>Login</button>
    </div>
  )
}

export default Auth