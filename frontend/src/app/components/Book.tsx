"use client"
import React from 'react'
import { Book as BookType } from '../lib/interface'
import { useAppContext } from '../provider'
import unavailableCover from '@/../public/unavailable-cover.jpg'

const Book: React.FC<{ book: BookType, fullyDisplayed: boolean }> = ({ book, fullyDisplayed }) => {
  const { handleDeleteBookFromShelf } = useAppContext()
  
  return (
    (fullyDisplayed ? <div className='flex gap-4 rounded-sm p-2'>
      <img src={book.thumbnail === '' ? unavailableCover.src : book.thumbnail} alt={book.title} width={120} height={80} />
      <div className='w-96 flex flex-col gap-4'>
        <div>
          <h1>{book.title}</h1>
          <p className='text-sm opacity-50'>{book.authors}</p>
          <p className='text-xs opacity-50'>{book.categories}</p>
        </div>
        <p className='opacity-90 text-sm'>{book.description}</p>
      </div>      
    </div> :
    <div className='flex flex-col justify-between gap-4 rounded-sm p-2'>
      
      { book.thumbnail && (<div className='relative group'>
        <img className='relative group' src={book.thumbnail === '' ? unavailableCover.src : book.thumbnail}  alt={book.title}width={120} height={80}/>
        <button onClick={ () => handleDeleteBookFromShelf(book) } className=' group-hover:block hidden absolute top-1 right-1 bg-white p-1 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>)}

    </div>)
  )
}

export default Book