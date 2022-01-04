import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { activeTintColor, backgroundColorDarker } from "../helpers/colors";
import { urlPosterImage } from "../helpers/url";
import * as dbservice from '../db/db';
import types from "../helpers/types";

const MediaCard = (props) => {

	const onClickStar = () => {
		if(!props.favori)
			dbservice.addFavoriForCurrentProfile(props.media.details.id, (props.media.title) ? 'Movie':'Serie');
		else
			dbservice.removeFavoriForCurrentProfile(props.media.details.id, (props.media.title) ? 'Movie':'Serie');
		props.onFavoriChange();
	}

	return (
		<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate(props.type, { media: props.media })}>
				<Image style={styles.imBackground} source={props.media.poster_path ? { uri: urlPosterImage+props.media.poster_path } : require('../assets/movie_avatar.png')}/>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.5} onPress={onClickStar}>
				<Ionicons name={props.favori ? "star" : "star-outline"} size={32} color={activeTintColor} />			
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate(props.type, { media: props.media })}>			
				<Text style={{ textAlign: 'center', color: "#ffffff", fontSize: 18, width: 170, marginTop: 5, fontWeight: 'bold'}}>{props.media.title ? props.media.title : props.media.name}</Text>
			</TouchableOpacity>
		</View>
	)
};

const MediaRow = (props) => {
	return (
		<View style={{backgroundColor: backgroundColorDarker, marginTop: 30, paddingLeft: 2, paddingRight: 2 }}>
			<Text style={{marginLeft: 15, marginBottom: 25, marginTop: 5, fontSize: 25, fontStyle:'italic', color: "#ffffff"}}>{props.title}</Text>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				keyboardShouldPersistTaps={"handled"}
				data={props.mediaList.results}
				renderItem={({ item }) => <MediaCard navigation={props.navigation} type={props.type} media={item} favori={props.favoris.some(e => e.id_media === item.id)} onFavoriChange={props.onFavoriChange} />}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
				style={{ backgroundColor: backgroundColorDarker}}
			/>	
		</View>
	)
};

const MediaList = (props) => {
	return (
		Object.entries(props.medias).map(([index, mediaList]) => {
			return <MediaRow key={index} navigation={props.navigation} favoris={props.favoris} onFavoriChange={props.onFavoriChange} mediaList={mediaList} title={types[index]} type={props.type} />
		})
	)
};

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

export default MediaList;
