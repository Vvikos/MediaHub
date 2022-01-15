import { call } from "react-native-reanimated";
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
    getSerieSeasonDetailUrl,
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

export const requestSerieSeasonDetailScreen = (id, season_number, callback) => {
  return Promise.all([
    request(getSerieSeasonDetailUrl(id, season_number)),
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
    .then((values) => {
      (values[0].results).forEach(function(media){
        if(media.media_type == "movie"){
          requestMovieDetailScreen(media.id, (data) => {
            media.details = data[0];
          });
        } else {
          requestSerieDetailScreen(media.id, (data) => {
            media.details = data[0];

            if(media.details["seasons"]){
              if(media.details["seasons"].length > 0){
                (media.details["seasons"]).forEach(function(season, index){
                    requestSerieSeasonDetailScreen(media.id, index+1, (season_detail) => {
                      media.details["seasons"][index].details = season_detail[0];
                  });
                });
              }
           }   
          });
        }
      });
      callback(values);
    })
    .catch((error) => console.log(error));
};