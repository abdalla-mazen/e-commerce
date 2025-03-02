import React, { useState } from 'react'
import Style from './Error.module.css'
import err from '../../assets/image/error.svg'
export default function Error() {
    const [first, setfirst] = useState(0)
  return (
    <>
    <div className='flex items-center justify-center h-screen'>
<img src={err} alt="" />

    </div>
    
    </>
  )
}
