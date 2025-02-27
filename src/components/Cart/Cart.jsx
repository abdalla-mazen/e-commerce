
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import cart from '../../assets/image/empty-cart.png'
export default function Cart() {
  const { getProductFromCart, deleteProduct, updateQuantity, clearCart } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    setLoading(true);
    try {
      let response = await getProductFromCart();
      if (response.data.status === "success") {
        setItems(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
      }
    } catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id) {
    await deleteProduct(id);
    getItems();
  }

  async function updateNumOfItem(id, count) {
    await updateQuantity(id, count);
    getItems();
  }

  async function clearAll() {
    await clearCart();
    getItems();
  }

  useEffect(() => {
    getItems();
  }, []);

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

  if (items.length === 0) {
    return (
      <div className="flex justify-center flex-col align-middle h-screen items-center">
         <div className=' w-1/4 md:w-1/6'>

        <img src={cart} className='w-full' alt="" />
        </div>
        <h1 className='text-2xl font-bold py-5'>Your cart is empty!</h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td className="p-4">
                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => updateNumOfItem(product.product.id, product.count - 1)}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                    type="button"
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div><span>{product.count}</span></div>
                  <button
                    onClick={() => updateNumOfItem(product.product.id, product.count + 1)}
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                    type="button"
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${product.price}</td>
              <td className="px-6 py-4">
                <button onClick={() => deleteItem(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex flex-col md:flex-row justify-between py-5 items-center">
        <div>
          <h3 className="text-2xl font-bold">Total Price: ${totalPrice}</h3>
        </div>
        <div className="flex items-center">
          <Link to={'/checkout'}>
            <button className="text-center bg-emerald-600 py-2 px-1 rounded-lg hover:bg-emerald-800 me-3">CheckOut</button>
          </Link>
          <button className="text-center bg-red-600 py-2 px-1 rounded-lg hover:bg-red-800" onClick={clearAll}>
            Clear All Items <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
