import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { urlPosterImage } from "../helpers/url";
import { activeTintColor, backgroundColor } from "../helpers/colors";
import * as dbservice from '../db/db';

const styles = StyleSheet.create({
	immBackground: {
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

const SerieCard = (props) => {
	const [favori, setFavori] = useState(false);

	const onClickStar = () => {
		setFavori(!favori);
		if(!favori)
			dbservice.addFavoriForCurrentProfile(props.serie.details.id, 1);
		else
			dbservice.removeFavoriForCurrentProfile(props.serie.details.id, 1);
	}

	return (
		<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("Serie", { serie: props.serie })}>
			{ props.serie.poster_path ? 
				<Image style={styles.immBackground} source={{ uri: urlPosterImage+props.serie.poster_path }}/>
			:
				<Image style={styles.immBackground} source = {require('../assets/movie_avatar.png')}/>	
			}
			<Text style={{ textAlign: 'center', color: "#ffffff" , fontSize: 18, width: 170, marginTop: 5, fontWeight: 'bold'}}>{props.serie.name}</Text>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.5} onPress={onClickStar}>
				{ favori ? 
					<Ionicons name="star" size={32} color={activeTintColor} />
				:
					<Ionicons name="star-outline" size={32} color={activeTintColor} />	
				}				
			</TouchableOpacity>
		</View>
	)
};

export default SerieCard;
