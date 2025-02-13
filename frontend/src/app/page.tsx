'use client'
import ChatBot from "./components/ChatBot";
import Navbar from "./components/Navbar"

const Home = () => {

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar/>
      <ChatBot/>
    </div>
  );
}

export default Home;