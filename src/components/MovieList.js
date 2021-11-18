import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import MovieRow from "./MovieRow";

const MovieList = (props) => {
	const [movies, setMovies] = useState([]);
	const titles = ["Popular", "Top Rated", "Must Watch", "Upcoming"];

	useEffect(() => {
		setMovies(props); 
	}, [])
	
	return (
		Object.entries(movies).map(([index, movieList]) => {
			return <MovieRow key={index} movieList={movieList} title={titles[index]}/>
		})
	)
};

export default MovieList;
