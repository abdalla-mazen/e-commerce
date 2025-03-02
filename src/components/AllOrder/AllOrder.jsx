import React, { useEffect, useState } from 'react'
import Style from './AllOrder.module.css'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { Modal } from 'flowbite';
export default function AllOrder() {
const [order, setorder] = useState([])
const [items, setitem] = useState([])

const token = localStorage.getItem("userToken")
const user =jwtDecode(token)
const userID= user.id
console.log(userID);

  async  function getAllOrder(userID) {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
      setorder(data)
     
      console.log(data);
    
   
    }


    useEffect(() => {
    getAllOrder(userID)
    
     
    }, [])
    
    const $targetEl = document.getElementById('default-modal');

    // options with default values
    const options = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
            'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
            console.log('modal is hidden');
        },
        onShow: () => {
            console.log('modal is shown');
        },
        onToggle: () => {
            console.log('modal has been toggled');
        },
    };
    
    // instance options object
    const instanceOptions = {
      id: 'modalEl',
      override: true
    };

    const modal = new Modal($targetEl, options, instanceOptions);
    function openModel(items) {
      modal.show(items);
      setitem(items)
      console.log(items);
      
    }
    function closeModal() {
      modal.hide();
    }


  return (
<>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
        Order Id
        </th>
        <th scope="col" className="px-6 py-3">
        Is Delivered
        </th>
        <th scope="col" className="px-6 py-3">
        is Paid
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>

      {order?.map(item=>  <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {item.id}
        </th>
        <td className="px-6 py-4">
        {item.isDelivered? "Deliverd":"Not Deliverd"}
        </td>
      <td>
      {item.isPaid? "Paid":"Not Paid"}
        </td>
        <td className="px-6 py-4">
          ${item.totalOrderPrice}
        </td>
        <td className="px-6 py-4">
          {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show More Details</a> */}
          
  <button    onClick={()=>openModel(item.cartItems)}  data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  <i className="fa-solid fa-eye"></i>
  </button>
        </td>
      </tr>
      
      
      
      
      )}
      
      
    </tbody>
  </table>
</div>






<div id="default-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
  <div className="relative p-4 w-full max-w-2xl max-h-full">
    {/* Modal content */}
    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
      {/* Modal header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
         Order Details
        </h3>
         <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button> 
      </div>
      {/* Modal body */}
      <div className="p-4 md:p-5 space-y-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
        Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
       
      </tr>
    </thead>
    <tbody>

      
    {items?.map(item=><tr  key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 ">
        <td className="p-4">
          <img src={item?.product?.imageCover}className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {/* {item.cartItems.map(img=> img.price)} */}
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
          
           {item.count}
          
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${item.price}
        </td>
        <td className="px-6 py-4">
      
        </td>
      </tr>
      
    )}  
    </tbody>
  </table>
      </div>
      {/* Modal footer */}
      {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
  
      </div> */}
    </div>
  </div>
</div>

  











</>
  )
}
