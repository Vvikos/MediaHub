import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { activeTintColor, backgroundColorDarker } from "../helpers/colors";
import { urlPosterImage } from "../helpers/url";
import * as dbservice from '../db/db';
import types from "../helpers/types";
import MediaCard from "./MediaCard";

const MediaRow = (props) => {
	console.log(props.favoris);
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

export default MediaList;
