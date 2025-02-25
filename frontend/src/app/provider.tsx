'use client';
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Book as BookType } from '@/app/lib/interface'

interface IAppContext {
  user: Object
  book: BookType | null
  searchTerms: string
  booksOnShelf: BookType[]
  newBookSaved: boolean
  isActive: string
  setIsActive: React.Dispatch<React.SetStateAction<string>>
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
  const [isActive, setIsActive] = useState('library')
  const pathName = usePathname()


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

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      console.error('No refresh token found.')
      return null as string | null
    }

    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/token/refresh/`, {
        refresh: refreshToken
      })

      const newAccessToken = response.data.access
      console.log(newAccessToken)
      localStorage.setItem('accessToken', newAccessToken)
      return newAccessToken

    } catch (error){
      console.error(`Failed to Refresh Access Token: `, error)
      return null
    }
  }

  const fetchProtectedData = async () => {
    let accessToken = localStorage.getItem('accessToken');
  
    try {
      const response = await axios.get(`${NEXT_PUBLIC_BACKEND_API_URL}/protected/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        accessToken = await refreshAccessToken() ?? null;
        if (accessToken) {
          const response = await axios.get(`${NEXT_PUBLIC_BACKEND_API_URL}/protected/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          return response.data;
        } else {
          console.error('Unable to refresh access token, please log in again.');
          router.push('/auth')
        }
      } else {
        console.error('API request failed:', error);
      }
    }
  };
  
  
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
      
    setIsActive(pathName)
    fetchProtectedData()
  }, [pathName])

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        book,
        newBookSaved,
        searchTerms,
        booksOnShelf,
        isActive,
        setIsActive,
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
