import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const router = useRouter()
  
  const handleLogOut = () => {
    localStorage.clear()
    router.push('/auth')
  }
  
  return (
    <nav>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/library'>My Library</a></li>
      </ul>
      <button onClick={handleLogOut}>Log out</button>
    </nav>
  )
}

export default Navbar