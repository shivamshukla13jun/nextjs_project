import React, { useEffect, useState } from "react";
import { NextSeo } from 'next-seo';
import styles from '../../styles/Movie.module.css';
import { useRouter } from "next/router";
import { ServiceApi } from '../../redux/apiService';
import Link from "next/link";
const {useGetMovieByidQuery}=ServiceApi
const SingleMovie = () => {
  const { _id } = useRouter().query
  const {isLoading,isError,data:movie}=useGetMovieByidQuery({_id:_id || ""})
  console.log("movie",movie?.data)

if(isLoading){
    return <div>Loading</div>
}else if(isError){
    <div className="">
        Error found
    </div>
}else if(!isLoading && !isError){
    return (
        <div className={styles.container}>
        <NextSeo
            title={movie.data.title}
            description={movie.data.desc}
            openGraph={{
                title: movie.data.title,
                description: movie.data.desc,
                images: [
                    {
                        url: movie.data.imageurl,
                        width: 800,
                        height: 600,
                        alt: `${movie.data.title} Poster`,
                    },
                ],
            }}
        />
        <div className={styles.imageContainer}>
            <img src={movie.data.imageurl} alt={`${movie.data.title} Poster`} className={styles.image} />
        </div>
        <h1 className={styles.title}>{movie.data.title}</h1>
        <p className={styles.desc}>{movie.data.desc}</p>
        <div className={styles.details}>
            <p><strong>Type:</strong> {movie.data.type}</p>
            <p><strong>Episodes:</strong> {movie.data.episodes}</p>
            <p><strong>Genre:</strong> {
                movie.data.genre.map((item,index)=>(<>
               <Link href={`/genre/${item._id}`}>
             
                <span>
                {item.name} 
                {(movie.data.genre.length-1)!==index?",":""}
                </span>
                </Link>
                </>))
            }</p>

            <p><strong>Premiered:</strong> {movie.data.premiered}</p>
            <p><strong>Status:</strong> {movie.data.status}</p>
            <p><strong>Studios:</strong> {movie.data.studios.join(', ')}</p>
            <p><strong>Source:</strong> {movie.data.source}</p>
            <p><strong>Runtime:</strong> {movie.data.runtime}</p>
            <p><strong>Rating:</strong> {movie.data.rating}</p>
            <p><strong>Score:</strong> {movie.data.rate}</p>
        </div>
    </div>
      );
}

};

export default SingleMovie;
