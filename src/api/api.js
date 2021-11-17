import {
    getPopularMoviesUrl
  } from "./url";

export const request = async (url) => {
    console.log(url);
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

export const requestMovieScreen = (callback, err) => {
return Promise.all([
    request(getPopularMoviesUrl()),
    ])
    .then((values) => callback(values))
    .catch(err);
};
  