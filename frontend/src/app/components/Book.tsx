"use client"
import React from 'react'
import { Book as BookType } from '../lib/interface'
import { useAppContext } from '../provider'
import unavailableCover from '@/../public/unavailable-cover.jpg'

const Book: React.FC<{ book: BookType, fullyDisplayed: boolean }> = ({ book, fullyDisplayed }) => {
  const { handleDeleteBookFromShelf } = useAppContext()
  
  return (
    (fullyDisplayed 
      ? <div className='flex gap-4 rounded-sm p-2'>
          <img src={book.thumbnail === '' ? unavailableCover.src : book.thumbnail} alt={book.title} width={120} height={80} />
          <div className='w-96 flex flex-col gap-4'>
            <div>
              <h1>{book.title}</h1>
              <p className='text-sm opacity-50'>{book.authors}</p>
              <p className='text-xs opacity-50'>{book.categories}</p>
            </div>
            <p className='opacity-90 text-sm'>{book.description.length > 250 ? book.description.substring(0,250) + " ..." : book.description}</p>
          </div>      
        </div> 
      :  <div className='flex flex-col justify-between gap-4 rounded-sm p-2'>
          { book.thumbnail && (<div className='relative group'>
            <img className='relative group' src={book.thumbnail === '' ? unavailableCover.src : book.thumbnail}  alt={book.title}width={120} height={80}/>
            <button onClick={ () => handleDeleteBookFromShelf(book) } className=' group-hover:block hidden absolute top-1 right-1 bg-zinc bg-zinc-100 hover:scale-110 duration-75 rounded-full w-30'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
            </button>
          </div>)}
        </div>)
  )
}

export default Book