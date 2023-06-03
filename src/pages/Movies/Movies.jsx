import { React, useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import fetchSearchMov from "../../services/fetchSearchMov";
import { Loader } from 'components/Loader/Loader';
import css from 'pages/Movies/Movie.module.css';

const Movies = () => {
   const [movies, setMovies] = useState([]);
   const [status, setStatus] = useState('idle');
   const [searchParams, setSearchParams] = useSearchParams();
   const query = searchParams.get('query') ?? '';
   const location = useLocation();
   
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
                  console.log(error)
               });
         })()
      };
      }, [query]);

   
   return (
      <>
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

