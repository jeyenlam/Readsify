'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
  user: Object
  setUser: React.Dispatch<React.SetStateAction<Object>>
  handleLogOut: () => void
  handleLogIn: (logInFormData: Object) => Promise<void>
  handleSignUp: (signUpFormData: Object) => Promise<void>
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

// The provider component
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<Object>({
    username: '',
    email: '',
  });

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
        setUser,
        handleLogOut,
        handleLogIn,
        handleSignUp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
