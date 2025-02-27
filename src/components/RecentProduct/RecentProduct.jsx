 import React, { useEffect, useState, useContext } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom';
  import { CartContext } from '../../Context/CartContext';
  import { toast } from 'react-toastify';
  import { WishListContext } from '../../Context/WishListContext';
  
  export default function RecentProduct() {
    let [recent, setRecent] = useState([]);
    let { addProductToCart, getProductFromCart } = useContext(CartContext);
    let { addToWishlist, deleteToWishlist,getAllWish } = useContext(WishListContext);
  
    let [favorites, setFavorites] = useState({});
    const options = {
      autoClose: 2000,
         theme: 'dark'  
  };
    
    function getRecentProduct() {
      axios
        .get('https://ecommerce.routemisr.com/api/v1/products')
        .then(({ data }) => {
          setRecent(data.data);
          getProductFromCart()
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  
    async function addWish(id) {
      let response = await addToWishlist(id);
      if (response.data.status === 'success') {
        setFavorites((prev) => ({ ...prev, [id]: true }));    
        toast.success(response.data.message,options);
      }
    }
  
    
    async function deleteWish(id) {
      let response = await deleteToWishlist(id);
      if (response.data.status === 'success') {
        setFavorites((prev) => ({ ...prev, [id]: false })); 
        toast.warning(response.data.message,options);
      }
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
  
    
    useEffect(() => {
      getRecentProduct();
    }, []);
  
    return (
      <>
        {recent.length > 0 ? (
          <div className="container mx-auto">
            <div className="row flex flex-wrap">
              {recent.map((product) => {
                return (
                  <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 overflow-hidden">
                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                      <div>
                        <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                          <img className="p-3 rounded-t-lg w-full" src={product?.imageCover} alt="product image" />
                          <div className="px-5 pb-5">
                            <span className="font-light block text-xs text-emerald-600 dark:text-emerald-400">
                              {product.category.name}
                            </span>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                              {product?.title.split(' ').slice(0, 3).join(' ')}
                            </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                              <div className="flex items-center">
                                <svg
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                                  {product.ratingsAverage}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
  
                        <div className="flex items-center justify-between gap-3 py-3 px-5">
                          <button
                            onClick={() => addProduct(product.id)}
                            className="btn-animate text-white w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          >
                            Add to cart
                          </button>
                          <button className="" onClick={() => (favorites[product.id] ? deleteWish(product.id) : addWish(product.id))}>
                            {favorites[product.id] ? (
                              <i className="fa fa-heart text-red-600" />
                            ) : (
                              <i className="fa fa-heart text-green-200" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex justify-center align-middle h-screen items-center">
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
      </>
    );
  }
  