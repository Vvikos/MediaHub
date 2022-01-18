import * as actionTypes from './actionTypes';

// ########################################################
// Initial State
// ########################################################

export const initialState = {
    error: null, 
    loading: false,
    detailsMovies: null,
    detailsSeries: null,
    counter: 0
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


const apiAddDetailsMovieReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        detailsMovies: {...state.detailsMovies, [action.movieId]: action.detailsMovie}, 
        counter: state.counter + 1
    });
}

const apiAddDetailsSerieReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        detailsSeries: {...state.detailsSeries, [action.serieId]: action.detailsSerie}, 
        counter: state.counter + 1 
    });
}

const apiInitDetailsSerieReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        detailsSeries: null
    });
}

const apiInitDetailsMovieReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        detailsMovies: null

    });
}

const apiInitCounterReducer = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: false, 
        counter: 0
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
        case actionTypes.API_ADD_DETAILS_MOVIE: return apiAddDetailsMovieReducer(state, action);
        case actionTypes.API_ADD_DETAILS_SERIE: return apiAddDetailsSerieReducer(state, action);
        case actionTypes.API_INIT_DETAILS_MOVIE: return apiInitDetailsMovieReducer(state, action);
        case actionTypes.API_INIT_DETAILS_SERIE: return apiInitDetailsSerieReducer(state, action);
        case actionTypes.API_INIT_COUNTER: return apiInitCounterReducer(state, action);
        default:
            return state;
    }
}

export default Reducer
