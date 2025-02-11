'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "./components/Navbar"

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      router.push('/auth')
    }

    console.log(accessToken)
  }, [])

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