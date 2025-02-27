import React, { useState } from 'react'
import Style from './Products.module.css'
import RecentProduct from '../RecentProduct/RecentProduct'

export default function Products() {
    const [first, setfirst] = useState(0)
  return (
 <>
 
 <RecentProduct/>
 
 </>
  )
}
