import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import { backgroundColorDarker } from "../helpers/colors";
import MovieCard from "./MovieCard";

const MovieRow = (props) => {
	return (
		<View style={{backgroundColor: backgroundColorDarker, marginTop: 30, paddingLeft: 2, paddingRight: 2 }}>
			<Text style={{marginLeft: 15, marginBottom: 25, marginTop: 5, fontSize: 25, fontStyle:'italic', color: "#ffffff"}}>{props.title}</Text>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				keyboardShouldPersistTaps={"handled"}
				data={props.movieList.results}
				renderItem={({ item }) => <MovieCard navigation={props.navigation} movie={item} />}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
				style={{ backgroundColor: backgroundColorDarker}}
			/>	
		</View>
	)
};

export default MovieRow;
