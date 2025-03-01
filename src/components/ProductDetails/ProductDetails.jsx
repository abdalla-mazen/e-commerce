import React, { useEffect, useState ,useContext} from 'react'
import Style from './ProductDetails.module.css'
import { data, useParams } from 'react-router-dom'
import axios from 'axios';
import  { Component } from "react";
import Slider from "react-slick";
// import { baseUrl } from "./config";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductDetails() {
  const [response, setResponse] = useState("")
  let [category, setCategory] = useState([])
  let {id,categories}=useParams() 
  let { addProductToCart, getProductFromCart } = useContext(CartContext);
    let { addToWishlist, deleteToWishlist,getAllWish } = useContext(WishListContext);
  const settings = {
    customPaging: function(i) {
      return (

        <a className='w-96' >
        <img
          src={`${response?.images[i]}`}
          key={i}
          alt={`Product ${i}`}
          className="!w-96 rounded object-cover mx-auto "
        />
      </a>

    
        

      
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3
  };
  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      console.log(response);
      setResponse(data.data)
     
    }).catch((error)=>{
      console.error("Error fetching data:", error);
    })
  }

  function getRelatedProduct(categories) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      let products= data.data
     let relatedProduct = products.filter((product)=>product.category.name==categories)
    setCategory(relatedProduct )
  
      
     
    }).catch((error)=>{
      console.error("Error fetching data:", error);
    })
  }


  async function addProduct(id) {
    let response = await addProductToCart(id);
    if (response.data.status === 'success') {
      toast.success(response.data.message,options);
      getProductFromCart()
      } else {
      toast.success(response.data.message);
    }
  }
  const options = {
    autoClose: 2000,
       theme: 'dark'  
};
let [favorites, setFavorites] = useState({});
  async function addWish(id) {
    let response = await addToWishlist(id);
    if (response.data.status === 'success') {
      setFavorites((prev) => ({ ...prev, [id]: true }));    
      toast.success(response.data.message,options);
    }
  }


  useEffect(() => {
    getProductDetails(id) 
    getRelatedProduct(categories)
  
    
  }, [id])


  // <img src={`${src}/abstract0${i + 1}.jpg`} />

  // <img src={response.imageCover} alt="Product" className="w-3/5  rounded object-cover mx-auto" />

   
  
    const [first, setfirst] = useState(0)
  return (

    <>
    {response!==""?
      <div className="divb">
      <div className="font-sans bg-white   dark:bg-gray-900 dark:text-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="slider-one  flex flex-col justify-center align-middle md:flex-row      gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded">
      

<div className="slider-container w-2/4 contents md:block">
      <Slider {...settings}>
      {response?.images.map((src)=><img src={src} key={src} alt="Product" className="!w-3/5 rounded object-cover mx-auto" />)}
      </Slider>
    </div>
            <div className="lg:col-span-2 dark:text-white ">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{response?.title}</h3>
              <div className="flex items-center space-x-1 mt-2">
                <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <h4 className="text-gray-500 text-base !ml-3 dark:text-white">{response?.ratingsAverage}</h4>
              </div>
              <p className="text-sm text-gray-500 mt-2 dark:text-white">{response?.description}</p>
              <div className="flex flex-wrap gap-4 mt-6 items-center">
                <p className="text-gray-800 text-2xl font-bold dark:text-white">${response?.price}</p>
                <p className="text-gray-500 text-base dark:text-white"><strike>${response?.price+100}</strike> <span className="text-sm ml-1">Tax included</span></p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Choose a Color</h3>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button type="button" className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all" />
                  <button type="button" className="w-10 h-10 bg-gray-300 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all" />
                  <button type="button" className="w-10 h-10 bg-gray-100 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all" />
                  <button type="button" className="w-10 h-10 bg-blue-400 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all" />
                </div>
              </div>
              <div className="flex gap-4 mt-12 max-w-md">
                <button    onClick={() => addProduct(response.id)} type="button" className="w-full  dark:text-white px-4 py-2.5 outline-none border border-emerald-600 bg-emerald-500 hover:bg-emerald-700 text-white text-sm font-semibold rounded">Add to cart</button>
                <button onClick={() => ( addWish(response.id))}  type="button" className="w-full dark:text-white px-4 py-2.5 outline-none border border-emerald-600 bg-transparent hover:bg-emerald-700 hover:text-white text-gray-800 text-sm font-semibold rounded">Add to Wish List</button>
              </div>
            </div>
          </div>
          <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 dark:text-white" >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Product information</h3>
            <ul className="mt-4 space-y-6 text-gray-800">
      <li className="text-sm flex justify-between items-center dark:text-white">
        Category: 
        <span className="ml-4">{response.category?.name}</span>
      </li>
      <li className="text-sm flex justify-between items-center dark:text-white">
        Brand: 
        <span className="ml-4">{response?.brand?.name}</span>
      </li>
      <li className="text-sm flex justify-between items-center dark:text-white">
        Brand Logo: 
          <div className='w-[5%]'>
        <span className="ml-4">
          <img className="w-full" src={response?.brand?.image} alt="Brand Logo" />
    
        </span>
          </div>
      </li >
      <li className="text-sm flex justify-between items-center dark:text-white">
        Quantity: 
        <span className="ml-4">{response?.quantity}</span>
      </li>
    </ul>
    
          </div>
          <div className="mt-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Reviews(10)</h3>
            <div className="grid md:grid-cols-2 gap-12 mt-4">
              <div className="space-y-3 max-w-md">
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold dark:text-white">5.0</p>
                  <svg className="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-200 rounded w-full h-2 ml-3">
                    <div className="w-2/3 h-full rounded bg-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3 dark:text-white">66%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold dark:text-white">4.0</p>
                  <svg className="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-200 rounded w-full h-2 ml-3">
                    <div className="w-1/3 h-full rounded bg-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3 dark:text-white">33%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold dark:text-white">3.0</p>
                  <svg className="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-200 rounded w-full h-2 ml-3">
                    <div className="w-1/6 h-full rounded bg-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3 dark:text-white">16%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold dark:text-white">2.0</p>
                  <svg className="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-200 rounded w-full h-2 ml-3">
                    <div className="w-1/12 h-full rounded bg-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3 dark:text-white">8%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold dark:text-white">1.0</p>
                  <svg className="w-5 fill-yellow-300 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-200 rounded w-full h-2 ml-3">
                    <div className="w-[6%] h-full rounded bg-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3 dark:text-white">6%</p>
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">John Doe</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      <svg className="w-3 h-3 fill-yellow-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg className="w-3 h-3 fill-yellow-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg className="w-3 h-3 fill-yellow-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg className="w-3 h-3 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <svg className="w-3 h-3 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                      <p className="text-xs !ml-2 font-semibold text-gray-800 dark:text-white">2 mins ago</p>
                    </div>
                    <p className="text-sm mt-3 text-gray-500 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
                <div>
                  <p className="text-emerald-600 text-sm mt-6 cursor-pointer font-semibold">Read all reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='m-10 slid'>
        <h2 className='text-2xl font-semibold'>Related Products</h2>
      <Slider {...setting}>

   {category?.map(product=> <div key={product.id}>
    <img src={product?.imageCover} className='h-52' alt={product?.title} />
    
    </div>)}

     

      </Slider>
            
            </div>   
    </div>: <div className='flex justify-center align-middle h-screen  items-center'><div className="lds-ring"><div /><div /><div /><div /></div>
        </div> }
 

    
    
    
    
    </>
  )
}
