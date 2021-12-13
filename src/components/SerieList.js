import React, { useState, useEffect} from "react";
import { FlatList, Text, View } from "react-native";
import SerieRow from "./SerieRow";

const SerieList = (props) => {
	const [series, setSeries] = useState([]);
	const titles = ["Populaires", "Les mieux notés", "A regarder absolument"];

	useEffect(() => {
		setSeries(props.series); 
	}, [])
	
	return (
		Object.entries(series).map(([index, serieList]) => {
			return <SerieRow key={index} navigation={props.navigation} serieList={serieList} title={titles[index]}/>
		})
	)
};

export default SerieList;
