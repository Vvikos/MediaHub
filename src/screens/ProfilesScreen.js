import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';
import {backgroundColor, inactiveTintColor, backgroundColorDarker, activeTintColor, activeTintColorFocsued} from "../helpers/colors";
import * as dbservice from '../db/db';
import {connect} from 'react-redux';
import Loading from '../components/Loading';
import Header from '../components/Header';
import * as actions from '../store/actions';
import NetInfo from "@react-native-community/netinfo";

const styles = StyleSheet.create({
	profileCard: {
		height: 100,
		width: 100
	},
    profileCardBig: {
		height: 175,
		width: 175,
		padding: 10
	},
	addProfileCard: {
		textAlign: 'center',
		paddingLeft: 3,
		color: activeTintColor
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

function AddProfile({ navigation, onInsert, onCancel, disableCancel }) {
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
				<Button title="Annuler" color={backgroundColor} onPress={onCancel} disabled={disableCancel} />
				<Button title="Ajouter" color={activeTintColor} onPress={onAddProfile} disabled={!(value!='')} />
			</View>
    </View>
  );
}

function AddProfileCard({ navigation, onAddProfile, disabled }) {
	return (
		  <TouchableOpacity activeOpacity={0.5} onPress={onAddProfile} disabled={disabled} >    
			<Ionicons name="add-circle-sharp" size={85} style={styles.addProfileCard} />
			<Text style={styles.text}></Text>
		  </TouchableOpacity>
	);
}

function ProfileCard({ name, img, navigation, onClickProfile }) {
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

const ProfilesScreen = (props)=> {	
	const { navigation } = props;
	const [loading, setLoading] = useState(true);
	const [profiles, setProfiles] = useState([]);
    const [addScreen, setAddScreen] = useState(false);
	const [profile, setProfile] = useState([]);
	const [firstCo, setFirstCo] = useState(false);
	const [connection, setConnection] = useState(null);

	NetInfo.fetch().then(state => {
		setConnection(state);
	});
	
	useEffect( () => {
		if(connection){
			dbservice.initBase();
		
			if(!props.series.popular){
				if(connection.isInternetReachable){
					setFirstCo(false);
					props.getFilms(1);
				} else {
					setFirstCo(true);
				}
			}

			if(!props.series.popular){
				if(connection.isInternetReachable){
					setFirstCo(false);
					props.getSeries(1);
				} else {
					setFirstCo(true);
				}
			}

			if(connection.isInternetReachable || !firstCo){
				dbservice.requestProfiles(setProfiles);
			}
		}
	}, [connection]);

	useEffect( () => {
		setLoading(false);
		setAddScreen(profiles.length==0);
	}, [profiles]);

    useEffect( () => {
        if(!addScreen){
            dbservice.requestProfiles(setProfiles);
        }
	}, [addScreen]);

	const tryConnect = () => {
		NetInfo.fetch().then(state => {
			setConnection(state);
		});
	}

    const activateAddScreen = () => {
        setAddScreen(true);
    }

    const desactivateAddScreen = () => {
        setAddScreen(false);
    }

	const getFavorites = (name, favoris) => {
		if(name != props.lastUserName){
			props.initFavorites();
			props.fetchFavorites(favoris);
			props.setLastUserName(name);
		}
	}

	const onClickProfile = (name) => {
		// select profile in bdd
		dbservice.selectProfile(name);

		// reset navigation stac
		dbservice.requestFavoriForCurrentProfile((favoris) => getFavorites(name, favoris));		
		
		navigation.navigate('App');
	}

	const generateProfiles = () => {
		const rows = [];
        let max = ((profiles.length > 3) ? 3 : profiles.length);
		for(let i=0; i<max; i++){
			rows.push(<ProfileCard key={'Profile'+i} name={profiles[i]} onClickProfile={() => onClickProfile(profiles[i])}  img='' navigation={navigation}/>);
		}
		rows.push(<AddProfileCard key={'addProfile'} navigation={navigation} onAddProfile={activateAddScreen} disabled={profiles.length>2} />);
		return rows;
	};

  return (
	<>
		<Header />
		{firstCo ? 
				<View style={{ marginTop: -120, flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "center" }}>
					<Text style={{marginLeft: 40, marginRight: 40, color:"#ffffff"}}>{connection ? connection.isInternetReachable ? "" : "Merci de vous connecter au moins une fois avec de la connexion à MediaHub. ": null}</Text>
				 	
					<TouchableOpacity style={{marginTop: 40}} activeOpacity={0.5} onPress={() => tryConnect()}>
						<Ionicons 
							name="refresh" 
							size={24} color={activeTintColor} 
							containerStyle={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}} 
							style={{backgroundColor: backgroundColorDarker, padding: 6, borderRadius: 2, borderColor: activeTintColor, borderWidth: 0.5, margin: 1}} 
						/>
					</TouchableOpacity>
				 </View>
		:
		<View style={{ flexDirection: 'row', marginTop: -120, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{loading ?
				<Loading />
			:
                addScreen ?
                    <AddProfile onInsert={desactivateAddScreen} onCancel={desactivateAddScreen} disableCancel={profiles.length==0} />
                :
                    generateProfiles()
            }
		</View>
		}
	</>
  );
}

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
    return {
		movies: state.api.movies,
		series: state.api.series,
		favorites: state.api.favorites,
		lastUserName: state.api.lastUserName,
    }
  }
  
  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  //TODO: ajouter get favorites ()
  const mapDispatchToProps = (dispatch) => {
    return {
		setLastUserName: (userName) => dispatch(actions.setLastUserName(userName)),
		getFilms: (page) => dispatch(actions.fetchFilms(page)),
		getSeries: (page) => dispatch(actions.fetchSeries(page)),
		initFavorites: () => dispatch(actions.initFavorite()),
		fetchFavorites: (favorites) => dispatch(actions.fetchFavorites(favorites))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(ProfilesScreen);
