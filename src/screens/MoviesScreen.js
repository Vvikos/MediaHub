import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Movies = () => {
return (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
		<Text style={{ color: "#880921", fontSize: 40 }}>Page réservée aux films</Text>
		<Ionicons name="film-outline" size={80} color="#880921" />
	</View>
);
};

export default Movies;
