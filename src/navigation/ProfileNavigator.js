import React, { useState, useEffect} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, Button, TextInput, View, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import BottomTabNavigator from "./TabNavigator";
import {backgroundColor, inactiveTintColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";

import Header from '../components/Header';

import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.profiles') // returns Database object


function AddProfile({ navigation }) {
	const [canAdd, setCanAdd] = useState(false);

	const onChangeText = (text) => {
		setCanAdd(text!='');
	};

  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
			<Image
				style={styles.profileCard}
				source={require('../assets/no_profil.png')}
			/>
			<TextInput
				style={styles.input}
				placeholder="Nouveau profile..."
				onChangeText={onChangeText}
			/>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<Button title="Annuler" color={backgroundColor} onPress={function() { navigation.navigate('Profiles')}} />
				<Button title="Ajouter" color={activeTintColor} onPress={function() { navigation.navigate('Profiles')}} disabled={!canAdd} />
			</View>
    </View>
  );
}

function ProfileCard({ name, img, navigation }) {
	const resetNavigationStack = () => {
		navigation.dispatch(
			CommonActions.reset({
			  index: 1,
			  routes: [
				{ name: 'App' },
			  ],
			})
		  );
	}
  return (
		<TouchableOpacity activeOpacity={0.5} onPress={function() {resetNavigationStack()}}>    
			<Image
				style={styles.profileCard}
				source={require('../assets/no_profil.png')}
			/>
			<Text style={styles.text}>{name}</Text>
		</TouchableOpacity>
  );
}

function AddProfileCard({ navigation }) {
	return (
		  <TouchableOpacity activeOpacity={0.5} onPress={function() { navigation.navigate('AddProfile')}}>    
			<Ionicons name="add-outline" style={styles.addProfileCard} />
		  </TouchableOpacity>
	);
  }

function ProfilesScreen({ navigation, route }) {
	const generateProfiles = () => {
		const rows = [];
		for(let i=0; i<route.params.profiles.length; i++){
			rows.push(<ProfileCard key={'Profile'+i} name={route.params.profiles[i]} img='' navigation={navigation}/>);
		}
		rows.push(<AddProfileCard key={'addProfile'} navigation={navigation}/>);

		return rows;
	};

  return (
	<>
		<Header />
		<View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{generateProfiles()}
		</View>
	</>
  );
}

const ProfileNavigator = () => {
	const [loading, setLoading] = useState(false);
	const [profiles, setProfiles] = useState(['Dieu', 'Janos', 'Baptiste']);

	const fetchData = () => {
		db.transaction(tx => {
			// sending 4 arguments in executeSql
			tx.executeSql('SELECT * FROM profiles', null, // passing sql query and parameters:null
				// success callback which sends two things Transaction object and ResultSet Object
				(txObj, { rows: { _array } }) => function() {console.log('SQLite ', _array); setProfiles(_array)},
				// failure callback which sends two things Transaction object and Error
				(txObj, error) => console.log('SQLite Error ', error)
				) // end executeSQL
		}); // end transaction
  	}

	useEffect( () => {
		// Check if the profiles table exists if not create it
		db.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
			)
		});
		db.transaction(tx => {
			tx.executeSql(
				'INSERT OR IGNORE INTO profiles (id, name) VALUES(0, Zeus)'
			)
		});
		fetchData();
	}, []);

	useEffect( () => {
		console.log('PROFILES', profiles);
	}, [profiles]);

	return (
		<Stack.Navigator initialRouteName="Profiles" screenOptions={{headerShown: false}}>
			<Stack.Screen name="Profiles" component={ProfilesScreen} initialParams={{profiles: profiles}} />
			<Stack.Screen name="AddProfile" component={AddProfile} />
			<Stack.Screen name="App" component={BottomTabNavigator} />
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	profileCard: {
		height: 75,
		width: 75
	},
	addProfileCard: {
		fontSize: 50,
		color: activeTintColor,
		marginLeft: 20,
		borderColor: activeTintColor,
		borderWidth: 1,
		borderRadius: 2
	},
	input: {
		color: backgroundColor,
		borderColor: activeTintColor,
		backgroundColor: '#ffffff',
		marginBottom: 3,
		padding: 3
	},
	text : { 
		color: activeTintColor, 
		textAlign: 'center',
		fontWeight: '600',
		fontSize: 20
	}
});

export default ProfileNavigator;