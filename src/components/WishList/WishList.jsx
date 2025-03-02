import React, { useContext, useState } from 'react'
import Style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { CartContext } from '../../Context/CartContext'
import wish from '../../assets/image/wishlist.png'

export default function WishList() {
  

   let { addProductToCart,getProductFromCart } = useContext(CartContext);
  let { getWish ,deleteToWishlist} = useContext(WishListContext)
const [list, setlist] = useState([])
    let [loader, setLoader] = useState([]);
     const [loading, setLoading] = useState(true);
  async function getAllWish() {
    setLoading(true);
    try{
      let response = await  getWish()
      setlist(response.data.data)
       // console.log(response.data.data);
       // console.log(list);
       getProductFromCart()
      //  console.log(response.data.data);
       setLoader(response.data.data)

    }catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  }
 

  async function addProduct(id) {
    let response = await addProductToCart(id)

    if (response.data.status == "success") {

      toast.success(response.data.message, { theme: "dark" })
      getProductFromCart()
    } else {

      toast.success(response.data.message)
    }

  }

 async function deleteToWish(id) {
    let response = await deleteToWishlist(id)
    // setlist(response.data)
    getAllWish()
    
  }
  useEffect(() => {
    getAllWish()
  
   
  }, [])

  
  if (loading) {
    return (
      <div className="flex justify-center align-middle h-screen items-center">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="flex justify-center align-middle flex-col h-screen items-center">
         <div className='w-1/4 md:w-1/6'>
        
                <img src={wish} className='w-full' alt="" />
                </div>
        <h1 className='text-2xl font-bold py-5'>Your wish list is empty!</h1>
      </div>
    );
  }
  
  
  return (
   <>
  <div  className='min-h-screen'>


  { list.map((listt)=><div key={listt.id} href="#" className="flex  flex-col items-center m-5  justify-between bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row  my-5 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
 <div className='flex justify-around flex-col  sm:flex-row '>
  <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={listt.imageCover}  />

  <div className="flex flex-col justify-center p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{listt.title}</h5>
    <p className="mb-3 font-semibold text-main-color ">{listt.price}$</p>
    <button onClick={()=>deleteToWish(listt.id )} className="font-medium  max-w-fit  text-red-600 dark:text-red-500 hover:underline">Remove</button>
  </div>

 </div>
  <div  className='me-5  py-5'> <button onClick={() => addProduct(listt.id)} className="btn-animate    text-white w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Add to cart</button> </div>
</div>
   )
   
    }

  </div>

     
  


   </>
  )
}
