'use client'
import Navbar from '@/app/components/Navbar'
import React, { useEffect } from 'react'
import Book from '@/app/components/Book'
import { useAppContext } from '@/app/provider'

const Library = () => {
  const {
    book,
    newBookSaved,
    searchTerms,
    booksOnShelf,
    setBook,
    setNewBookSaved,
    setBooksOnShelf,
    setSearchTerms,
    handleFetchBooksOnShelf,
    handleSearchBook,
    handleAddBook
  } = useAppContext()

  
  useEffect(() => {
    handleFetchBooksOnShelf()
  }, [setBooksOnShelf, newBookSaved])

  return (
    <div className="flex flex-col justify-start items-start overflow-y-scrollable h-screen">
      <Navbar/>
      <form onSubmit={(e) => {e.preventDefault(); handleSearchBook(searchTerms)}} className='p-2 w-screen gap-4 flex justify-end bg-slate-100'>
        <input className='bg-transparent h-12 border-none outline-none p-2 w-60 text-zinc-500' type='text' required placeholder='Search a book' onChange={(e) => setSearchTerms(e.target.value)}/>
        <button className='bg-transparent border-none' type='submit'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        </button>
      </form>

      <div className='relative flex w-full bg-slate-100'>
        {book && 
        <div className='p-4 flex flex-col gap-2 items-start'>
          <Book key={book.title} book={book} fullyDisplayed={true}/>
          <button onClick={() => {handleAddBook(book); setNewBookSaved(false)}} className='default-button'>Add to Book Shelf</button>
        </div>}
        {book && 
          <button onClick={() => setBook(null)} className='absolute right-5 top-0'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>}
      </div>
      <div className='p-4 flex-col w-full '>
        <h1 className='text-2xl border-b-4'>My Book Shelf</h1>
        <div className='flex flex-wrap overflow-y-visible'>
          { booksOnShelf && 
            booksOnShelf.map((bookOnShelf) => <Book key={bookOnShelf.title} book={bookOnShelf} fullyDisplayed={false}/>)
          }
        </div>
      </div>
  </div>
  )
}

export default Library