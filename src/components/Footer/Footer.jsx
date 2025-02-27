import React, { useState } from 'react'
import Style from './Footer.module.css'
import amazonLogo from '../../assets/image/5968202.png'
import appleLogo from '../../assets/image/5968601.png'
import paypalLogo from '../../assets/image/images.png'
export default function Footer() {
    const [first, setfirst] = useState(0)
  return (
   <>
   
   
<footer className=" bg-light-color rounded-lg shadow-sm  dark:bg-gray-900   dark:border-t dark:border-[#374151]">


<div className="container bg-light-color mx-auto py-5 text-center md:text-left   dark:bg-gray-900  ">
  <h2>Get the FreshCart app</h2>
 <p>We will send you a link, open it in on your phone to download the app</p>
  <div className='flex items-center justify-evenly   flex-col md:flex-row  py-2 '>
<div className="mb-3 w-3/4" >

  <input type="email" id="emailFooter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..."  />
</div>
<button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800  w-3/4 md:w-auto  ">Share App Link</button>

  </div>

<div className="partener     flex justify-between  border-y border-slate-200  dark:border-y dark:border-[#374151]   dark:bg-gray-900     flex-col md:flex-row py-2 items-center  ">
<div className="payment flex items-center gap-2 py-2 md:py-0">
<p className='text-xl'>Payment Partners</p>
<ul className='flex gap-1'>
  <li><img className="w-8 h-8 rounded-full " src={amazonLogo} alt="Rounded avatar"/></li>
  <li><img className="w-8 h-8 rounded-full" src={appleLogo } alt="Rounded avatar"/></li>
  <li><img className="w-8 h-8 rounded-full" src={paypalLogo} alt="Rounded avatar"/></li>
</ul>
</div>
<div className="app flex items-center  flex-col md:flex-row ">
<p  className='text-xl'>Get deliveries with FreshCart</p>


<div className="flex justify-center items-center  ">
  <a className="app-btn blu flex items-center justify-center w-36 max-w-xs  my-4 mx-1 text-left rounded-lg text-xs uppercase transition-colors duration-300 ease-linear  hover:bg-black  dark:hover:bg-white border-2 py-1 bg-white dark:bg-black dark:text-white text-black  hover:text-white  dark:hover:text-black"
    href="http://apple.com">
    <i className="fab fa-apple text-lg mb-1"></i>
    <p>
      Available on <br />
      <span className="text-sm capitalize">App Store</span>
    </p>
  </a>

  <a className="app-btn flex items-center justify-center w-36 max-w-xs   my-4 mx-1 text-left rounded-lg text-xs uppercase transition-colors duration-300 ease-linear hover:bg-black  dark:hover:bg-white border-2 py-1 bg-white dark:bg-black dark:text-white text-black  hover:text-white  dark:hover:text-black "
    href="http://google.com">
    <i className="fab fa-google-play text-lg mb-1"></i>
    <p>Get it on <br />
      <span className="text-sm capitalize">Google Play</span>
    </p>
  </a>



</div>

</div>

</div>
</div>

</footer>


   
   </>
  )
}
