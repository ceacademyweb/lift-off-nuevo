import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

import './slider.scss';

// import required modules
import { Navigation } from 'swiper';

export default function App() {
  return (
    <>
      <Swiper
        speed={800}
        direction={'vertical'}
        loop={true}
        className="mySwiper"
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
        }}
      >
        <SwiperSlide>
          <p>Lift-off</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>Elite trading</p>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
