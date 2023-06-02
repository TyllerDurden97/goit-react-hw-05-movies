import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';

import fetchMovieReviews from "../../services/fetchReviews";

const Reviews = () => {
   const { movieId } = useParams();
   const [movReviews, setMovReviews] = useState({});
   const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);

   useEffect(() => {
      setStatus('pending');
      (async () => {
         await fetchMovieReviews(movieId)
            .then(movie => {
               setMovReviews(movie.data);
               setStatus('idle');
               console.log(movie.data); 

            })
            .catch(error => {
               setError(error);
            });
      })()
   }, []);

   if (movReviews.id) 
      return (
      <>
         {status === 'pending' && <Loader/> }
         {error && <div>Something wents wrong. Try again.</div>}
         {movReviews.results.length === 0 && <p>We don`t have any reviews for this movie</p>}                  
           
            <ul>
               {movReviews.results.map(({ author, content, id }) => {
                  return <li key={id}>
                     <h3>Author: {`${author}`}</h3>
                     <p>{`${content}`}</p>
                  </li>                    
            })}    
            </ul>
         </>
      )
};

export default Reviews;