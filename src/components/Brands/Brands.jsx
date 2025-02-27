import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
export default function Brands() {
  const [brands, setBrands] = useState([])
  async function getBrands() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      setBrands(data.data)
      // console.log(data.data);
      
    } catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {

    getBrands()

  }, [])

  return (
<>

{ brands.length>0 ? <div className='flex flex-wrap flex-row  '>
        {brands.map((brands) => <div key={brands._id} className=' w-full md:w-1/2 lg:w-1/3 xl:w-1/4  p-3     '>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-auto hover:shadow-[1px_1px_10px_#4fa74f] transition-shadow">
            <span>
              <img className="rounded-t-lg h-82 w-full" src={brands.image} />
            </span>
            <div className="p-5">
              <h3 className='text-center text-main text-xl'>{brands.name}</h3>
            </div>
          </div>
        </div>




        )}


      </div>:<div className='flex justify-center align-middle h-screen  items-center'><div className="lds-ring"><div /><div /><div /><div /></div>
      </div> }


</>
  )
}
