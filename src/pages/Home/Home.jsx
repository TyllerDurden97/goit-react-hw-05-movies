import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchApi from "../../services/fetchApi";



const Home = () => {
    const [popMovies, setPopMovies] = useState([]);
   // const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);

   useEffect((prev) => { 
      if(popMovies.length === 0)
      fetchApi().then(movies => {
         console.log(movies.data.results);
         setPopMovies(movies.data.results);
      })
         .catch(error => {
            setError(error);
         });
   }, [popMovies]);

         // console.log(popMovies);


   return (
      <>
         {error && <div>Something wents wrong</div>}
         <h2>Trending today</h2>
         <ul>
            {popMovies.map(({ id, title}) => {
               return <li key={id}>
                  <Link to={`movies/:${id}`}>
                     {title}
                  </Link>
                  </li> 
            })
            }     
         </ul>
      </>    
  );
};

export default Home;