import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { requestMovieScreen } from "../api/api";
import MovieList from "../components/MovieList";
import {backgroundColor} from "../helpers/colors";
import { Image } from 'react-native';

const styles = StyleSheet.create({
    imgLoading: {
      height: 250,
      width: 250,
    },
  });

const Movies = ({navigation}) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect( () => {
		requestMovies();
	}, []);

	const requestMovies = () => {
		requestMovieScreen((data) => {
			console.log(data);
			setMovies(data);
			setLoading(false);
		});
	};
		
	return (
		<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
			{ !loading ?
				movies.length > 0 ? 
					<MovieList navigation={navigation} movies={movies}/>
				: null
			: 
					<Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
			}
		</ScrollView>
		);
	};

export default Movies;
