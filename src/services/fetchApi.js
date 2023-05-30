import axios from 'axios';

   const API_KEY = '80b919ebaba440b66b502ccefd484b0d';
   const BASE_URL = 'https://api.themoviedb.org/3/';


async function fetchApi () {
   try {
    const data = await axios.get(`${BASE_URL}trending/movie/day?api_key=${API_KEY}&language=en-US`)
         return data;
 }   
      catch(error) {
         console.log(error.message);
         throw new Error(error.message);
      };
};
   // console.log(fetchApi());
   // fetchApi();
 
export default fetchApi;

// https://api.themoviedb.org/3/movie/{movie_id}
// https://api.themoviedb.org/3/trending/all/day

// https://api.themoviedb.org/3/search/movie


// export function getFotos (whatToFind) {
//    const API_KEY = '80b919ebaba440b66b502ccefd484b0d';
//    const BASE_URL = 'https://api.themoviedb.org/3/';
//    const searchParams = new URLSearchParams({
//         key: API_KEY,
//         q: whatToFind,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//         per_page: [perPage],
//       page: [currentPage],
//         });
//    try {
//       return axios
//          .get(`${BASE_URL}?${searchParams}`);
//    } catch (error) {
//       throw new Error(error.massege);
//    }
// };

//  https://api.themoviedb.org/3/search/movie?api_key=80b919ebaba440b66b502ccefd484b0d&query=Jack+Reacher