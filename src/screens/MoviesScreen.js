import React, { useState, useEffect} from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { requestMovieApi } from "../api/api";

const Movies = () => {

const [movies, setMovies] = useState([]);
useEffect( () => {
	requestMovieScreen();
   }, []);

const requestMovieScreen = async () => {
	await requestMovieApi((data) => {
		setMovies(data);
		console.log(data);
	});
};
	
return (
	<View style={{ backgroundColor: '#303030', flex: 1, alignItems: "center", justifyContent: "center" }}>
		<Text style={{ color: "#880921", fontSize: 40 }}>Page réservée aux films</Text>
		<Ionicons name="film-outline" size={80} color="#880921" />
	</View>
	);
};

export default Movies;
