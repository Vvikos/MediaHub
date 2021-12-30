import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {backgroundColor, activeTintColor} from "../helpers/colors";
import { Image } from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import Loading from '../components/Loading';
import { requestMovieScreen } from "../api/api";
import MediaList from "../components/MediaList";

const Movies = (props)=> {
	const { navigation } = props;
  
	const [loading, setLoading] = useState(true);
	
	useEffect( () => {
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
						<MediaList navigation={navigation} medias={props.movies} type='Movie' />
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
