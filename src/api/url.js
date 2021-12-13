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

Id du film Eternals -> 524434
Accéder aux détails d'un film via son id
    https://api.themoviedb.org/3/movie/524434?api_key=07349efd542005c2fc1e3079fb201f2b&language=fr-FR

Accéder au casting d'un film 
    http://api.themoviedb.org/3/movie/580489/casts?api_key=07349efd542005c2fc1e3079fb201f2b&language=fr-FR
   
    Image de l'acteur/actrice
    https://image.tmdb.org/t/p/w500/stTKj4iNauhqlVmZ6XAsFsvcMCY.jpg

BA du film 
   https://api.themoviedb.org/3/movie/580489/videos?api_key=07349efd542005c2fc1e3079fb201f2b&language=fr-FR
    -> https://www.youtube.com/watch?v=results[1].key 
*/

export const getPopularMoviesUrl = (page) =>    `${ROOT_URL}/movie/popular?${queryString({ ...defaultQuery, ...page })}`;
export const getTopRatedMoviesUrl = (page) =>   `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "vote_count.desc" }, ...page })}`;
export const getMustWatchMoviesUrl = (page) =>  `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "revenue.desc" }, ...page })}`;
export const getUpcomingMoviesUrl = (page) =>   `${ROOT_URL}/movie/upcoming?${queryString({ ...defaultQuery, ...page })}`;

export const getPeopleDetailUrl = (id) =>   `${ROOT_URL}/person/${id}?append_to_response=combined_credits&${queryString(defaultQuery)}`;

export const getMovieDetailUrl = (id) => `${ROOT_URL}/movie/${id}?append_to_response=credits&${queryString(defaultQuery)}`;

export const getPopularSeriesUrl = (page) =>    `${ROOT_URL}/tv/popular?${queryString({ ...defaultQuery, ...page })}`;
export const getTopRatedSeriesUrl = (page) =>   `${ROOT_URL}/discover/tv?${queryString({ ...defaultQuery, ...{ sort_by: "vote_count.desc" }, ...page })}`;
export const getMustWatchSeriesUrl = (page) =>  `${ROOT_URL}/discover/tv?${queryString({ ...defaultQuery, ...{ sort_by: "revenue.desc" }, ...page })}`;
// export const getUpcomingSeriesUrl = (page) =>   `${ROOT_URL}/tv/upcoming?${queryString({ ...defaultQuery, ...page })}`;
