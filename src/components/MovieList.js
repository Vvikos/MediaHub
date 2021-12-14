import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import MovieRow from "./MovieRow";
import types from "../helpers/types";

const MovieList = (props) => {
	return (
		Object.entries(props.movies).map(([index, movieList]) => {
			return <MovieRow key={index} navigation={props.navigation} movieList={movieList} title={types[index]}/>
		})
	)
};

export default MovieList;
