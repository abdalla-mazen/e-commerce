import React, { useEffect, useState } from 'react'
import Style from './Nav.module.css'
import logo from "../../assets/image/cart.svg"
import Home from '../Home/Home';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

import { initFlowbite } from 'flowbite'

export default function Nav() {




  let { userLogin, setuserLogin } = useContext(UserContext)
  let { counterItem, getProductFromCart } = useContext(CartContext)
  const [count, setcount] = useState(0)



  let navigate = useNavigate()
  const getInitialMode = () => {

    const storedMode = localStorage.getItem('dark-mode');
    if (storedMode) {
      return storedMode === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialMode);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {
    initFlowbite();
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', 'false');
    }
  }, [isDarkMode]);

  function logout() {
    localStorage.removeItem('userToken')
    setuserLogin(null)
    navigate("/login")
  }

  return (
    <>
      <div className='bg-light-color  dark:bg-gray-900 z-50 dark:border-y dark:border-[#374151] fixed top-0 right-0 left-0'>
        <div className="container mx-auto   ">
          <nav className="  bg-light-color dark:bg-gray-900  border-gray-200 flex  items-center justify-between relative py-2">
            <div className="max-w-screen-xl    p-2">
              <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-8" alt="Flowbite Logo" />
                {/* <i className="fa-solid fa-cart-shopping text-main-color text-2xl"  ></i> */}
                <h1 className='text-2xl font-bold font-sans'>Fresh Cart</h1>
              </Link>

            </div>
            <div className="left flex  items-center justify-center   gap-2">
              <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div className="hidden w-full md:flex md:w-auto absolute top-[55px] left-0 right-0 md:static z-50" id="navbar-default">
                <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 bg-light-color dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
                  {userLogin !== null ? <>
                    <li>
                      <NavLink to="/" className="block py-2 px-3   rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0   md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="cart" className=" py-2 px-3 flex items-center rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0   md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart


                        <div className='ps-2'>
                          <div className="relative inline-flex items-center  p-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none  bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-800">
                            <i className="fa-solid fa-cart-shopping"></i>

                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"> {counterItem}</div>
                          </div>
                        </div>






                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="wishlist" className="block py-2 px-3   rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0   md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wish List</NavLink>
                    </li>
                    <li>
                      <NavLink to="products" className="block py-2 px-3   rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0   md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
                    </li>
                    <li>
                      <NavLink to="categories" className="block py-2 px-3   rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0   md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Catagories</NavLink>
                    </li>
                    <li>
                      <NavLink to="brands" className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0 md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
                    </li>



                  </> : null}
                  {userLogin === null ? <>
                    <li>
                      <Link to="signup" className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0 md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                    </li>
                    <li>
                      <Link to="login" className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0 md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                    </li>
                    <span className='flex   items-center justify-center gap-2 '>



                      <li>
                        <i className="fa-brands fa-facebook cursor-pointer   "></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-x-twitter cursor-pointer"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-instagram cursor-pointer"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-youtube cursor-pointer"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-tiktok cursor-pointer"></i>
                      </li>
                    </span>
                  </> : <li>
                    <span onClick={logout} className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#111827] md:p-0 md:dark:hover:text-main-color dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer">Logout</span>
                  </li>}



                </ul>

                {/* 
              <ul className='flex   flex-col   md:flex-row  gap-1'>
             
              </ul> */}
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white/50'} flex items-center justify-center  mr-2`}>

                <button id="theme-toggle" onClick={toggleDarkMode} type="button"
                  className={`${isDarkMode ? 'text-gray-300 border-gray-300' : 'text-gray-800 border-gray-500'} border-2 rounded-lg text-sm p-2`}>
                  <svg id="theme-toggle-dark-icon"
                    className={`${isDarkMode ? 'hidden' : ''} w-5 h-5`} fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                  <svg id="theme-toggle-light-icon"
                    className={`${isDarkMode ? '' : 'hidden'} w-5 h-5`} fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>

          </nav>



        </div>

      </div>








    </>
  )
}
