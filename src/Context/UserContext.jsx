import React, { createContext, useEffect, useState } from 'react'
import { data } from 'react-router-dom';


export const UserContext = createContext();
export default function UserContextProvider(props) {

    const [userLogin,setuserLogin]=useState(null)
    useEffect(() => {
  
    
        if (localStorage.getItem('userToken')!==null) {
            setuserLogin('userToken')
        }
   
    }, [])
    
   
    return (
        <>  
    
       <UserContext.Provider  value={{userLogin,setuserLogin}}>
           {props.children}
       </UserContext.Provider>

    
  </>
  )
}
