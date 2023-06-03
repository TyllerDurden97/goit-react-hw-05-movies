import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';
import css from 'components/Cast/Cast.module.css';
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
            })
            .catch(error => {
               setError(error);
            });
      })()
   }, [movieId]);

   if (movCast[0])
      return (
      <>
         {status === 'pending' && <Loader/> }
            {error && <div>Something wents wrong. Try again.</div>}
            {movCast.map(({ character, name, profile_path, id }) => {
               if (profile_path) {
                  return <div
                     key={id}
                  className={css.castItem}>
                     <img
                        src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name} width="200"/>
                     <span className={css.castInfo}>{`${name}`}</span> <br />
                     <span className={css.castInfo}>Character: {`${character}`}</span> 
                  </div>
               }
               return  <div key={id}>
                     <div>---No photo---</div> <br />
                     <span className={css.castInfo}>{`${name}`}</span> <br />
                  <span className={css.castInfo}>Character: {`${character}`}</span>                   
                  </div>                    
            })}
         </>
      )
};

export default Cast;
