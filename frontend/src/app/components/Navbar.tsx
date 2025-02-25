"use client"
import React from 'react'
import { useAppContext } from '../provider'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const { 
    isActive,
    handleLogOut
  } = useAppContext()

  return (
    <nav className='flex gap-10'>
      <ul className='flex gap-10'>
        <li><a href='/' className={`${isActive === '/' ? ' bg-zinc-200' : ''} flex gap-1 p-2 rounded-md`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>Home</a></li>
        <li><a href='/library' className={`${isActive === '/library'  ? 'p-1 bg-zinc-200' : ''} flex gap-1 p-2 rounded-md`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>My Library</a></li>
      </ul>
      <button onClick={handleLogOut}>Log out</button>
    </nav>
  )
}

export default Navbar