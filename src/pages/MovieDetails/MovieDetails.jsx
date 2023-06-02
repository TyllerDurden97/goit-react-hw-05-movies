import { React, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';
import fetchMovieDetails from "../../services/fetchDetails";

const MovieDetails = () => {
   const { movieId } = useParams();
   const [movDetails, setMovDetails] = useState({});
   const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);

   useEffect(() => {
      setStatus('pending');
      (async () => {
         await fetchMovieDetails(movieId)
            .then(movie => {
               setMovDetails(movie.data);
               setStatus('idle');
               // console.log(movie.data); 

            })
            .catch(error => {
               setError(error);
            });
      })()
   }, [movieId]);      
  
   // const { overview, poster_path, title, release_date, vote_average } = movDetails;
   // const yearRelease = release_date.slice(0, 3);
   // console.log(movDetails);
  
   if(movDetails.id)
   return (
      <>
         {status === 'pending' && <Loader/> }
         {error && <div>Something wents wrong. Try again.</div>}

         <div>
            <img
               // className={css.imageMovDetails}
               src={`https://image.tmdb.org/t/p/w500${movDetails.poster_path}`} alt={movDetails.title} />
            <ul>
               <li>
                  <p>{`${movDetails.title} (${movDetails.release_date.slice(0,4)})`}</p>                  
               </li>
               <li>
                  <p> User Score: {`${Math.round(movDetails.vote_average*10)}%`}</p>                  
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
         </div>
         <h2>Additional information</h2>
         <ul>
            <li>
               <Link to='cast'>Cast</Link>
            </li>
            <li>
               <Link to='reviews'>Reviews</Link>
            </li>
         </ul>
         <Outlet/>
      </>
   );
}; 

export default MovieDetails;