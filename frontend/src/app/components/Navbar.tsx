import React from 'react'
import { useAppContext } from '../provider'

const Navbar = () => {
  const { handleLogOut } = useAppContext()
  
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