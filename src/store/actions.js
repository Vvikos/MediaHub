import * as actionTypes from './actionTypes';
import {
    getPopularMoviesUrl,
    getMustWatchMoviesUrl,
    getUpcomingMoviesUrl,
    getTopRatedMoviesUrl,
    getMovieDetailUrl,
    getPeopleDetailUrl,
    getPopularSeriesUrl,
    getOnTheAirSeriesUrl,
    getTopRatedSeriesUrl,
    getFindMultiUrl,
    getSerieSeasonDetailUrl,
    getSerieDetailUrl,
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

export const apiFetchFilmDetailsSuccess = (counter) => {
    return {
        type: actionTypes.API_FETCH_FILM_DETAILS_SUCCESS
    }
}

export const apiFetchSerieDetailsSuccess = () => {
    return {
        type: actionTypes.API_FETCH_SERIE_DETAILS_SUCCESS
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

export const apiFetchedSeries = (series) => {
    return {
        type: actionTypes.API_FETCHED_SERIES,
        series: series
    }
}

export const apiFetchedFavoritesMovie = (movie) => {
    return {
        type: actionTypes.API_FETCHED_FAVORITES_MOVIE, 
        movie: movie
    }
}

export const apiFetchedFavoritesSerie = (serie) => {
    return {
        type: actionTypes.API_FETCHED_FAVORITES_SERIE, 
        serie: serie
    }
}

export const apiFetchedFavoritesInit = () => {
    return {
        type: actionTypes.API_FETCHED_FAVORITES_INIT,
    }
}


export const apiAddMovieFavorite = (movie) => {
    return {
        type: actionTypes.API_ADD_MOVIE_FAVORITE, 
        movie: movie
    }
}

export const apiAddSerieFavorite = (serie) => {
    return {
        type: actionTypes.API_ADD_SERIE_FAVORITE, 
        serie: serie
    }
}

export const apiDeleteMovieFavorite = (id) => {
    return {
        type: actionTypes.API_DELETE_MOVIE_FAVORITE, 
        id: id
    }
}

export const apiDeleteSerieFavorite = (id) => {
    return {
        type: actionTypes.API_DELETE_SERIE_FAVORITE, 
        id: id
    }
}



export const fetchFilms = () => {
    let counter = 0;
    return dispatch => {
            dispatch(apiStart());
 
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
                                dispatch(apiFetchFilmDetailsSuccess(counter++));
                            })
                            .catch(() => {
                                dispatch(apiFail);
                            });
                    });
                });

                dispatch(apiFetchedFilms(movies))
                dispatch(apiSuccess());

            }).catch(() => {
                dispatch(apiFail());
            });
    }
}


export const fetchSeries = () => {
    return dispatch => {
            dispatch(apiStart());
 
            Promise.all([
                request(getPopularSeriesUrl()),
                request(getTopRatedSeriesUrl()),
                request(getOnTheAirSeriesUrl()),

            ]).then((series) => {

                (series).forEach(function(serieList){
                    (serieList.results).forEach(function(serie){
                        Promise.all([
                            request(getSerieDetailUrl(serie.id)),
                        ])
                            .then((details) =>{
                                serie.details = details[0];
                                dispatch(apiFetchSerieDetailsSuccess());

                                if(serie.details.seasons.length > 0){
                                    (serie.details.seasons).forEach(function(season, index){
                                        Promise.all([
                                            request(getSerieSeasonDetailUrl(serie.id, index+1)),
                                        ]). 
                                        then((season_detail) => {
                                            serie.details.seasons[index].details = season_detail[0];
                                        })
                                        .catch(() => {
                                            dispatch(apiFail());
                                        });
                                    });
                                }
                        
                            }).catch(() => {
                                dispatch(apiFail());
                            });
                    });
                });

                dispatch(apiFetchedSeries(series))
                dispatch(apiSuccess());

            }).catch(() => {
                dispatch(apiFail());
            });
    }
}


//TODO: consider case when no data can be fetched, what will be shown ? 
export const fetchFavorites = (favorites) => {
    
    return dispatch => {
            dispatch(apiStart());
            if(favorites){
                Object.entries(favorites).map(([index, media]) => {
                    if(media["media_type"] == "Movie"){
                        Promise.all([
                            request(getMovieDetailUrl(media["id_media"])),
                        ])
                            .then((details) =>{
                                dispatch(apiFetchedFavoritesMovie(details[0])); 
                            });


                    } else {
                        Promise.all([
                            request(getSerieDetailUrl(media["id_media"])),
                        ])
                            .then((details) =>{
                                let serie = details[0];
                                dispatch(apiFetchSerieDetailsSuccess());
                                if(serie["seasons"].length > 0){
                                    (serie["seasons"]).forEach(function(season, index){
                                        Promise.all([
                                            request(getSerieSeasonDetailUrl(serie.id, index+1)),
                                        ]). 
                                        then((season_detail) => {
                                            serie["seasons"][index]["details"] = season_detail[0];
                                        });
                                    });
                                }

                                dispatch(apiFetchedFavoritesSerie(serie)); 
                            });

                    }
                });
                dispatch(apiSuccess());
            }

            dispatch(apiFail());
     }
}


export const initFavorite = () => {
    return dispatch => {
        dispatch(apiStart());
        dispatch(apiFetchedFavoritesInit());
        dispatch(apiSuccess());
    }
}

export const addFavorite = (media, type) => {
    return dispatch => {
        dispatch(apiStart);

        if(type == "Movie"){
            dispatch(apiAddMovieFavorite(media));
        } else {
            dispatch(apiAddSerieFavorite(media));
        }
    }
}

export const deleteFavorite = (id, type) => {
    return dispatch => {
        dispatch(apiStart);

        if(type == "Movie"){
            dispatch(apiDeleteMovieFavorite(id));
        } else {
            dispatch(apiDeleteSerieFavorite(id));
        }
    }
}