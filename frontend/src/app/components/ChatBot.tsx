import React from 'react'

const ChatBot = () => {
  return (
    <div className='chatbot-outter-layout'>
      <h1 className='text-xl font-semibold text-zinc-700 p-2'>ChatReadsify</h1>
      <div className='chatbot-convo-frame'></div>
      <div className='chatbot-prompt-frame'>
        <input type='text' placeholder='Ask me anything about books!'/>
        <button>Submit</button>
      </div>
      

    </div>
  )
}

export default ChatBot