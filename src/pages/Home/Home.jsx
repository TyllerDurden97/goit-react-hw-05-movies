import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';
import fetchApi from "../../services/fetchTrand";
import css from 'pages/Home/Home.module.css';

const Home = () => {
   const [popMovies, setPopMovies] = useState([]);
   const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);
   const location = useLocation();

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
         });
   }, []);

   return (
      <>
         {status === 'pending' && <Loader/> }
         {error && <div>Something wents wrong. Try again.</div>}
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