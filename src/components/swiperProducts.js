import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import QuickLook from './quickLook';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import Cards from './Card';


export default function Products() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(6);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=10&skip=67`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching products. Status: ' + response.status);
        }
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuickLook = (productId) => {
    setOpen(productId);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setSlidesPerView(3); 
      } else {
        setSlidesPerView(6); 
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (
    <div className="from-blog spad" style={{ marginTop: '4em', paddingLeft: '4em', paddingRight: '4em' }}>
      <div className="col-lg-12 ">
        <div className="section-title from-blog__title">
          <h2><LocalFireDepartmentIcon fontSize='large' />   Best Seller</h2>
        </div>
      </div>
      <div className='swiper_container'>
      <Swiper
  onSwiper={setSwiperRef}
  slidesPerView={slidesPerView}
  centeredSlides={false}
  spaceBetween={5}
  pagination={{
    type: "fraction",
  }}
  navigation={true}
  modules={[Pagination, Navigation]}
  className="mySwiper"
>
        {products ? products.map((pro) => (

          <SwiperSlide key={pro.id}>

            <Cards pro={pro} handleQuickLook={handleQuickLook} />

          </SwiperSlide>

        )) : ""}
      </Swiper>
      </div>
      <QuickLook
        open={open}
        products={products}
        handleClose={handleClose}
      />
    </div>
  );
}
