import * as actionTypes from './actionTypes';

// ########################################################
// Initial State
// ########################################################

export const initialState = {
    error: null, 
    loading: false,
    movies: {
        popular: null,
        topRated: null, 
        mustWatch: null, 
        upcoming: null
    },
    series: {
        popular: null, 
        topRated: null,
        onTheAir: null
    }, 
    favorites: {
        movies: [],
        series: [] 
    }, 
    lastUserName: null
}

// ########################################################
// A simple function to update the state with new values
// ########################################################

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

// ########################################################
// Different Reducer Functions which change the store state
// ########################################################
const apiStartReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
}

const apiFailReducer = (state, action) => {
    return updateObject(state, {
        error: "Failed",
        loading: false,
    });
}

const apiSuccessReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
}

const apiFetchFilmDetailsSuccessReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
}

const apiFetchFavoritesSuccessReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
}

const apiFetchSerieDetailsSuccessReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
}

const apiSetLastUserNameReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        lastUserName: action.userName
    });
}


const apiFetchedFilmsReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        movies: {
            popular: action.movies[0],
            topRated: action.movies[1],
            mustWatch: action.movies[2], 
            upcoming: action.movies[3]
        }
    });
}

const apiFetchedSeriesReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        series: {
            popular: action.series[0],
            topRated: action.series[1],
            onTheAir: action.series[2], 
        }
    });
}

const apiFetchedFavoritesMovieReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        favorites: {
            movies: [...state.favorites.movies, action.movie], 
            series: state.favorites.series
        }
    });
}

const apiFetchedFavoritesSerieReducer = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        favorites: {
            series: [...state.favorites.series, action.serie], 
            movies: state.favorites.movies
        }
    });
}

const apiInitFavoritesReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        favorites: {
            series: [],
            movies: [],
        }
    });
}

const apiAddMovieFavoriteReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        favorites: {
            series: state.favorites.series,
            movies: [...state.favorites.movies, action.movie]
        }
    });
}

const apiAddSerieFavoriteReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        favorites: {
            series: [...state.favorites.series, action.serie],
            movies: state.favorites.movies
        }
    });
}

const apiDeleteMovieFavoriteReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        favorites: {
            series: state.favorites.series,
            movies: state.favorites.movies.filter(item => item.id !== action.id)
        }

    });
}

const apiDeleteSerieFavoriteReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        favorites: {
            series: state.favorites.series.filter(item => item.id !== action.id),
            movies: state.favorites.movies
        }

    });
}



// ########################################################
// The Main Reducer 
// ########################################################

const Reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.API_START: return apiStartReducer(state, action);
        case actionTypes.API_FAIL: return apiSuccessReducer(state, action);
        case actionTypes.API_SUCCESS: return apiFailReducer(state, action);
        case actionTypes.API_FETCHED_FILMS: return apiFetchedFilmsReducer(state, action);
        case actionTypes.API_FETCHED_SERIES: return apiFetchedSeriesReducer(state, action);
        case actionTypes.API_FETCHED_FAVORITES_MOVIE: return apiFetchedFavoritesMovieReducer(state, action);
        case actionTypes.API_FETCHED_FAVORITES_SERIE: return apiFetchedFavoritesSerieReducer(state, action);
        case actionTypes.API_FETCH_FILM_DETAILS_SUCCESS: return apiFetchFilmDetailsSuccessReducer(state, action);
        case actionTypes.API_FETCH_SERIE_DETAILS_SUCCESS: return apiFetchSerieDetailsSuccessReducer(state, action);
        case actionTypes.API_FETCH_FAVORITES_SUCCESS: return apiFetchFavoritesSuccessReducer(state, action);
        case actionTypes.API_FETCHED_FAVORITES_INIT: return apiInitFavoritesReducer(state, action);
        case actionTypes.API_ADD_MOVIE_FAVORITE: return apiAddMovieFavoriteReducer(state, action);
        case actionTypes.API_ADD_SERIE_FAVORITE: return apiAddSerieFavoriteReducer(state, action);
        case actionTypes.API_DELETE_MOVIE_FAVORITE: return apiDeleteMovieFavoriteReducer(state, action);
        case actionTypes.API_DELETE_SERIE_FAVORITE: return apiDeleteSerieFavoriteReducer(state, action);
        case actionTypes.API_SET_LAST_USER_NAME: return apiSetLastUserNameReducer(state, action);
        default:
            return state;
    }
}

export default Reducer
