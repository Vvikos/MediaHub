import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';
import {backgroundColor, inactiveTintColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";
import * as dbservice from '../db/db';
import Loading from '../components/Loading';
import Header from '../components/Header';

function AddProfile({ navigation, onInsert, onCancel }) {
	const [value, setValue] = useState('');

	const onAddProfile = () => {
		dbservice.addProfile(value);
        onInsert();
	};

  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
			<Image
				style={styles.profileCardBig}
				source={require('../assets/no_profil.png')}
			/>
			<TextInput
				style={styles.input}
				placeholder="Nouveau profile..."
				onChangeText={setValue}
			/>
			<View style={{ width:'65%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4}}>
				<Button title="Annuler" color={backgroundColor} onPress={onCancel}  />
				<Button title="Ajouter" color={activeTintColor} onPress={onAddProfile} disabled={!(value!='')} />
			</View>
    </View>
  );
}

function AddProfileCard({ navigation, onAddProfile }) {
	return (
		  <TouchableOpacity activeOpacity={0.5} onPress={onAddProfile} >    
			<Ionicons name="add-outline" style={styles.addProfileCard} />
		  </TouchableOpacity>
	);
}

function ProfileCard({ name, img, navigation }) {
	const onClickProfile = () => {
		// select profile in bdd
		dbservice.selectProfile(name);

		// reset navigation stack
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
		<TouchableOpacity activeOpacity={0.5} onPress={onClickProfile} >    
			<Image
				style={styles.profileCard}
				source={require('../assets/no_profil.png')}
			/>
			<Text style={styles.text}>{name}</Text>
		</TouchableOpacity>
	);
}

const ProfilesScreen = ({ navigation })=> {
	const [loading, setLoading] = useState(false);
	const [profiles, setProfiles] = useState([]);
    const [addScreen, setAddScreen] = useState(false);

	
	useEffect( () => {
		dbservice.initProfiles();
        dbservice.requestProfiles(setProfiles);
	}, []);

	useEffect( () => {
		
		console.log(profiles);
	}, [profiles]);

    useEffect( () => {
        if(!addScreen){
            dbservice.requestProfiles(setProfiles);
        }
	}, [addScreen]);

    const activateAddScreen = () => {
        setAddScreen(true);
    }

    const desactivateAddScreen = () => {
        setAddScreen(false);
    }

	const generateProfiles = () => {
		const rows = [];
        let max = ((profiles.length > 3) ? 3 : profiles.length);
		for(let i=0; i<max; i++){
			rows.push(<ProfileCard key={'Profile'+i} name={profiles[i]} img='' navigation={navigation}/>);
		}
		rows.push(<AddProfileCard key={'addProfile'} navigation={navigation} onAddProfile={activateAddScreen}/>);
		return rows;
	};

  return (
	<>
		<Header />
		<View style={{ flexDirection: 'row', marginTop: -120, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{!loading ?
                addScreen ?
                    <AddProfile onInsert={desactivateAddScreen} onCancel={desactivateAddScreen}/>
                :
                    generateProfiles()
            :
                <Loading />
            }
		</View>
	</>
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


export default ProfilesScreen;