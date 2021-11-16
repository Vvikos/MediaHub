import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
return (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	<Text style={{ color: "#880921", fontSize: 40 }}>Page réservée aux recherches</Text>
	<Ionicons name="search-outline" size={80} color="#880921" />
	</View>
);
};

export default Search;
