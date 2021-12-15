import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import SerieRow from "./SerieRow";
import types from "../helpers/types";

const SerieList = (props) => {

	return (
		Object.entries(props.series).map(([index, serieList]) => {
			return <SerieRow key={index} navigation={props.navigation} serieList={serieList} title={types[index]}/>
		})
	)
};

export default SerieList;
