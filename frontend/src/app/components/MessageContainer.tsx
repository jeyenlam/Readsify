import React from 'react'
import { motion } from 'motion/react'

const MessageContainer: React.FC<{message: string, role: string}> = ({message, role}) => {
  return (
    role === "user" 
      ? <div className='flex justify-end p-2 text-sm'>
          <motion.p 
            className='bg-slate-400 px-5 py-2 rounded-3xl'
          >{message}</motion.p>
        </div>
      : <div className='flex justify-start text-sm'>
        <p className='bg-zinc-00 px-5 py-2 rounded-3xl'>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }} // Controls typing speed
        >
          {message.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.03, delay: index * 0.05 }} // Delays each character
            >
              {char}
            </motion.span>
          ))}
        </motion.span></p>
      </div>
  )
}

export default MessageContainer