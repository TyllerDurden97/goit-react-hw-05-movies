import { React, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';
import fetchApi from "../../services/fetchTrand";
import css from 'pages/Home/Home.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const Home = () => {
   const [popMovies, setPopMovies] = useState([]);
   const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);
   const location = useLocation();
   const [searchParams, setSearchParams] = useSearchParams();
               console.log(searchParams)

   
   useEffect(() => { 
      if (popMovies.length === 0)
         setStatus('pending');
      fetchApi()
         .then(movies => {
            setPopMovies(movies.data.results);
            setStatus('idle');
      })
         .catch(error => {
            setError(error);
            console.log(error)
            Notify.info("404 page not found".toUpperCase());
            // setSearchParams({})
         });
   }, [popMovies.length]);

   return (
      <>
         {status === 'pending' && <Loader/> }
         {error && <Navigate to={'/movies'} />}
         <h1 className={css.homeTitle}>Trending today</h1>
         <ol className={css.homeMovieList}>
            {popMovies.map(({ id, title}) => {
               return <li key={id}>
                  <Link to={`movies/${id}`} state={{ from: location }} className={css.homeMovieLink}>
                     {title}
                  </Link>
                  </li> 
            })
            }     
         </ol>
      </>    
  );
};

export default Home;