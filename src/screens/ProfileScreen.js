import React, { useState, useEffect} from "react";
import { StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';
import {
	Text,
	ListItem,
	Avatar,
	Icon,
	Badge,
	ListItemProps,
	Button,
	Switch,
	colors
  } from 'react-native-elements';
import {backgroundColor, inactiveTintColor, activeTintColor, alternativeTintColor, backgroundColorDarker} from "../helpers/colors";
import * as dbservice from '../db/db';

function ProfileScreen({ navigation }) {
	const [profile, setProfile] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [favMoviesExpanded, setFavMoviesExpanded] = useState(true);
	const [favSeriesExpanded, setFavSeriesExpanded] = useState(true);

	useEffect( () => {
        dbservice.setDarkmodePref(profile, darkMode);
	}, [darkMode]);

	useEffect( () => {
        dbservice.requestProfile(setProfile);
		dbservice.requestDarkmode(setDarkMode);
	}, []);

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
		<View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
			<Text style={styles.text} >{"Hi, "+profile}</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<Image
					style={styles.toolMini}
					source={require('../assets/moon-half.png')}
				/>
				<Switch
					value={darkMode}
					onValueChange={(value) => setDarkMode(value)}
					color={activeTintColor}
				/>
			</View>
		</View>
		<View style={{ width: '98%', marginTop: 40}}>
			<Text style={styles.text} >Favoris</Text>
			<ListItem.Accordion
			content={
				<Ionicons
						name="film-outline"
						size={32}
						color={activeTintColor}
				/>
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
		fontSize: 20
	}
});


export default ProfileScreen;