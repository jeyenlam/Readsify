"use client"
import axios from 'axios';
import React from 'react'

const ChatBot = () => {
  const [query, setQuery] = React.useState('');
  const accessToken = localStorage.getItem('accessToken');

  const chat = async (query: string) => {
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

    const data = response.data;
    console.log(data.response); // Displays the book recommendation
  }

  return (
    <div className='chatbot-outter-layout'>
      <h1 className='text-xl font-semibold text-zinc-700 p-2'>ChatReadsify</h1>
      <div className='chatbot-convo-frame'></div>
      <div className='chatbot-prompt-frame'>
        <form onSubmit={(e) => { 
          e.preventDefault();
          chat(query)
          }}>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Type your message here...'
            className='chatbot-input'
            />
          <button className='default-button'>Submit</button>
        </form>
        
      </div>
    </div>
  )
}

export default ChatBot