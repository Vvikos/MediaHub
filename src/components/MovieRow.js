import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";

const MovieRow = (props) => {
	return (
		<FlatList
			keyExtractor={(item) => item.id.toString()}
			keyboardShouldPersistTaps={"handled"}
			data={props.results}
			renderItem={({ item }) => <Text style={{color: "#ffffff"}}>{item.original_title}</Text>}
			contentContainerStyle={{ marginVertical: 8 }}
			/>
	)
};

export default MovieRow;
