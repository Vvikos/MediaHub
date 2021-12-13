import {
    getPopularMoviesUrl,
    getMustWatchMoviesUrl,
    getUpcomingMoviesUrl,
    getTopRatedMoviesUrl,
    getMovieDetailUrl,
<<<<<<< HEAD
    getPeopleDetailUrl,
=======
    getPopularSeriesUrl,
    getMustWatchSeriesUrl,
    getTopRatedSeriesUrl,
>>>>>>> origin/develop
  } from "./url";

export const request = async (url) => {
    return fetch(url)
        .then(handleErrors)
        .then((response) => response.json())
        .catch((error) => {
        console.error(error);
        });
};

const handleErrors = (response) => {
    if (!response.ok) throw Error(response.statusText);
    return response;
};

/* ***** MOVIES ***** */
export const requestMovieScreen = (callback, err) => {
return Promise.all([
    request(getPopularMoviesUrl()),
    request(getTopRatedMoviesUrl()),
    request(getMustWatchMoviesUrl()),
    request(getUpcomingMoviesUrl()),
    ])
    .then((values) => callback(values))
    .catch(err);
};
  
export const requestMovieDetailScreen = (id, callback) => {
    return Promise.all([
      request(getMovieDetailUrl(id)),
    ])
      .then((values) => callback(values))
      .catch((error) => console.log(error));
  };

export const requestPeopleDetailScreen = (id, callback) => {
    return Promise.all([
      request(getPeopleDetailUrl(id)),
    ])
      .then((values) => callback(values))
      .catch((error) => console.log(error));
  };
/* ***** SERIES ***** */
export const requestSerieScreen = (callback, err) => {
  return Promise.all([
      request(getPopularSeriesUrl()),
      request(getTopRatedSeriesUrl()),
      request(getMustWatchSeriesUrl()),
      ])
      .then((values) => callback(values))
      .catch(err);
  };
