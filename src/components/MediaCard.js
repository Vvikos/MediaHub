import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { activeTintColor, backgroundColorDarker } from "../helpers/colors";
import { urlPosterImage } from "../helpers/url";
import * as dbservice from '../db/db';
import * as actions from '../store/actions';
import {connect} from 'react-redux';

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

const MediaCard = (props) => {

	const onClickStar = () => {
        if (props.media.details) {   
            if(!props.favori){
                dbservice.addFavoriForCurrentProfile(props.media.id, (props.media.title) ? 'Movie':'Serie');
                props.addFavorite(props.media.details, (props.media.title) ? 'Movie':'Serie');
            } else {
                dbservice.removeFavoriForCurrentProfile(props.media.id, (props.media.title) ? 'Movie':'Serie');
                props.deleteFavorite(props.media.id, (props.media.title) ? 'Movie':'Serie');
            }
            props.onFavoriChange();
        }
	}

	return (
		<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate(props.type, { media: props.media.details, media_name: props.media.title ? props.media.title : props.media.name})}>
				<Image style={styles.imBackground} source={props.media.poster_path ? { uri: urlPosterImage+props.media.poster_path } : require('../assets/movie_avatar.png')}/>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.5} onPress={onClickStar}>
				<Ionicons name={props.favori ? "star" : "star-outline"} size={32} color={activeTintColor} />			
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate(props.type, { media: props.media.details, media_name: props.media.title ? props.media.title : props.media.name})}>			
				<Text style={{ textAlign: 'center', color: "#ffffff", fontSize: 18, width: 170, marginTop: 5, fontWeight: 'bold'}}>{props.media.title ? props.media.title : props.media.name}</Text>
			</TouchableOpacity>
		</View>
	)
};


  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  const mapDispatchToProps = (dispatch) => {
    return {
		addFavorite: (id, type) => dispatch(actions.addFavorite(id, type)),
		deleteFavorite: (id, type) => dispatch(actions.deleteFavorite(id, type)),
	}
  }


export default connect(null, mapDispatchToProps)(MediaCard);