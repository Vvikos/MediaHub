import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import SerieCard from "./SerieCard";

const SerieRow = (props) => {
	return (
		<>
			<Text style={{marginLeft: 10, fontSize: 25, fontWeight: "bold", color: "#ffffff", marginTop: 30}}>{props.title}</Text>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				keyboardShouldPersistTaps={"handled"}
				data={props.serieList.results}
				renderItem={({ item }) => <SerieCard navigation={props.navigation} serie={item} />}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View style={{ margin: 15 }} />}
				style={{ marginLeft: 10, marginTop: 20, marginBottom: 15}}
			/>	
		</>
	)
};

export default SerieRow;
