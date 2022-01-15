import React, { useState, useEffect} from "react";
import { StyleSheet, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';
import { Text, ListItem, Switch } from 'react-native-elements';
import {backgroundColor, inactiveTintColor, activeTintColor, alternativeTintColor, backgroundColorDarker} from "../helpers/colors";
import * as dbservice from '../db/db';
import * as actions from '../store/actions';
import {connect} from 'react-redux';


function ProfileScreen(props) {
	const { navigation, test } = props;
	const [profile, setProfile] = useState('');
	const [favMoviesExpanded, setFavMoviesExpanded] = useState(true);
	const [favSeriesExpanded, setFavSeriesExpanded] = useState(true);
	const [favoris, setFavoris] =  useState(null);

	useEffect( () => {
		dbservice.requestProfile(setProfile);
		dbservice.requestFavoriForCurrentProfile(setFavoris);

	}, []);

	useEffect(() => {
		const requestFavoris = navigation.addListener('focus', refreshFavoris);
		return requestFavoris;
	}, [navigation]);

	const refreshFavoris = () => {
		dbservice.requestFavoriForCurrentProfile(setFavoris);
	}

	const changeProfiles = () => {
		props.initFavorite();
		navigation.navigate('Profiles');
	}

	const deleteProfile = () => {
		props.initFavorite();
		dbservice.removeCurrentProfile();
		navigation.navigate('Profiles');
	}

  return (
	<View style={{ borderTopWidth: 1, borderTopColor: activeTintColor, backgroundColor: backgroundColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", marginTop: 25}}>
		<View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
			<Text style={styles.text} >{"Hi, "+profile}</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
				<TouchableOpacity activeOpacity={0.5} onPress={() => changeProfiles()}>
					<Ionicons 
						name="people-outline" 
						size={24} color={activeTintColor} 
						containerStyle={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}} 
						style={{backgroundColor: backgroundColorDarker, padding: 6, borderRadius: 2, borderColor: activeTintColor, borderWidth: 0.5, margin: 1}} 
					/>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.5} onPress={() => deleteProfile()}>
					<Ionicons 
						name="trash-outline" 
						size={24} color='#ffffff' 
						containerStyle={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}} 
						style={{backgroundColor: '#eb4034', padding: 6, borderRadius: 2, borderColor: '#eb4034', borderWidth: 0.5,  margin: 1}} 
					/>
				</TouchableOpacity>
			</View>
		</View>
		<View style={{ width: '98%', marginTop: 40, flexDirection: 'column', justifyContent: 'flex-start'}}>
			<Text style={styles.headerTitle} >Favoris</Text>
			<ListItem.Accordion
			content={
				<Ionicons name="film-outline" size={32} color={activeTintColor} />
			}
			containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}
			isExpanded={favMoviesExpanded}
			bottomDivider
			onPress={() => {
				setFavMoviesExpanded(!favMoviesExpanded);
			}}
			>
			{ props.favorites ?
				props.favorites.movies.length > 0 ?
					Object.entries(props.favorites.movies).map(([index, movie]) => {
						return (
						<ListItem key={index} bottomDivider containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}>
							<ListItem.Content style={{color: activeTintColor}}>
								<ListItem.Title style={{color: activeTintColor}}>{movie.title }</ListItem.Title>
							</ListItem.Content>
							<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("Movie", { media: movie, media_name: movie.title })}>		
								<ListItem.Chevron />
							</TouchableOpacity>
						</ListItem>
						)
				})
			: 
				<ListItem bottomDivider containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}>
					<ListItem.Content style={{color: activeTintColor}}>
						<ListItem.Subtitle style={{color: alternativeTintColor }}>Aucun film favori sauvegardé.</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			: null 
			}
			</ListItem.Accordion>

			<ListItem.Accordion
			content={
				<Ionicons
						name="tv-outline"
						size={32}
						color={activeTintColor}
				/>
			}
			containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}
			isExpanded={favSeriesExpanded}
			bottomDivider
			onPress={() => {
				setFavSeriesExpanded(!favSeriesExpanded);
			}}
			>
			{ props.favorites ?
				props.favorites.series.length > 0 ?
					Object.entries(props.favorites.series).map(([index, serie]) => {
						return (
						<ListItem key={index} bottomDivider containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}>
							<ListItem.Content style={{color: activeTintColor}}>
								<ListItem.Title style={{color: activeTintColor}}>{serie.name }</ListItem.Title>
							</ListItem.Content>
							<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("Serie", { media: serie, media_name: serie.name})}>		
								<ListItem.Chevron />
							</TouchableOpacity>
						</ListItem>
						)
				})
			: 
				<ListItem bottomDivider containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}>
					<ListItem.Content style={{color: activeTintColor}}>
						<ListItem.Subtitle style={{color: alternativeTintColor }}>Aucune série favori sauvegardé.</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			: null 
			}
			</ListItem.Accordion>
		</View>
	 </View>
  );
}

const styles = StyleSheet.create({
	profileCard: {
		height: 75,
		width: 75
	},
	headerTitle: {
		fontSize: 18, 
		color: "#ffffff", 
		textAlign: 'left', 
		fontWeight: 'bold',
		marginLeft: 10
	},
    profileCardBig: {
		height: 175,
		width: 175,
		padding: 10
	},
	toolMini: {
		height: 25,
		width: 25,
		padding: 1
	},
	addProfileCard: {
		fontSize: 50,
		textAlign: 'center',
		paddingLeft: 3,
		color: activeTintColor,
		borderColor: activeTintColor,
		borderWidth: 1,
		borderRadius: 2
	},
    input: {
		color: backgroundColor,
		borderColor: activeTintColor,
		backgroundColor: '#ffffff',
		marginBottom: 3,
		padding: 3,
		width: '65%'
	},
	text : { 
		color: activeTintColor, 
		textAlign: 'center',
		fontWeight: '600',
		fontSize: 24
	}
});


//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
    return {
		favorites: state.api.favorites
    }
  }
  
  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  const mapDispatchToProps = (dispatch) => {
    return {
		initFavorite: () => dispatch(actions.initFavorite()),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
