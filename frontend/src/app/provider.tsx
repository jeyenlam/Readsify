'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Book as BookType } from '@/app/lib/interface'

interface IAppContext {
  user: Object
  book: BookType | null
  searchTerms: string
  booksOnShelf: BookType[]
  newBookSaved: boolean
  setUser: React.Dispatch<React.SetStateAction<Object>>
  handleLogOut: () => void
  handleLogIn: (logInFormData: Object) => Promise<void>
  handleSignUp: (signUpFormData: Object) => Promise<void>
  setNewBookSaved: React.Dispatch<React.SetStateAction<boolean>>
  setBooksOnShelf: React.Dispatch<React.SetStateAction<BookType[]>>
  setBook: React.Dispatch<React.SetStateAction<BookType | null>> 
  setSearchTerms: React.Dispatch<React.SetStateAction<string>>
  handleFetchBooksOnShelf: () => Promise<void>
  handleAddBook: (book: BookType) => Promise<void>
  handleSearchBook: (searchTerms: string) => Promise<void>
  handleDeleteBookFromShelf: (book: BookType) => Promise<void>
}

// Create the context
const AppContext = createContext<IAppContext | null>(null);

// Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context;
};

const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

// The provider component
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<Object>({
    username: '',
    email: '',
  });
  const accessToken = localStorage.getItem('accessToken');
  const [searchTerms, setSearchTerms] = useState<string>('')
  const [book, setBook] = useState<BookType | null>(null)
  const [booksOnShelf, setBooksOnShelf] = useState<BookType[]>([])
  const [newBookSaved, setNewBookSaved] = useState(false)

  // >> AUTHENTICATION
  const handleLogIn = async (logInFormData: Object) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', logInFormData);
      const { access, refresh } = response.data
      console.log(response)

      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
      router.push('/')

    } catch (error) {
      console.log('Signup Failed', error)
      alert(`Signup Failed: ${error}`)
    }
  }

  const handleSignUp = async (signUpFormData: Object) => {
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', signUpFormData);
      const { access, refresh } = response.data
      
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)

      router.push('/')

    } catch (error) {
      alert(`An account with this email exists. Try login`)
      console.log('Signup Failed', error)
    }
  }

  const handleLogOut = () => {
    localStorage.clear()
    router.push('/auth')
  }
  
  // >> LIBRARY
  const handleSearchBook = async (searchTerms: String) => {

    if (!searchTerms){
      alert("Search field is required!")
      return
    }

    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/books/`,
        {
          searchTerms: searchTerms
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      console.log(response.data.items[0])

      const searchedBook = response.data.items[0]

      const searchBook: BookType = {
        title: searchedBook.volumeInfo.title,
        authors: searchedBook.volumeInfo.authors,
        thumbnail: searchedBook.volumeInfo.imageLinks.thumbnail,
        description: searchedBook.searchInfo.textSnippet,
        categories: searchedBook.volumeInfo.categories
      }

      setBook(searchBook)      
    } catch(error) {
      console.error(`Google Book API Fetching Failed: ${error}`)
    }
  }

  const handleAddBook = async (book: BookType) => {
    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/books/add-book/`, 
        {
          title: book.title,
          authors: book.authors,
          thumbnail: book.thumbnail,
          description: book.description,
          categories: book.categories
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (response.status === 201) {
        console.log(response.data.message) //successfully added
      }
      else if (response.status === 200) {
        console.log(response.data.message) //already exists
      }

      setNewBookSaved(true)
    } catch (error){
      console.log(`Error Add Book to Book Shelf: `, error)
    }
  }

  const handleFetchBooksOnShelf = async () => {
    try {
      const response = await axios.get(`${NEXT_PUBLIC_BACKEND_API_URL}/books/fetch-books-on-shelf/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
      })

      const fetchedBooksOnShelf : BookType[] = response.data
      setBooksOnShelf(fetchedBooksOnShelf)

      console.log(response.data)

    } catch (error){
      console.log(`Failed to Fetch Books On Shelf:`, error)
    }
  }

  const handleDeleteBookFromShelf = async (book: BookType) => {
    try {
      const response = await axios.delete(`${NEXT_PUBLIC_BACKEND_API_URL}/books/delete-book/`, {
        data: {
          title: book.title
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      console.log(response.data.message)

      if (response.status === 200){
        handleFetchBooksOnShelf()
      }

    } catch (error){
      console.log(`Failed to Delete Book:`, error)
    }

  }



  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/auth')
    }

    console.log(accessToken)
  }, [])

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        book,
        newBookSaved,
        searchTerms,
        booksOnShelf,
        setNewBookSaved,
        setBooksOnShelf,
        setBook,
        setUser,
        handleLogOut,
        handleLogIn,
        handleSignUp,
        setSearchTerms,
        handleAddBook,        
        handleSearchBook,
        handleFetchBooksOnShelf,
        handleDeleteBookFromShelf
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
