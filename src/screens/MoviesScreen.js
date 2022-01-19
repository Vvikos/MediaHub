import React, { useState, useEffect} from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import {backgroundColor, activeTintColor} from "../helpers/colors";
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import Loading from '../components/Loading';
import MediaList from "../components/MediaList";
import * as dbservice from '../db/db';
import { RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";

const Movies = (props)=> {
	const { navigation, route } = props;
	const [favoris, setFavoris] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);
	const [connection, setConnection] = useState(null);
	const isFocused = useIsFocused();

	NetInfo.fetch().then(state => {
		setConnection(state);
	});

	const onRefresh = React.useCallback(() => {
		NetInfo.fetch().then(state => {
			setConnection(state);
		});

		if(connection.isConnected && connection.isInternetReachable){
			setRefreshing(true);
			setRefreshing(false);
		}

	}, [connection]);


	useEffect(() => {
		navigation.addListener('focus', refreshFavoris);
	  }, [navigation]);


	useEffect(() => {
		if(isFocused){
			refreshFavoris();
		}
	  }, [isFocused]);
	
	const refreshFavoris = () => {
		dbservice.requestFavoriForCurrentProfile(setFavoris);
	}
	
		
	return (
		<SafeAreaView style={{ borderTopWidth: 1, borderTopColor: activeTintColor, backgroundColor: backgroundColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", marginTop: 25}}>
			<ScrollView 
				refreshControl={
					<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					/>
				}
				directionalLockEnabled={false} 
				contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}
			>
				{ props.movies ?
					props.movies.popular ?
						<MediaList navigation={navigation} medias={props.movies} type='Movie' favoris={favoris} onFavoriChange={refreshFavoris} />
					: null
				: 
					<Loading />
				}
			</ScrollView>
		</SafeAreaView>
		);
	};


//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
    return {
		movies: state.media.movies,
		series: state.media.series,
		detailsMovies: state.details.detailsMovies,
		detailsSeries: state.details.detailsSeries,
		counter: state.details.counter
    }
  }
  
  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  const mapDispatchToProps = (dispatch) => {
    return {
		getFilms: (page) => dispatch(actions.fetchFilms(page)),
		initDetailsMovie: () => dispatch(actions.initDetailsMovie()),
		initCounter: () => dispatch(actions.initCounter()),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Movies);
