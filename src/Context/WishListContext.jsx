import axios from 'axios';
import React, { createContext } from 'react'

export let WishListContext= createContext();
export default function WishListContextProvider(props) {
    let headers={
        token:localStorage.getItem("userToken")
    }
    function addToWishlist(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
         {productId},
         {headers}
        ).then((res)=>res)
        .catch((err)=>err)
    }
    function deleteToWishlist(productId){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
         
        {headers},

        ).then((res)=>res)
        .catch((err)=>err)
    }
    function getWish() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {headers}
  ).then((res)=>res)
  .catch((err)=>err)
    }

  
    return  <WishListContext.Provider value={{addToWishlist,deleteToWishlist,getWish}}>
   {props.children}
   </WishListContext.Provider>

   

}
