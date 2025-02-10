// 'use client';
// import { createContext, useContext, useState } from "react";

// // Rename the interface to avoid conflicts with the context name
// export interface IAppContext {
//   sample: boolean;
//   setSample: React.Dispatch<React.SetStateAction<boolean>>;
// }

// // Create the context
// const AppContext = createContext<IAppContext | null>(null);

// // Hook to use the context
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppContextProvider");
//   }
//   return context;
// };

// // The provider component
// const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
//   const [sample, setSample] = useState<boolean>(false); // Initializing with a boolean

//   return (
//     <AppContext.Provider value={{ sample, setSample }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
