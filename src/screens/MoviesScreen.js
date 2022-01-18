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

const Movies = (props)=> {
	const { navigation, route } = props;
	const [favoris, setFavoris] = useState([]);
	const [refreshing, setRefreshing] = React.useState(false);
	const [connection, setConnection] = useState(null);

	NetInfo.fetch().then(state => {
		setConnection(state);
	});

	const onRefresh = React.useCallback(() => {
		NetInfo.fetch().then(state => {
			setConnection(state);
		});
		
		if(connection.isInternetReachable){
			setRefreshing(true);
			props.initDetailsMovie();
			Promise.resolve(props.getFilms(1)).then(() => setRefreshing(false));
		}
	}, [connection]);


	useEffect(() => {
		navigation.addListener('focus', refreshFavoris);
	  }, []);
	
	const refreshFavoris = () => {
		dbservice.requestFavoriForCurrentProfile(setFavoris);
	}
	
	useEffect( () => {
		refreshFavoris();
	}, []);
		
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
		detailsSeries: state.details.detailsSeries
    }
  }
  
  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  const mapDispatchToProps = (dispatch) => {
    return {
		getFilms: (page) => dispatch(actions.fetchFilms(page)),
		initDetailsMovie: () => dispatch(actions.initDetailsMovie()),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Movies);
