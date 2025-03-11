"use client"
import Book from '@/app/components/Book'
import Navbar from '@/app/components/Navbar'
import { Book as IBook } from '@/app/lib/interface'
import axios from 'axios'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Recommender = () => {
  const [descriptionQuery, setDescriptionQuery] = useState('')
  const [recommendedBooks, setRecommendedBooks] = useState<IBook[]>([
    // { "authors": ["Jamie Lee Curtis"],
    //   "categories":["Juvenile Fiction"],
    //   "description": "Today I feel silly. Mom says it's the heat. I put rouge on the cat and gloves on my feet. I ate noodles for breakfast and pancakes at night. I dressed like a star and was quite a sight. Today I am sad, my mood's heavy and gray. There's a frown on my face and it's been there all day. My best friend and I had a really big fight. She said that I tattled and I know that she's right. Silly, cranky, excited, or sad--everyone has moods that can change each day. Jamie Lee Curtis's zany and touching verse, paired with Laura Cornell's whimsical and original illustrations, helps kids explore, identify, and, even have fun with their ever-changing moods. Here's another inspired picture book from the bestselling author-illustrator team of Tell Me Again About the Night I Was Born and When I Was Little: A Four-Year-Old's Memoir of Her Youth.",
    //   "thumbnail":"http://books.google.com/books/content?id=s_2GIF_c0T8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    //   "title": "Today I Feel Silly & Other Moods That Make My Day"
    // },
    // { "authors": ["Jamie Lee Curtis"],
    //   "categories":["Juvenile Fiction"],
    //   "description": "Today I feel silly. Mom says it's the heat. I put rouge on the cat and gloves on my feet. I ate noodles for breakfast and pancakes at night. I dressed like a star and was quite a sight. Today I am sad, my mood's heavy and gray. There's a frown on my face and it's been there all day. My best friend and I had a really big fight. She said that I tattled and I know that she's right. Silly, cranky, excited, or sad--everyone has moods that can change each day. Jamie Lee Curtis's zany and touching verse, paired with Laura Cornell's whimsical and original illustrations, helps kids explore, identify, and, even have fun with their ever-changing moods. Here's another inspired picture book from the bestselling author-illustrator team of Tell Me Again About the Night I Was Born and When I Was Little: A Four-Year-Old's Memoir of Her Youth.",
    //   "thumbnail":"http://books.google.com/books/content?id=s_2GIF_c0T8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    //   "title": "Today I Feel Silly & Other Moods That Make My Day"
    // },
    // { "authors": ["Jamie Lee Curtis"],
    //   "categories":["Juvenile Fiction"],
    //   "description": "Today I feel silly. Mom says it's the heat. I put rouge on the cat and gloves on my feet. I ate noodles for breakfast and pancakes at night. I dressed like a star and was quite a sight. Today I am sad, my mood's heavy and gray. There's a frown on my face and it's been there all day. My best friend and I had a really big fight. She said that I tattled and I know that she's right. Silly, cranky, excited, or sad--everyone has moods that can change each day. Jamie Lee Curtis's zany and touching verse, paired with Laura Cornell's whimsical and original illustrations, helps kids explore, identify, and, even have fun with their ever-changing moods. Here's another inspired picture book from the bestselling author-illustrator team of Tell Me Again About the Night I Was Born and When I Was Little: A Four-Year-Old's Memoir of Her Youth.",
    //   "thumbnail":"http://books.google.com/books/content?id=s_2GIF_c0T8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    //   "title": "Today I Feel Silly & Other Moods That Make My Day"
    // },
    // { "authors": ["Jamie Lee Curtis"],
    //   "categories":["Juvenile Fiction"],
    //   "description": "Today I feel silly. Mom says it's the heat. I put rouge on the cat and gloves on my feet. I ate noodles for breakfast and pancakes at night. I dressed like a star and was quite a sight. Today I am sad, my mood's heavy and gray. There's a frown on my face and it's been there all day. My best friend and I had a really big fight. She said that I tattled and I know that she's right. Silly, cranky, excited, or sad--everyone has moods that can change each day. Jamie Lee Curtis's zany and touching verse, paired with Laura Cornell's whimsical and original illustrations, helps kids explore, identify, and, even have fun with their ever-changing moods. Here's another inspired picture book from the bestselling author-illustrator team of Tell Me Again About the Night I Was Born and When I Was Little: A Four-Year-Old's Memoir of Her Youth.",
    //   "thumbnail":"http://books.google.com/books/content?id=s_2GIF_c0T8C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    //   "title": "Today I Feel Silly & Other Moods That Make My Day"
    // },
  ])
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
      <form onSubmit={(e) => {e.preventDefault(); handleSubmitBookDescription(descriptionQuery)}} className='p-2 w-screen gap-4 flex justify-end bg-slate-100'>
        <input className='bg-transparent h-12 border-none outline-none p-2 w-full text-zinc-500' type='text' required placeholder='Describe a type of book you would like to read...' onChange={(e) => setDescriptionQuery(e.target.value)}/>
        <button className='bg-transparent border-none' type='submit'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        </button>
      </form>
        
      <div className='w-screen overflow-y-scroll p-6 grid grid-cols-1 gap-4 xl:grid-cols-3'>
        {recommendedBooks &&
          recommendedBooks.map((book, index) => { return (
          <motion.div
            className={`relative p-2`}
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.5 }}          
          >
            <div className={`${index == 0 || index == 1 || index == 2 ? 'block' : 'hidden'} font-semibold text-xl px-3 py-1 rounded-full absolute bg-cyan-500 border-slate-800 shadow-md`}>{index+1}</div>
            <Book book={book} fullyDisplayed={true}/>
          </motion.div>
        )})}
      </div>   
    </div>
  )
}

export default Recommender