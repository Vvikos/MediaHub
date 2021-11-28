import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { requestMovieScreen } from "../api/api";
import MovieList from "../components/MovieList";

import {backgroundColor} from "../helpers/colors";

const Movies = ({navigation}) => {
	const [movies, setMovies] = useState([]);
	
	useEffect( () => {
		requestMovies();
	}, []);

	const requestMovies = () => {
		requestMovieScreen((data) => {
			setMovies(data);
		});
	};
		
	return (
		<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
			{movies.length > 0 ? 
				<MovieList navigation={navigation} movies={movies}/>
			: null }
		</ScrollView>
		);
	};

export default Movies;
