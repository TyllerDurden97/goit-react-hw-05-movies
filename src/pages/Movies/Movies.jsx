import { Link } from "react-router-dom";

const Movies = () => {
    //http
   //useEffect (() => {
   // 
   // }, [])
   
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

