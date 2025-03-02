import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import RecentProduct from '../RecentProduct/RecentProduct'
import MainSlider from '../MainSlider/MainSlider'
import StaticSlider from '../StaticSlider/StaticSlider'

export default function Home() {
    const [first, setfirst] = useState(0)
    let {userLogin,setuserLogin}=useContext(UserContext)

  return (
    <>
    <StaticSlider/>
    <MainSlider/>
    <RecentProduct/>
    </>
  )
}
