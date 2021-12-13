import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { requestSerieScreen } from "../api/api";
import {backgroundColor} from "../helpers/colors";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from 'react-native';
import SerieList from "../components/SerieList";

const styles = StyleSheet.create({
    imgLoading: {
      height: 250,
      width: 250,
    },
  });

const Series = ({navigation}) => {
	const [series, setSeries] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect( () => {
		requestSeries();
	}, []);

	const requestSeries = () => {
		requestSerieScreen((data) => {
			console.log(data);
			setSeries(data);
			setLoading(false);
		});
	};

return (
	<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
	{ !loading ?
		series.length > 0 ? 
			<SerieList navigation={navigation} series={series}/>
		: null
	: 
			<Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
	}
	</ScrollView>
	);
};

export default Series;
