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
	const { navigation } = props;
  
	const [loading, setLoading] = useState(true);
	const [favoris, setFavoris] = useState([]);

	useEffect(() => {
		const requestFavoris = navigation.addListener('focus', refreshFavoris);
		return requestFavoris;
	  }, [navigation]);
	
	const refreshFavoris = () => {
		console.log('REFRESH FROM MOVIES')
		dbservice.requestFavoriForCurrentProfile(setFavoris);
	}
	
	useEffect( () => {
		refreshFavoris();
		props.getFilms();
	}, []);

	useEffect( () => {
		if(props.movies.popular){
			setLoading(false);
		}
	}, [props.movies]);

		
	return (
		<View style={{ borderTopWidth: 1, borderTopColor: activeTintColor, backgroundColor: backgroundColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", marginTop: 25}}>
			<ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
				{ !loading ?
					props.movies.popular ? 
						//<MovieList navigation={navigation} movies={props.movies}/>
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
  
  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  const mapDispatchToProps = (dispatch) => {
    return {
		getFilms: () => dispatch(actions.fetchFilms()),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Movies);
