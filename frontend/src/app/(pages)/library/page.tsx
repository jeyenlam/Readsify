'use client'
import Navbar from '@/app/components/Navbar'
import axios from 'axios'
import React, { useState } from 'react'

const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

interface Book {
  title: String
  authors: String[]
  thumbnail: String
  description: String
}

const Library = () => {
  const [searchTerms, setSearchTerms] = useState('')
  const [books, setBooks] = useState<Book[]>([])

  const handleSearchBook = async (searchTerms: String) => {
    try {
      const response = axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/books/`, {
        searchTerms: searchTerms
      })
      console.log((await response).data.items[0])

      const searchedBook = (await response).data.items[0]

      const searchBook: Book = {
        title: searchedBook.volumeInfo.title,
        authors: searchedBook.volumeInfo.authors,
        thumbnail: searchedBook.volumeInfo.imageLinks.thumbnail,
        description: searchedBook.searchInfo.textSnippet
      }

      console.log(searchBook)

      setBooks((prev) => [...prev, searchBook])      

    } catch(error) {
      console.error(`Google Book API Fetching Failed: ${error}`)
    }
  }


  return (
    <div className="flex flex-col h-screen">
    <Navbar/>
    <div>
      <input type='text' placeholder='Search a book' onChange={(e) => setSearchTerms(e.target.value)}/>
      <button onClick={() => handleSearchBook(searchTerms)}>Search</button>
    </div>
  </div>
  )
}

export default Library