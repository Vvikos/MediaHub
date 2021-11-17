import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { urlPosterImage } from "../helpers/url";

const styles = StyleSheet.create({
	immBackground: {
	  height: 255,
	  width: 170,
	},
});

const MovieCard = (props) => {
	console.log(props);
	return (
		<View>
			<Image style={styles.immBackground} source={{ uri: urlPosterImage+props.poster_path }}/>
			<Text style={{ textAlign: 'center', color: "#ffffff" , width: 170, marginTop: 20, fontWeight: 'bold'}}>{props.original_title}</Text>
		</View>
	)
};

export default MovieCard;
