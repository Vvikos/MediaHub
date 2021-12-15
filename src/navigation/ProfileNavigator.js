import React, { useState, useEffect} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, Button, TextInput, View, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import BottomTabNavigator from "./TabNavigator";
import {backgroundColor, inactiveTintColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";
import Loading from "../components/Loading";

//import * as SQLite from 'expo-sqlite'
//const db = SQLite.openDatabase('db.profiles') // returns Database object


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
  return (
		<TouchableOpacity activeOpacity={0.5} onPress={function() { navigation.navigate('App')}}>    
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
				<Image
					style={styles.addProfileCard}
					source={require('../assets/addprofile.svg')}
				/>
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
    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		{generateProfiles()}
    </View>
  );
}

const ProfileNavigator = () => {
	const [loading, setLoading] = useState(false);
	const [profiles, setProfiles] = useState(['Dieu', 'Janos', 'Baptiste']);

	const fetchData = () => {
	
		/*db.transaction(tx => {
		// sending 4 arguments in executeSql
		tx.executeSql('SELECT * FROM profiles', null, // passing sql query and parameters:null
			// success callback which sends two things Transaction object and ResultSet Object
			(txObj, { rows: { _array } }) => function() {console.log('SQLite ', _array); setProfiles(_array)},
			// failure callback which sends two things Transaction object and Error
			(txObj, error) => console.log('SQLite Error ', error)
			) // end executeSQL
		}) // end transaction*/
  	}

	useEffect( () => {
		// Check if the profiles table exists if not create it
		/*db.transaction(tx => {
		tx.executeSql(
			'CREATE TABLE IF NOT EXISTS profiles(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, UNIQUE(id, text))'
		)
		});
			db.transaction(tx => {
		tx.executeSql(
			'INSERT OR IGNORE INTO profiles(id, name) VALUES(0, Zeus)'
		)
		});
		fetchData(); // ignore it for now*/
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
		height: '10vw',
		width: '10vw'
	},
	addProfileCard: {
		height: '4vw',
		width: '4vw',
		marginLeft: '3vw'
	},
	input: {
		color: backgroundColor,
		borderColor: activeTintColor,
		backgroundColor: '#ffffff',
		marginBottom: '2vh',
		padding: '1vh'
	},
	text : { 
		color: activeTintColor, 
		textAlign: 'center',
		fontWeight: '600',
		fontSize: 20
	}
});

/*
<Stack.Navigator initialRouteName="Profiles" screenOptions={{headerShown: false}}>
				<Stack.Screen name="Profiles" component={ProfilesScreen} initialParams={{profiles: profiles}} />
				<Stack.Screen name="AddProfile" component={AddProfile} />
				<Stack.Screen name="App" component={BottomTabNavigator} />
			</Stack.Navigator>
*/

export default ProfileNavigator;