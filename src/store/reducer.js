import { Actionsheet } from 'native-base';
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
    series: null, 
    multi: null, 
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

// ########################################################
// The Main Reducer 
// ########################################################

const Reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.API_START: return apiStartReducer(state, action);
        case actionTypes.API_FAIL: return apiSuccessReducer(state, action);
        case actionTypes.API_SUCCESS: return apiFailReducer(state, action);
        case actionTypes.API_FETCHED_FILMS: return apiFetchedFilmsReducer(state, action);
        case actionTypes.API_FETCH_FILM_DETAILS_SUCCESS: return apiFetchFilmDetailsSuccessReducer(state, action);
        default:
            return state;
    }
}

export default Reducer