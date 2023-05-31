import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchApi from "../../services/fetchTrand";



const Movies = () => {
   // const [popMovies, setPopMovies] = useState([]);
   // // const [status, setStatus] = useState('idle');
   // const [error, setError] = useState(null);

   // useEffect(() => {      
   //    fetchApi()
   //       .then(movies => {
   //       console.log(movies);

   //       // setStatus('idle');
   //       setPopMovies(movies);
   //       // setStatus('resolved');
   //       // console.log(movies);
   //    })
   //       .catch(error => {
   //          setError(error);
   //          setStatus('rejected');
   //       });
   // }, []);

   //    console.log("popMovies");
   
  return (
     <div>
        {['m1', 'm2', 'm3'].map(movie => {
           return (
              <Link key={movie} to={`${movie}`}>
                 {movie}
              </Link>
           );
      })}
        </div>
  );
};

export default Movies;

