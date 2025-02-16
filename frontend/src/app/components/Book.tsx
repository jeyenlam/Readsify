import React from 'react'
import { Book as BookType } from '../lib/interface'

const Book: React.FC<{ book: BookType }> = ({ book }) => {
  return (
    <div className='flex gap-4 rounded-sm bg-slate-00 p-2'>
      <img src={book.thumbnail} alt={book.title} />
      <div className='w-96 flex flex-col gap-4'>
        <div>
          <h1>{book.title}</h1>
          <p className='text-sm opacity-50'>{book.authors.join(', ')}</p>
          <p className='text-xs opacity-50'>{book.categories.join(', ')}</p>
        </div>
        <p className='opacity-90 text-sm'>{book.description}</p>
      </div>      
    </div>
  )
}

export default Book