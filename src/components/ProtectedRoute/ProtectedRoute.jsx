import React, { useState } from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';



export default function ProtectedRoute(props) {
   if (localStorage.getItem("userToken")!==null ){
    //navigate to path 
      return props.children;
  }else{
    // navigate to login
   return  <Navigate  to={"/login"} />
   }
  

    

}
