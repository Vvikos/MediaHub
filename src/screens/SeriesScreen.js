import React, { useState, useEffect} from "react";
import { View } from "react-native";
import {backgroundColor, activeTintColor} from "../helpers/colors";
import { ScrollView } from "react-native-gesture-handler";
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import Loading from '../components/Loading';
import MediaList from "../components/MediaList";
import * as dbservice from '../db/db';

const Series = (props)=> {
	const { navigation } = props;
	const [favoris, setFavoris] = useState([]);

	useEffect(() => {
		const requestFavoris = navigation.addListener('focus', refreshFavoris);
		return requestFavoris;
	  }, [navigation]);
	
	const refreshFavoris = () => {
		dbservice.requestFavoriForCurrentProfile(setFavoris);
	}

	useEffect( () => {
		refreshFavoris();
		props.getSeries();
	}, []);

return (
	<View style={{ borderTopWidth: 1, borderTopColor: activeTintColor, backgroundColor: backgroundColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", marginTop: 25}}>
		<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
		{ props.series ?
			props.series.popular ? 
				<MediaList navigation={navigation} medias={props.series} type='Serie' favoris={favoris} onFavoriChange={refreshFavoris} />
			: null
		: 
			<Loading />
		}
		</ScrollView>
	</View>
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
