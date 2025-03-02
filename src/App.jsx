import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import WishList from './components/WishList/WishList'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProdvider from './Context/CartContext'
import { ToastContainer } from 'react-toastify'
import WishListContext from './Context/WishListContext'
import Error from './components/Error/Error'
import CodeVerification from './components/CodeVerification/CodeVerification'
import ResetPassword from './components/ResetPassword/ResetPassword'
import EmailVerification from './components/EmailVerification/EmailVerification'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrder from './components/AllOrder/AllOrder'





function App() {
 let x= createBrowserRouter([
  {path:"",element:<Layout/>, children:[
  {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
  {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:'productDetails/:id/:categories',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
  {path:'allorders',element:<ProtectedRoute><AllOrder/></ProtectedRoute>},
  {path:'signup',element:<Signup/>},
  {path:'login',element:<Login/>},
  {path:'codeverification',element:<CodeVerification/>},
  {path:'resetpassword',element:<ResetPassword/>},
  {path:'emailverification',element:<EmailVerification/>},
  {path:'*',element:<Error/>}
  

  ]}
 ])

  return (
    <>

    <WishListContext>
  <UserContextProvider>

 < CartContextProdvider>
 
     <RouterProvider   router={x} ></RouterProvider>
     <ToastContainer />
 </CartContextProdvider>

  </UserContextProvider>
    </WishListContext>


    </>
  )
}

export default App






// loader

// +logo