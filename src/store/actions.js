import * as actionTypes from './actionTypes';
import {
    getPopularMoviesUrl,
    getMustWatchMoviesUrl,
    getUpcomingMoviesUrl,
    getTopRatedMoviesUrl,
    getMovieDetailUrl,
    getPeopleDetailUrl,
    getPopularSeriesUrl,
    getMustWatchSeriesUrl,
    getTopRatedSeriesUrl,
    getFindMultiUrl,
  } from "../api/url";

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



export const apiStart = () => {
    return {
        type: actionTypes.API_START
    }
}

export const apiSuccess = () => {
    return {
        type: actionTypes.API_SUCCESS
    }
}

export const apiFetchFilmDetailsSuccess = () => {
    return {
        type: actionTypes.API_FETCH_FILM_DETAILS_SUCCESS
    }
}

export const apiFail = () => {
    return {
        type: actionTypes.API_FAIL
    }
}

export const apiFetchedFilms = (movies) => {
    return {
        type: actionTypes.API_FETCHED_FILMS,
        movies: movies
    }
}


export const fetchFilms = () => {
    return dispatch => {
            dispatch(apiStart);
 
            Promise.all([
                request(getPopularMoviesUrl()),
                request(getTopRatedMoviesUrl()),
                request(getMustWatchMoviesUrl()),
                request(getUpcomingMoviesUrl()),

            ]).then((movies) => {


                (movies).forEach(function(movieList){
                    (movieList.results).forEach(function(movie){
                        Promise.all([
                            request(getMovieDetailUrl(movie.id)),
                        ])
                            .then((details) =>{
                                movie.details = details[0];
                                dispatch(apiFetchFilmDetailsSuccess);
                            })
                            .catch(() => {
                                dispatch(apiFail);
                            });
                    });
                });

                dispatch(apiFetchedFilms(movies))
                dispatch(apiSuccess);

            }).catch(() => {
                dispatch(apiFail);
            });
    }
}



export const requestPeopleDetailScreen = (id, callback) => {
    return Promise.all([
      request(getPeopleDetailUrl(id)),
    ])
      .then((values) => callback(values))
      .catch((error) => console.log(error));
  };
