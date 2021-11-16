import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Series = () => {
return (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	<Text style={{ color: "#880921", fontSize: 40 }}>Page réservée aux séries</Text>
	<Ionicons name="tv-outline" size={80} color="#880921" />
	</View>
);
};

export default Series;
