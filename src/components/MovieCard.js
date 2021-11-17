import React, { useState, useEffect} from "react";
import { Text } from "react-native";

const MovieCard = (props) => {
	return (
		<Text style={{color: "#ffffff"}}>{props.original_title}</Text>
	)
};

export default MovieCard;
