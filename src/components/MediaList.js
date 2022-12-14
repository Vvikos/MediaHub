import React from "react";
import { Text, View, FlatList } from "react-native";
import { activeTintColor, backgroundColorDarker } from "../helpers/colors";
import types from "../helpers/types";
import MediaCard from "./MediaCard";

const MediaRow = (props) => {
	return (
		<View style={{ backgroundColor: backgroundColorDarker, marginTop: 20, paddingLeft: 2, paddingRight: 2, paddingBottom: 10 }}>
			<Text style={{marginLeft: 15, marginBottom: 10, marginTop: 15, fontSize: 27, color: "#ffffff"}}>{props.title}</Text>
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
