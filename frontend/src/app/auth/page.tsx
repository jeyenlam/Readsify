'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Auth = () => {
  const router = useRouter()

  return (
    <div>
      <button className='default-button' onClick={ () => router.push('/auth/signup')}>Signup</button>
      <button className='default-button' onClick={ () => router.push('/auth/login')}>Login</button>
    </div>
  )
}

export default Auth