import React, { useState, useEffect} from "react";
import { Platform, StyleSheet, Text, Button, TextInput, View, Image, FlatList } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import BottomTabNavigator from "./TabNavigator";
import {backgroundColor, inactiveTintColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";

import ProfilesScreen from '../screens/ProfilesScreen';

const ProfileNavigator = () => {

	return (
		<Stack.Navigator initialRouteName="Profiles" screenOptions={{headerShown: false}}>
			<Stack.Screen name="Profiles" component={ProfilesScreen} />
			<Stack.Screen name="App" component={BottomTabNavigator} />
		</Stack.Navigator>
	);
};

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

export default ProfileNavigator;