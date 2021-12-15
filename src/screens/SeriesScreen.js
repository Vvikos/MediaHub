import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { requestSerieScreen } from "../api/api";
import {backgroundColor} from "../helpers/colors";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from 'react-native';
import SerieList from "../components/SerieList";
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import Loading from '../components/Loading';

  const Series = (props)=> {
	const { navigation } = props;
	const [loading, setLoading] = useState(true);

	useEffect( () => {
		props.getSeries();
	}, []);

	useEffect( () => {
		if(props.series.popular){
			setLoading(false);
		}
	}, [props.series]);

return (
	<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
	{ !loading ?
		props.series.popular ? 
			<SerieList navigation={navigation} series={props.series}/>
		: null
	: 
		<Loading />
	}
	</ScrollView>
	);
};

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
    return {
		series: state.api.series
    }
  }
  
  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  const mapDispatchToProps = (dispatch) => {
    return {
		getSeries: () => dispatch(actions.fetchSeries()),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Series);
