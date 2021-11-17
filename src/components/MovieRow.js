import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import MovieCard from "./MovieCard";

const MovieRow = (props) => {
	return (
		<FlatList
			keyExtractor={(item) => item.id.toString()}
			keyboardShouldPersistTaps={"handled"}
			data={props.results}
			renderItem={({ item }) => <MovieCard {...item} />}
			contentContainerStyle={{ marginVertical: 8 }}
			/>
	)
};

export default MovieRow;
