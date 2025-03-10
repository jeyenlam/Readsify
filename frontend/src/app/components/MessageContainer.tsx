import React from 'react'

const MessageContainer: React.FC<{message: string, role: string}> = ({message, role}) => {
  return (
    role === "user" 
      ? <div className='flex justify-end p-2 text-sm'>
        <p className='bg-slate-200 px-5 py-2 rounded-3xl'>{message}</p>
        </div>
      : <div className='flex justify-start text-sm'>
        <p className='bg-zinc-200 px-5 py-2 rounded-3xl'>{message}</p>
      </div>
  )
}

export default MessageContainer