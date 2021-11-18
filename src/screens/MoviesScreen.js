import React, { useState, useEffect} from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
		<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, alignItems: "center", justifyContent: "center" }}>
			{movies.length > 0 ? 
				<MovieList {...movies}/>
			: null }
		</ScrollView>
		);
	};

export default Movies;
