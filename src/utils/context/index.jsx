import { createContext, useState } from "react";

export const isHomeContext = createContext()

export const HomeProvider = ({ children }) => {
    const [isHome, setIsHome] = useState(true)
 
    return (
        <isHomeContext.Provider value={{ isHome, setIsHome }}>
            {children}
        </isHomeContext.Provider>
    )
}