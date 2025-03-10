"use client"
import axios from 'axios';
import React, { useState } from 'react'
import MessageContainer from './MessageContainer';

const ChatBot = () => {
  const [query, setQuery] = React.useState('');
  const accessToken = localStorage.getItem('accessToken'); //temp
  const [messages, setMessages] = useState<{ message: string, role: 'user' | 'chat' }[]>(
    [
      // { message: 'Hello! How can I help you today?', role: 'chat' },
      // { message: 'I would like to know more about the book "The Great Gatsby"', role: 'user' },
      // { message: 'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan. Considered to be Fitzgerald\'s magnum opus, The Great Gatsby explores themes of decadence, idealism, resistance to change, social upheaval, and excess, creating a portrait of the Jazz Age or the Roaring Twenties that has been described as a cautionary tale regarding the American Dream.', role: 'chat' },
      // { message: 'Thank you!', role: 'user' },
    ]
  );

  const handleSubmitQuery = async (query: string) => {
    setMessages(prevMessages => [...prevMessages, { message: query, role: "user" }]);

    try {
      const response = await axios.post("http://localhost:8000/api/chat/",
        {
          query: query
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      const chatResponse = response.data.response;

      if (chatResponse) {
        setQuery('');
        setMessages(prevMessages => [...prevMessages, { message: chatResponse, role: "chat" }]);
      }

    } catch (error){
      console.log("Failed sending query to chat:", error);
    }

  }

  return (
    <div className='chatbot-outter-layout'>
      <h1 className='text-xl font-semibold text-zinc-700 p-2'>ChatReadsify</h1>
      <div className='chatbot-convo-frame'>
        <div className='xl:px-[15rem]'>
          { messages.map((message, index) => {
            return <MessageContainer key={index} message={message.message} role={message.role} />
          })}
        </div>

      </div>
      <div className='chatbot-prompt-frame'>
        <form onSubmit={(e) => { 
          e.preventDefault();
          handleSubmitQuery(query)
          }}
          className='flex flex-col justify-center items-end'
        >
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Type your message here...'
            className='chatbot-input'
            />
          <button className='rounded-full bg-cyan-600 hover:bg-cyan-500 p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBot