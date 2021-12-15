import {
    getPopularMoviesUrl,
    getMustWatchMoviesUrl,
    getUpcomingMoviesUrl,
    getTopRatedMoviesUrl,
    getMovieDetailUrl,
    getSerieDetailUrl,
    getPeopleDetailUrl,
    getPopularSeriesUrl,
    getMustWatchSeriesUrl,
    getTopRatedSeriesUrl,
    getFindMultiUrl,
  } from "./url";

export const request = async (url) => {
    return fetch(url)
        .then(handleErrors)
        .then((response) => response.json())
        .catch((error) => {
          //console.error(error);
        });
};

const handleErrors = (response) => {
    return response;
};

export const requestMovieDetailScreen = (id, callback) => {
  return Promise.all([
    request(getMovieDetailUrl(id)),
  ])
    .then((values) => callback(values))
    .catch((error) => console.log(error));
};

export const requestSerieDetailScreen = (id, callback) => {
  return Promise.all([
    request(getSerieDetailUrl(id)),
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


/* ***** GENERAL ***** */
export const requestFindMulti = (page, query, callback) => {
  return Promise.all([
    request(getFindMultiUrl(page, query)),
  ])
    .then((values) => callback(values))
    .catch((error) => console.log(error));
};