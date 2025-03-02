import React, { useState } from 'react'
import Style from './MainSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import { useEffect } from 'react';

export default function MainSlider() {
  const [categories, setCategories] = useState([])
  async function getCategories() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      setCategories(data.data)
      console.log(data.data);


    } catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {

    getCategories()

  }, [])
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>

      <div className="slider-container py-5">
        <h2 className='text-2xl py-2'>Shop Popular Categories</h2>
        <Slider {...settings}>

          {categories.map((categoriy) => <div key={categoriy._id}>
            <img className='h-52 w-full' src={categoriy.image} alt={categoriy.name} />
            <h3 className='font-light text-sm py-2 text-center'  >{categoriy.name}</h3>
          </div>


          )}
        </Slider>
      </div>

    </>
  )
}
