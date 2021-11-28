import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import MovieRow from "./MovieRow";

const MovieList = (props) => {
	const [movies, setMovies] = useState([]);
	const titles = ["Populaires", "Les mieux notés", "A regarder absolument", "Prochainement"];

	useEffect(() => {
		setMovies(props.movies); 
	}, [])
	
	return (
		Object.entries(movies).map(([index, movieList]) => {
			return <MovieRow key={index} navigation={props.navigation} movieList={movieList} title={titles[index]}/>
		})
	)
};

export default MovieList;
