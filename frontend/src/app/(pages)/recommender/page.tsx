"use client"
import Book from '@/app/components/Book'
import Navbar from '@/app/components/Navbar'
import { Book as IBook } from '@/app/lib/interface'
import axios from 'axios'
import React, { useState } from 'react'

const Recommender = () => {
  const [descriptionQuery, setDescriptionQuery] = useState('')
  const [recommendedBooks, setRecommendedBooks] = useState<IBook[]>([])
  const accessToken = localStorage.getItem('accessToken'); //temp

  const handleSubmitBookDescription = async (query: string) => {
    
    try {
      const response = await axios.post("http://localhost:8000/api/recommender/",
        {
          query: query
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

      console.log(response.data.book_recs)
      setRecommendedBooks(response.data.book_recs)

    } catch (error) {
      console.log("Failed sending query to OpenAIEmbedding:", error);
    }
  }

  return (
    <div className="flex flex-col justify-start items-start overflow-y-scrollable h-screen">
      <Navbar/> 
      <div className='p-2 w-screen gap-4 flex justify-end bg-slate-100'>
        <input className='bg-transparent h-12 border-none outline-none p-2 w-full text-zinc-500' type='text' required placeholder='Describe a type of book you would like to read...' onChange={(e) => setDescriptionQuery(e.target.value)}/>
        <button className='bg-transparent border-none' onClick={(e) => {e.preventDefault(); handleSubmitBookDescription(descriptionQuery)}} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        </button>
      </div>
      <div className='w-screen h-screen overflow-y-scroll p-4'>
        {recommendedBooks &&
          recommendedBooks.map((book, index) => <Book key={index} book={book} fullyDisplayed={true}/>)}
      </div>   
    </div>
  )
}

export default Recommender