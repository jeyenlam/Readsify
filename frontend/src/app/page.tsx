'use client'
import Navbar from "./components/Navbar"

const Home = () => {

  return (
    <div className="flex flex-col">
      <Navbar/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}

export default Home;