'use client'
import Navbar from '@/app/components/Navbar'
import axios from 'axios'
import React, { useState } from 'react'
import { Book as BookType } from '@/app/lib/interface'
import Book from '@/app/components/Book'

const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

const Library = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [searchTerms, setSearchTerms] = useState('')
  const [book, setBook] = useState<BookType>()

  const handleSearchBook = async (searchTerms: String) => {
    console.log(accessToken)
    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/books/`,
        {
          searchTerms: searchTerms
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      console.log(response.data.items[0])

      const searchedBook = response.data.items[0]

      const searchBook: BookType = {
        title: searchedBook.volumeInfo.title,
        authors: searchedBook.volumeInfo.authors,
        thumbnail: searchedBook.volumeInfo.imageLinks.thumbnail,
        description: searchedBook.searchInfo.textSnippet,
        categories: searchedBook.volumeInfo.categories
      }

      // console.log(searchBook)
      setBook(searchBook)      
    } catch(error) {
      console.error(`Google Book API Fetching Failed: ${error}`)
    }
  }

  const handleAddBook = async (book: BookType) => {
    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/books/add-book/`, 
        {
          title: book.title,
          authors: book.authors,
          thumbnail: book.thumbnail,
          description: book.description,
          categories: book.categories
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (response.status === 201) {
        console.log(response.data.message) //successfully added
      }
      else if (response.status === 200) {
        console.log(response.data.message) //already exists
      }

    } catch (error){
      console.log(`Error Add Book to Book Shelf: `, error)
    }
  }

  return (
    <div className="flex flex-col h-screen justify-start items-start">
      <Navbar/>
      <div className='p-2 w-screen gap-4 flex justify-end bg-slate-100'>
        <input className='bg-transparent h-12 border-none outline-none p-2 w-60 text-zinc-500' type='text' placeholder='Search a book' onChange={(e) => setSearchTerms(e.target.value)}/>
        <button className='bg-transparent border-none' onClick={() => handleSearchBook(searchTerms)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        </button>
      </div>
      <div className='flex w-screen bg-slate-100'>
        {book && 
        <div className='p-4 flex flex-col gap-2 items-start'>
          <Book key={book.title} book={book}/>
          <button onClick={() => handleAddBook(book)} className='bg-green-600'>Add to Book Shelf</button>
        </div>}
      </div>
      <div className='p-4 flex-1 flex-col'>
        <h1 className='text-2xl border-b-4'>My Book Shelf</h1>

      </div>
  </div>
  )
}

export default Library