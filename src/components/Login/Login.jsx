import React, { useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { data, Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { ClipLoader, MoonLoader } from 'react-spinners'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
export default function Login() {


let {userLogin,setuserLogin}= useContext(UserContext)
const [apiError, setapiError] = useState("")
const [callingRespose, setcallingRespose] = useState(false)
  

let validationSchema =Yup.object().shape({
    email:Yup.string().email("invalid mail").required( " email is required "),
    password:Yup.string().matches(/^[A-Z][a-z1-9]{5,10}$/,"Password must start with an uppercase letter and contain 5-10 lowercase letters or numbers.").required("Password is required"),
  }) 


  let navigate = useNavigate();
  async function handleLogin(formValues ){
    setcallingRespose(true)
   
    try {
      setapiError("")
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formValues) 

   setuserLogin(data.token)
    localStorage.setItem("userToken",data.token)
     


    console.log(data.token);
    
navigate("/") 
  } catch (error) {
    setcallingRespose(false)
    setapiError(error.response.data.message) 
  }  
   }



let formik=useFormik({
  initialValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
  },
  validationSchema,
  onSubmit: handleLogin
})
  return (
  <>
  <div className="container mx-auto py-14 h-screen">

  {apiError ?
   <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{apiError}</span> 
  </div>
</div>  : null }


    <h1 className='text-3xl w-3/4 mx-auto  '> Login </h1>
<form className="w-3/4 mx-auto"   onSubmit={formik.handleSubmit}>

  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email"    value={formik.values.email}  onChange={formik.handleChange} onBlur={formik.handleBlur}    id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer" placeholder=" " />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    {formik.errors.email && formik.touched.email?
   <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{formik.errors.email}</span> 
  </div>
</div>  : null }
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur}  id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer" placeholder=" " />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    {formik.errors.password && formik.touched.password?
   <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{formik.errors.password}</span> 
  </div>
</div>  : null }
  </div>


 <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "> {callingRespose? <ClipLoader  size={16} color="#ffffff" /> :"Login"}</button> 
<span className='ps-6  '><Link  className='hover:bg-green-800   px-5 py-2.5 rounded-lg focus:ring-4 focus:ring-green-300 ' to="/emailverification" >Forget Password? </Link></span>
  </form>


    
  

  </div>
  </>
  )
}
