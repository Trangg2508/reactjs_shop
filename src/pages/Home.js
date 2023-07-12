import React from 'react'
import Slide from '../components/Slide'
import ListPro from '../components/ListPro'
import Products from '../components/swiperProducts'
import Blog from '../components/Blog'

export default function Home() {
  return (
    <div>
        <Slide/>
        <Products/>
        <ListPro/>
   <Blog/>
    </div>
  )
}
