import React, { useEffect, useState } from 'react';
import { ServiceApi } from "../redux/apiService";
const { useGetMyListQuery, useAddToMyListMutation, useDeleteFromMyListMutation } = ServiceApi;
import styles from '../styles/mylists.module.css';
import Link from 'next/link';

const Mylists = () => {
  const { data, error, isError, refetch } = useGetMyListQuery({ isMylistpage: 1 });
  const [addToMyList] = useAddToMyListMutation();
  const [deleteFromMyList] = useDeleteFromMyListMutation();
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleAddToMyList = async (movieId) => {
    try {
      setApiError(null); // Clear previous errors
      await addToMyList(movieId).unwrap();
      refetch();
    } catch (err) {
      setApiError('Failed to add to My List');
      console.error(err);
    }
  };

  const handleDeleteFromMyList = async (movieId) => {
    try {
      setApiError(null); // Clear previous errors
      await deleteFromMyList(movieId).unwrap();
      refetch();
    } catch (err) {
      setApiError('Failed to remove from My List');
      console.error(err);
    }
  };

  return (
    <div className={styles.myList}>
    <h1>My List</h1>
    {isError && <p className={styles.error}>Failed to load data: {error.message}</p>}
    {apiError && <p className={styles.error}>{apiError}</p>}
    <div className='row'>
    {data && data.map((movie) => (
      <div key={movie._id} className={styles.movieItem+" col-md-6 col-lg-3 col"}>
       <Link href={`movie/${movie._id}`}>
        <img src={movie.imageurl} alt={movie.title} />
       </Link>
        <h3>{movie.title}</h3>
      
        {/* <button onClick={() => handleAddToMyList(movie._id)}>Add to My List</button> */}
        <button onClick={() => handleDeleteFromMyList(movie._id)}>Remove</button>
      </div>
    ))}
    </div>
  
  </div>
  );
};

export default Mylists;
