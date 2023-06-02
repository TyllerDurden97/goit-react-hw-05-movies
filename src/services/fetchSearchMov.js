import axios from 'axios';

   const API_KEY = '80b919ebaba440b66b502ccefd484b0d';
   const BASE_URL = 'https://api.themoviedb.org/3/';


async function fetchSearchMov (query) {
   try {
    return await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`)
    }   
      catch(error) {
         console.log(error);
         throw new Error(error.message);
      };
};




// https://api.themoviedb.org/3/search/movie
export default fetchSearchMov;