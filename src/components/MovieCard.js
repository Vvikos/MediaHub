import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlPosterImage } from "../helpers/url";

const styles = StyleSheet.create({
	immBackground: {
	  height: 255,
	  width: 170,
	  borderRadius: 8
	},
});

const MovieCard = (props) => {
	return (
		<View>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("Movie", { movie: props.movie })}>
			{ props.movie.poster_path ? 
				<Image style={styles.immBackground} source={{ uri: urlPosterImage+props.movie.poster_path }}/>
			:
				<Image style={styles.immBackground} source = {require('../assets/movie_avatar.png')}/>	
			}				
			<Text style={{ textAlign: 'center', color: "#ffffff" , width: 170, marginTop: 20, fontWeight: 'bold'}}>{props.movie.title}</Text>
			</TouchableOpacity>
		</View>
	)
};

export default MovieCard;
