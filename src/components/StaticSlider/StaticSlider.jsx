import React, { useState } from 'react'
import Style from './StaticSlider.module.css'
import Slider1 from '../../assets/image/slider-image-1.jpeg'
import Slider2 from '../../assets/image/slider-image-2.jpeg'
import Slider3 from '../../assets/image/slider-image-3.jpeg'
import Slide4 from '../../assets/image/grocery-banner.png'
import Slide5 from '../../assets/image/grocery-banner-2.jpeg'
import Slider from "react-slick";
export default function StaticSlider() {
    const [first, setfirst] = useState(0)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false,
      autoplay:true
    };
  return (
 <>
 <div className="flex items-start py-5">
  <div className='w-3/4'>
  <div className="slider-container">
      <Slider {...settings}>
    <img className='h-[300px]'   src={Slider1} alt="" />
    <img  className='h-[300px]'src={Slider2} alt="" />
    <img className='h-[300px]' src={Slider3} alt="" />
       
      </Slider>
    </div>
  </div>
  <div className='w-1/4'>
    <img className='h-[150px]'  src={Slide4} alt="" />
    <img className='h-[150px]' src={Slide5} alt="" />

      
  </div>

 </div>
 
 </>
  )
}
