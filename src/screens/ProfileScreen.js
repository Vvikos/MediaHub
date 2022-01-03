import React, { useState, useEffect} from "react";
import { StyleSheet, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';
import { Text, ListItem, Switch } from 'react-native-elements';
import {backgroundColor, inactiveTintColor, activeTintColor, alternativeTintColor, backgroundColorDarker} from "../helpers/colors";
import * as dbservice from '../db/db';

function ProfileScreen({ navigation }) {
	const [profile, setProfile] = useState('');
	const [favMoviesExpanded, setFavMoviesExpanded] = useState(true);
	const [favSeriesExpanded, setFavSeriesExpanded] = useState(true);

	useEffect( () => {
        dbservice.requestProfile(setProfile);
	}, []);

  return (
	<View style={{ borderTopWidth: 1, borderTopColor: activeTintColor, backgroundColor: backgroundColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", marginTop: 25}}>
		<View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
			<Text style={styles.text} >{"Hi, "+profile}</Text>
			<TouchableOpacity activeOpacity={0.5} onPress={() => {dbservice.removeCurrentProfile(); navigation.navigate('Profiles')}}>
				<Ionicons name="trash-outline" size={24} color='#ffffff' containerStyle={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}} style={{backgroundColor: '#eb4034', padding: 6, borderRadius: 2}} />
			</TouchableOpacity>
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
			<ListItem bottomDivider containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}>
				<ListItem.Content style={{color: activeTintColor}}>
					<ListItem.Title style={{color: activeTintColor}}>Title</ListItem.Title>
					<ListItem.Subtitle style={{color: alternativeTintColor }}>SubTitle</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
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
			<ListItem bottomDivider containerStyle={{backgroundColor:backgroundColorDarker, borderBottomColor: '#000000'}}>
				<ListItem.Content style={{color: activeTintColor}}>
					<ListItem.Title style={{color: activeTintColor}}>Title</ListItem.Title>
					<ListItem.Subtitle style={{color: alternativeTintColor }}>SubTitle</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
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


export default ProfileScreen;