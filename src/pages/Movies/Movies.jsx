import { React, useEffect, useState } from "react";
import { Link, useSearchParams, useLocation, Navigate } from "react-router-dom";
import fetchSearchMov from "../../services/fetchSearchMov";
import { Loader } from 'components/Loader/Loader';
import css from 'pages/Movies/Movie.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Movies = () => {
   const [movies, setMovies] = useState([]);
   const [status, setStatus] = useState('idle');
   const [searchParams, setSearchParams] = useSearchParams();
   const query = searchParams.get('query') ?? '';
   const location = useLocation();
   const [error, setError] = useState(null);

   
   const handleSubmitSearch = event => {
      event.preventDefault();
      setSearchParams({ query: event.target.elements.input.value });
      event.target.elements.input.value = '';
   };

   useEffect(() => {
      if (query !== '') {
         (async () => {
            setStatus('pending');
            await fetchSearchMov(query)
               .then(movie => {
                  if (movie.data.results.length === 0) {
                     setStatus('rejected')
                     setMovies([])
                     return; 
                  };
                  setMovies(movie.data.results);
                  setStatus('idle');
               })
               .catch(error => {
               setError(error);
                  console.log(error)
                  Notify.info("404 page not found".toUpperCase());
                  setStatus('idle');
                  setMovies([]);
               });
         })()
      };
      }, [query]);

   
   return (
      <>
      {error && <Navigate to={'/movies'} />}
   
      <form
         onSubmit={handleSubmitSearch} 
         className={css.movieForm}   
      >
         <input
            name="input"            
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            className={css.movieInput}
         />
         <button
            type="submit"
            className={css.movieFormBtn}
               > Search
         </button>        
      </form>
         {status === 'pending' && <Loader />}
         {status === 'rejected' && <div>There are no movies with this title.</div> }
      <ol className={css.moviesList}>
            {movies.map(({ id, title}) => {
               return <li key={id}>
                  <Link to={`${id}`}
                     state={{ from: location }}
                     className={css.movieLink}
                  >
                     {title}
                  </Link>
                  </li> 
            })
            }     
         </ol>

      </>
    ) 
   };

export default Movies;

