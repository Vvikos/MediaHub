import React, { useState, useEffect} from "react";
import { Text, View } from "react-native";
import { requestMovieScreen } from "../api/api";
import MovieList from "../components/MovieList";

import {backgroundColor} from "../helpers/colors";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	
	useEffect( () => {
		requestMovies();
	}, []);

	const requestMovies = () => {
		requestMovieScreen((data) => {
			setMovies(data);
			console.log(data);
		});
	};
		
	return (
		<View style={{ backgroundColor: backgroundColor, flex: 1, alignItems: "center", justifyContent: "center" }}>
			{movies.length > 0 ? 
				<MovieList {...movies}/>
			: null }
		</View>
		);
	};

export default Movies;
