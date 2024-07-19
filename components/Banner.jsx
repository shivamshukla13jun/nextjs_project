import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { BaseUrl } from '@/hooks/DataFetchHook';


const Banner = ({isLoading,isError, data }) => {
  if(isLoading){
    return (
      <>Loading</>
    )
  }else if(isError){
   (
    <>something is wrong</>
   )
  }else if(!isLoading && !isError && Array.isArray(data)){
    return (
      <div className="banner-swiper-container">
        <Swiper
          // spaceBetween={50}
          // slidesPerView={1}
          // navigation
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
        >
          {data.length>0 &&  data.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="banner-slide">
                {item.image.length > 0 && (
                  <img
                    src={BaseUrl+ item.image[0]['destination']+"/"+item.image[0]['filename']}
                    alt={item.title}
                    className="banner-image"
                  />
                )}
                <div className="banner-content">
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <button>{item.buttonText}</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }
 
};

export default Banner;
