import { React, useEffect, useState, useRef, Suspense } from "react";
import { Link, Outlet, useParams, useLocation, Navigate } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';
import fetchMovieDetails from "../../services/fetchDetails";
import css from 'pages/MovieDetails/MovieDetails.module.css';

   const MovieDetails = () => {
   const { movieId } = useParams();
   const [movDetails, setMovDetails] = useState({});
   const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);
   const location = useLocation();
   const goBackLocationRef = useRef(location.state?.from ?? '/');

   useEffect(() => {
      setStatus('pending');
      (async () => {
         await fetchMovieDetails(movieId)
            .then(movie => {
               setMovDetails(movie.data);
               setStatus('idle');
            })
            .catch(error => {
               setError(error);
            });
      })()
   }, [movieId]);   
    
   if(movDetails.id)
   return (
      <>
         {status === 'pending' && <Loader/> }
         {error && <Navigate to={goBackLocationRef.current} />}
         {<Link to={goBackLocationRef.current}
            className={css.goBackLink}
         >Go back</Link>}
         <div className={css.movieDetails}>
            <img
               className={css.imageMovDetails}
               src={`https://image.tmdb.org/t/p/w500${movDetails.poster_path}`} alt={movDetails.title} />
            <ul className={css.detailsList}>
               <li>
                  <p className={css.detailsTitle}>{`${movDetails.title} (${movDetails.release_date.slice(0,4)})`}</p>                  
               </li>
               <li>
                  <p className={css.detailsInfo}> User Score: {`${Math.round(movDetails.vote_average*10)}%`}</p>                  
               </li>
               <li>
                  <p className={css.detailsTitle}> Overview: <br />
                     <span className={css.detailsInfo}>{`${movDetails.overview}`}</span>
                  </p>                  
               </li>
               <li>
                  <p className={css.detailsTitle}> Genres: <br />
                     {movDetails.genres.map((genre) => {
                     return <span key={genre.id} className={css.detailsInfo}> {`${genre.name}`} </span>
                  })}
                  </p>
                  
               </li>
            </ul>
         </div>
         <h2 className={css.movieDetailsInfo}>Additional information</h2>
         <ul className={css.movieDetailsInfoLinks}>
            <li>
               <Link to='cast' className={css.movieDetailsLink}>Cast</Link>
            </li>
            <li>
               <Link to='reviews' className={css.movieDetailsLink}>Reviews</Link>
            </li>
         </ul>
      <Suspense fallback={<Loader/>}>
        <Outlet />
         </Suspense>
      </>
   );
}; 

export default MovieDetails;