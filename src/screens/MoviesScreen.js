import React, { useState, useEffect} from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {backgroundColor, activeTintColor} from "../helpers/colors";
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import Loading from '../components/Loading';
import MediaList from "../components/MediaList";
import * as dbservice from '../db/db';

const Movies = (props)=> {
	const { navigation, route } = props;
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
	}, []);
		
	return (
		<View style={{ borderTopWidth: 1, borderTopColor: activeTintColor, backgroundColor: backgroundColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", marginTop: 25}}>
			<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
				{ props.movies ?
					props.movies.popular ?
						<MediaList navigation={navigation} medias={props.movies} type='Movie' favoris={favoris} onFavoriChange={refreshFavoris} />
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
		movies: state.api.movies
    }
  }
  


export default connect(mapStateToProps, null)(Movies);
