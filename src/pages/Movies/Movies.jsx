import { React, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import fetchSearchMov from "../../services/fetchSearchMov";
import { Loader } from 'components/Loader/Loader';


const Movies = () => {
   const [searchRequest, setSearchRequest] = useState('');
   const [movies, setMovies] = useState([]);
   const [status, setStatus] = useState('idle');
   // const [error, setError] = useState(null);
   const [searchParams, setSearchParams] = useSearchParams();
   const query = searchParams.get('query') ?? '';


   // const handleInputChange = event => {   
   //   setSearchRequest(event.currentTarget.value.toLowerCase());
   // };
   
   const handleSubmitSearch = event => {
      event.preventDefault();
      // console.log(event.target.elements.input.value);
      setSearchParams({ query: event.target.elements.input.value });

      // if (searchRequest.trim() === '') {
      //    // Notiflix.Notify.info("Please type search request".toUpperCase());
      //    return;
      // };
      // setSearchRequest('');
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
                  console.log(movie.data.results);
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
         // className={css.searchForm}
         onSubmit={handleSubmitSearch}       
      >
          <input
            // className={css.searchFormInput}
            name="input"            
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            // onChange={handleInputChange}            
             />
             <button
                  type="submit"
            // className={css.searchFormButton}
               > Search
         </button>        
         </form>
         {status === 'pending' && <Loader />}
         {status === 'rejected' && <div>There are no movies with this title.</div> }
         {/* {error && <div>Something wents wrong. Try again.</div>} */}
   
      <ul>
            {movies.map(({ id, title}) => {
               return <li key={id}>
                  <Link to={`${id}`}>
                     {title}
                  </Link>
                  </li> 
            })
            }     
         </ul>

      </>
    )
      
   
};

export default Movies;

