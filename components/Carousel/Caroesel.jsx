
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import CarouselCard from "./CarouselCard";
import Link from 'next/link';
const Caroesel = ({ Loading,Error, movies }) => {
  return (
    <>
      {Loading ? (
        <div className="text-center">
         Loading
        </div>
      ) : Error ? (
        <div className="text-center">
        something is wrong
        </div>
      ) :  
        movies.length > 0 ?
        movies.map((h) => {
          
          return (
            <>
           
            <h3> {h.title}</h3>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                  clickable: true,
              }}
              // modules={[Pagination]}
              className="mySwiper"
          >
             {
              h.content && h.content.length>0 &&  h.content.map((movie) =>{
                console.log("movie",movie)
                return (
                  // <CarouselCard
                  // imgSm={content.imageurl || content.poster }
                  // id={content._id}
                  // genre={content.genre}
                  // title={content.title}
                  // />
                  <SwiperSlide key={movie._id}>
                
                      <div className="posterImage">
                      <Link style={{ textDecoration: "none", color: "white" }} href={`/movie/${movie._id}`} >
                          <img src={movie.imageurl || movie.poster} />
                          </Link>
                      </div>
                      <div className="posterImage__overlay">
                          <div className="posterImage__title">{movie.title }</div>
                          <div className="posterImage__runtime">
                              { movie.release_date }
                              <span className="posterImage__rating">
                                  { movie.rate }
                                  <i className="fas fa-star" />{" "}
                              </span>
                          </div>
                          <div className="posterImage__description">{movie.desc}</div>
                      </div>
              
              </SwiperSlide>
                )
               })
             }
            </Swiper>
           </>
          );
        }):<div> movies not found</div>
      }
    </>
  );
};

export default Caroesel;
