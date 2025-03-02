
import axios from "axios";
import { Children, createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProdvider  (props){
let headers={
    token:localStorage.getItem("userToken")
}
const [counterItem, setcounterItem] = useState(0)
function addProductToCart(productId) {
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId},
        {headers}
        
    ).then((res)=>res)
    .catch((err)=>err)
    
}

function getProductFromCart(){
return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {headers}
).then((res)=>{
    const { data } = res;
    setcounterItem(data.numOfCartItems)
    return res
}
)
.catch((err)=>err)
}

function deleteProduct(id){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {headers}
    ).then((res)=>res)
    .catch((err)=>err)
}
function updateQuantity(id,count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    count:count
  },
    {headers}).then((res)=>res)
    .catch((err)=>err)
}
function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers}
    ).then((res)=>res)
    .catch((err)=>err)
    }


   
return <CartContext.Provider   value={{addProductToCart,getProductFromCart,deleteProduct,updateQuantity,clearCart,counterItem}}    >
    {props.children}
</CartContext.Provider>

}