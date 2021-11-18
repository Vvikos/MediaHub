const ROOT_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = "07349efd542005c2fc1e3079fb201f2b";

const defaultQuery = {
    api_key: API_KEY,
    language: "fr-FR",
  };

const queryString = (obj) => {
    return Object.entries(obj)
      .map(([index, val]) => `${index}=${val}`)
      .join("&");
  };
  
/*
--- APPELS API ---

Exemples : 
La liste des films les plus connus du moment 
    https://api.themoviedb.org/3/discover/movie?api_key=07349efd542005c2fc1e3079fb201f2b&sort_by=popularity.desc

Pour le poster du film -> poster_path 
    https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg

Pour l'image de fond -> backdrop_path
    https://image.tmdb.org/t/p/w500/cinER0ESG0eJ49kXlExM0MEWGxW.jpg
*/

export const getPopularMoviesUrl = (page) =>    `${ROOT_URL}/movie/popular?${queryString({ ...defaultQuery, ...page })}`;
export const getTopRatedMoviesUrl = (page) =>   `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "vote_count.desc" }, ...page })}`;
export const getMustWatchMoviesUrl = (page) =>  `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "revenue.desc" }, ...page })}`;
export const getUpcomingMoviesUrl = (page) =>   `${ROOT_URL}/movie/upcoming?${queryString({ ...defaultQuery, ...page })}`;
