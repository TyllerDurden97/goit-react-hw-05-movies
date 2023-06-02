import axios from 'axios';

   const API_KEY = '80b919ebaba440b66b502ccefd484b0d';
   const BASE_URL = 'https://api.themoviedb.org/3/';


async function fetchMovieReviews (movieId) {
   try {
    const data = await axios.get(`${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`)

      return data;
 }   
      catch(error) {
         console.log(error.message);
         throw new Error(error.message);
      };
};

// fetchMovieDetails(603692);
                  // console.log(fetchMovieReviews(603692));


export default fetchMovieReviews;


// https://api.themoviedb.org/3/movie/{movie_id}/reviews