import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import slide1 from '../assets/slide1.png'
import slide2 from '../assets/slide2.png'
import slide3 from '../assets/slide3.png'
import slide4 from '../assets/slide4.png'
import slide5 from '../assets/slide5.png'

export default function Slide() {


  return (
    <div className="container_slide">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide >
          <img className="slide_img" src={slide1} alt="Slide1"  />
        </SwiperSlide>
        <SwiperSlide >
          <img className="slide_img" src={slide2} alt="Slide2"  />
        </SwiperSlide>
        <SwiperSlide >
          <img className="slide_img" src={slide3} alt="Slide3" />
        </SwiperSlide>
        <SwiperSlide >
          <img className="slide_img" src={slide4} alt="Slide4"  />
        </SwiperSlide>
        <SwiperSlide >
          <img className="slide_img" src={slide5} alt="Slide5"  />
        </SwiperSlide>
      </Swiper>


    </div>
  );
}
