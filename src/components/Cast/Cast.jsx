import { React, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';

import fetchMovieCast from "../../services/fetchCast";

const Cast = () => {
   const { movieId } = useParams();
   const [movCast, setMovCast] = useState({});
   const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);

   useEffect(() => {
      setStatus('pending');
      (async () => {
         await fetchMovieCast(movieId)
            .then(movie => {
               setMovCast(movie.data.cast);
               setStatus('idle');
               console.log(movie.data.cast); 

            })
            .catch(error => {
               setError(error);
            });
      })()
   }, []);

   if (movCast[0])
      return (
      <>
         {status === 'pending' && <Loader/> }
            {error && <div>Something wents wrong. Try again.</div>}
            {movCast.map(({ character, name, profile_path, id }) => {
               if (profile_path) {
                  return <div key={id}>
                     <img
                        // className={css.imageMovDetails}
                        src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name} /> <br />
                     <span>{`${name}`}</span> <br />
                     <span>Character: {`${character}`}</span> <br />
                  </div>
               }
               return  <div key={id}>
                     <div>---No photo---</div> <br />
                     <span>{`${name}`}</span> <br />
                  <span>Character: {`${character}`}</span> <br />
                  
                  </div>
                    
            })}

         {/* <div>
            <img
               // className={css.imageMovDetails}
               src={`https://image.tmdb.org/t/p/w500${movDetails.poster_path}`} alt={movDetails.title} />
            <ul>
               <li>
                  <p>{`${movDetails.title} (${movDetails.release_date.slice(0,4)})`}</p>                  
               </li>
               <li>
                  <p> User Score: {`(${movDetails.vote_average})`}</p>                  
               </li>
               <li>
                  <p> Overview: <br />
                     <span>{`${movDetails.overview}`}</span>
                  </p>                  
               </li>
               <li>
                  <p> Genres: <br />
                     {movDetails.genres.map((genre) => {
                     return <span key={genre.id}> {`${genre.name}`} </span>
                  })}
                  </p>
                  
               </li>
            </ul>
         </div> */}
       
      </>      )
};

export default Cast;
