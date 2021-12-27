import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { activeTintColor, backgroundColor } from "../helpers/colors";
import { urlPosterImage } from "../helpers/url";
import * as dbservice from '../db/db';

const styles = StyleSheet.create({
	imBackground: {
	  height: 255,
	  width: 170,
	  borderRadius: 2
	},
	imFav: {
		height: 70,
		width: 70,
		backgroundColor: activeTintColor
	}
});

const MovieCard = (props) => {
	const [favori, setFavori] = useState(false);

	const onClickStar = () => {
		setFavori(!favori);
		if(!favori)
			dbservice.addFavoriForCurrentProfile(props.movie.details.id, 0);
		else
			dbservice.removeFavoriForCurrentProfile(props.movie.details.id, 0);
	}

	return (
		<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("Movie", { movie: props.movie })}>
				{ props.movie.poster_path ? 
					<Image style={styles.imBackground} source={{ uri: urlPosterImage+props.movie.poster_path }}/>
				:
					<Image style={styles.imBackground} source={require('../assets/movie_avatar.png')}/>	

				}
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.5} onPress={onClickStar}>
				{ favori ? 
					<Ionicons name="star" size={32} color={activeTintColor} style={{ marginTop: 5}} />
				:
					<Ionicons name="star-outline" size={32} color={activeTintColor} style={{ marginTop: 5}} />	
				}				
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("Movie", { movie: props.movie })}>			
				<Text style={{ textAlign: 'center', color: "#ffffff", fontSize: 18, width: 170, marginTop: 5, fontWeight: 'bold'}}>{props.movie.title}</Text>
			</TouchableOpacity>
		</View>
	)
};

export default MovieCard;
