import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import MovieRow from "./MovieRow";

const MovieList = (props) => {
	const [movies, setMovies] = useState([]);
	
	useEffect(() => {
		console.log("here");
		setMovies(props); 
	}, [])
	
	return (
		Object.entries(movies).map(([index, movieList]) => {
			return <MovieRow key={index} {...movieList} />
		})
	)
};

export default MovieList;
