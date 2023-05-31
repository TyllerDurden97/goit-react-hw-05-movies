import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from 'components/Loader/Loader';
import fetchApi from "../../services/fetchTrand";



const Home = () => {
    const [popMovies, setPopMovies] = useState([]);
   const [status, setStatus] = useState('idle');
   const [error, setError] = useState(null);

   useEffect(() => { 
      if (popMovies.length === 0)
         setStatus('pending');
      fetchApi()
         .then(movies => {
            console.log(movies.data.results); 
            setPopMovies(movies.data.results);
            setStatus('idle');
      })
         .catch(error => {
            setError(error);
         });
   }, []);

         // console.log(popMovies);


   return (
      <>
         {status === 'pending' && <Loader/> }
         {error && <div>Something wents wrong. Try again.</div>}
         <h2>Trending today</h2>
         <ul>
            {popMovies.map(({ id, title}) => {
               return <li key={id}>
                  <Link to={`movies/${id}`}>
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