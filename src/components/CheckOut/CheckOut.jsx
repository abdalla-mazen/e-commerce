import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'
import axios from 'axios'
import { data, Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { ClipLoader, MoonLoader } from 'react-spinners'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext'

export default function CheckOut() {
  let { getProductFromCart } = useContext(CartContext)
  const [apiError, setapiError] = useState("")
  const [callingRespose, setcallingRespose] = useState(false)
  const [cashe, setcashe] = useState(true)
  const [cartID, setcartID] = useState("")
  const url= window.location.origin;
let navigate=  useNavigate()
  let validationSchema = Yup.object().shape({

    details: Yup.string().required(" details is required "),
    phone: Yup.string().required(" phone is required "),
    city: Yup.string().required(" city is required "),
  })
  let headers = {
    token: localStorage.getItem("userToken")
  }

  async function getIdCart() {
    let { data } = await getProductFromCart()
    console.log(data.cartId);
    setcartID(data.cartId)
  }

  async function cashPay(cartID, formValues) {
    setcallingRespose(true)

    try {
   
if (cashe== true) {
  setapiError("")
  let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, formValues,
    { headers }
  )
  console.log('helloz');
navigate("/allorders")
}else{
  let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}`, formValues,
    {headers}
  )
  console.log(data);
  
  if (data.status=="success") {
    window.location.href=data.session.url
  }
  

  
}



    } catch (error) {
      setcallingRespose(false)
      // setapiError(error.response.data.message)
    }
  }



  let formik = useFormik({
    initialValues: {
    
        "details": "",
        "phone": "",
        "city": ""


    },
    validationSchema,
    onSubmit: ()=>cashPay(cartID,formik.values)
  })
  function print() {
    console.log(cashe);

  }
  useEffect(() => {

    getIdCart()

  }, [])

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
          </div> : null}


        <h1 className='text-3xl w-3/4 mx-auto  '> Payment </h1>
        <form className="w-3/4 mx-auto" onSubmit={formik.handleSubmit}>

          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer" placeholder=" " />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details address</label>
            {formik.errors.details && formik.touched.details ?
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{formik.errors.details}</span>
                </div>
              </div> : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone address</label>
            {formik.errors.phone && formik.touched.phone ?
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{formik.errors.phone}</span>
                </div>
              </div> : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer" placeholder=" " />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city address</label>
            {formik.errors.city && formik.touched.city ?
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{formik.errors.city}</span>
                </div>
              </div> : null}
          </div>
          <div>


            <div className="">
              <h2> Choose payment method </h2>
              <div className="flex items-center me-4 py-3">
                <input id="cashe" type="radio" value="cashe"  name='cashe' onChange={() => setcashe(true)} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="cashe" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cashe <i className="fa-solid fa-money-bill-wave"></i></label>
              </div>
              <div className="flex items-center me-4 py-3">
                <input id="credite" type="radio" value="credite" name='cashe' onChange={() => setcashe(false)} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="credite" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Crediet <i className="fa-solid fa-credit-card"></i></label>
              </div>
            </div>
          </div>

          <button type="submit"  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "> {callingRespose ? <ClipLoader size={16} color="#ffffff" /> : "Pay"}</button>

        </form>





      </div>



    </>
  )
}
// import React, { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { ClipLoader } from 'react-spinners';
// import { useContext } from 'react';
// import { CartContext } from '../../Context/CartContext';

// export default function CheckOut() {
//   let { getProductFromCart } = useContext(CartContext);
//   const [apiError, setapiError] = useState("");
//   const [callingRespose, setcallingRespose] = useState(false);
//   const [cartID, setcartID] = useState("");

//   let validationSchema = Yup.object().shape({
//     details: Yup.string().required("Details is required"),
//     phone: Yup.string().required("Phone is required"),
//     city: Yup.string().required("City is required"),
//   });

//   let headers = {
//     token: localStorage.getItem("userToken"),
//   };

//   async function getIdCart() {
//     let { data } = await getProductFromCart();
//     console.log(data.cartId);
//     setcartID(data.cartId);
//   }

//   async function cashPay(cartID, formValues) {
//     setcallingRespose(true);
//     try {
//       setapiError("");
//       let { data } = await axios.post(
//         `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
//         formValues,
//         { headers }
//       );
//       console.log("Order placed successfully");
//     } catch (error) {
//       setcallingRespose(false);
//       setapiError(error.response.data.message);
//     }
//   }

//   let formik = useFormik({
//     initialValues: {
//       shippingAddress: {
//         details: "", // Initialize the fields to empty strings
//         phone: "",
//         city: "",
//       },
//     },
//     validationSchema,
//     onSubmit: (values) => cashPay(cartID, values), // Use formik values
//   });

//   useEffect(() => {
//     getIdCart();
//   }, []);

//   return (
//     <>
//       <div className="container mx-auto py-14 h-screen">
//         {apiError && (
//           <div
//             className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3"
//             role="alert"
//           >
//             <svg
//               className="shrink-0 inline w-4 h-4 me-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//             </svg>
//             <span className="sr-only">Info</span>
//             <div>
//               <span className="font-medium">{apiError}</span>
//             </div>
//           </div>
//         )}

//         <h1 className="text-3xl w-3/4 mx-auto">Payment</h1>
//         <form className="w-3/4 mx-auto" onSubmit={formik.handleSubmit}>
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="text"
//               name="details"
//               value={formik.values.shippingAddress.details}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               id="details"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer"
//               placeholder=" "
//             />
//             <label
//               htmlFor="details"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Details Address
//             </label>
//             {formik.errors.details && formik.touched.details && (
//               <div
//                 className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3"
//                 role="alert"
//               >
//                 <svg
//                   className="shrink-0 inline w-4 h-4 me-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                 </svg>
//                 <span className="sr-only">Info</span>
//                 <div>
//                   <span className="font-medium">{formik.errors.details}</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="tel"
//               name="phone"
//               value={formik.values.shippingAddress.phone}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               id="phone"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer"
//               placeholder=" "
//             />
//             <label
//               htmlFor="phone"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Phone Address
//             </label>
//             {formik.errors.phone && formik.touched.phone && (
//               <div
//                 className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3"
//                 role="alert"
//               >
//                 <svg
//                   className="shrink-0 inline w-4 h-4 me-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                 </svg>
//                 <span className="sr-only">Info</span>
//                 <div>
//                   <span className="font-medium">{formik.errors.phone}</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="text"
//               name="shippingAddress.city"
//               value={formik.values.shippingAddress.city}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               id="city"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-color focus:outline-none focus:ring-0 focus:border-main-color peer"
//               placeholder=" "
//             />
//             <label
//               htmlFor="city"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-border-main-color peer-focus:dark:text-maborder-main-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               City Address
//             </label>
//             {formik.errors.city && formik.touched.city && (
//               <div
//                 className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-3"
//                 role="alert"
//               >
//                 <svg
//                   className="shrink-0 inline w-4 h-4 me-3"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//                 </svg>
//                 <span className="sr-only">Info</span>
//                 <div>
//                   <span className="font-medium">{formik.errors.city}</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center">
//             <button
//               type="submit"
//               className="bg-main-color text-white py-2 px-6 rounded"
//             >
//               {callingRespose ? (
//                 <ClipLoader color="white" size={30} />
//               ) : (
//                 "Pay Now"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
