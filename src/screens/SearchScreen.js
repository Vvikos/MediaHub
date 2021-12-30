import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { requestFindMulti, requestMovieDetailScreen, requestSerieDetailScreen } from "../api/api";
import { backgroundColor, backgroundColorDarker, activeTintColor } from "../helpers/colors";
import { urlPosterImage } from "../helpers/url";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from "@expo/vector-icons";
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import Loading from '../components/Loading';
import * as dbservice from '../db/db';

const Search = (props)=> {
	const { navigation } = props;
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [data, setData] = useState([]);

	const searchFunction = (text) => {
		setSearchValue(text);
		if(text!=''){
			setLoading(true);
		}
  	};

	useEffect(() => {
		if(searchValue!=''){
			requestFindMulti(1, searchValue, (data) => {
				setData(data[0].results);
				setLoading(false);
			});
		}
	}, [searchValue]);

	const styles = StyleSheet.create({
	immBackground: {
		height: 255,
		width: 170,
		borderRadius: 2
	},
  });

  const colorState = (moyenne) => {
    if(moyenne < 50)
      return "red";
    else if (moyenne < 75)
      return "orange";
    else
      return "green";
  }


	const redirectToDetailPage = (id, type) => {
		if(type=='Serie') {
			requestSerieDetailScreen( id, (data) => {
				let media = {
					details: data[0],
					title: data[0].name ? data[0].name : data[0].title
				};
				props.navigation.navigate(type, { media: media });
			});
		}
		else {
			requestMovieDetailScreen( id, (data) => {
				let media = {
					details: data[0],
					name: data[0].name ? data[0].name : data[0].title
				};
				props.navigation.navigate(type, { media: media });
			});
		}
	}	

  const convertDate = (inputDate) => {
	let date = new Date(inputDate);
	return date.getFullYear();
  }

  const Item = ({ id, title, poster_path, vote_average, name, vote_count, first_air_date }) => {
	const [favori, setFavori] = useState(false);

	const onClickStar = () => {
		setFavori(!favori);
		if(!favori)
			dbservice.addFavoriForCurrentProfile(id, (title == undefined) ? 1 : 0);
		else
			dbservice.removeFavoriForCurrentProfile(id, (title == undefined) ? 1 : 0);
	}

	return (
		<View style={{backgroundColor: backgroundColorDarker, marginTop: 25, padding: 2}}>
				<View style={{flex:2,flexDirection:"row", justifyContent:'flex-start' }}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => redirectToDetailPage(id, (title ? 'Movie' : 'Serie'))}>
						<Image style={styles.immBackground} source={poster_path ? { uri: urlPosterImage+poster_path } : require('../assets/movie_avatar.png')}/>
					</TouchableOpacity>
						
					<View style={{ flexDirection:"column", justifyContent:'flex-start', alignItems: 'center', marginLeft: 5, width: '50%' }}>
						<TouchableOpacity activeOpacity={0.5} onPress={() => redirectToDetailPage(id, (title ? 'Movie' : 'Serie'))}>
							<View style={{ flexDirection:"column", justifyContent:'center', alignItems: 'center', width: '100%' }}>
							<Text style={{ fontSize: 18, textAlign: 'left', color: "#ffffff", fontWeight: 'bold'}}>{(title ? title : name)} 
								{ first_air_date ?
									' ('+convertDate(first_air_date)+')'
									:
									null
								}
							</Text>
							<Text style={{ fontSize: 12, textAlign: 'left', color: activeTintColor, width: '100%', fontStyle:'italic'}}>{((title == undefined) ? 'Serie' : 'Film')}</Text>
							</View>
						</TouchableOpacity>
					
					<View style={{flexDirection:"row", marginTop: 20, marginBottom: 15 }} >
						<TouchableOpacity activeOpacity={0.5} onPress={onClickStar}>
							<Ionicons name={favori ? "star" : "star-outline"} size={32} color={activeTintColor} />			
						</TouchableOpacity>
					</View>
					<AnimatedCircularProgress
						size={120}
						width={2}
						fill={ vote_average * 10 }
						rotation={-360}
						tintColor={ colorState(vote_average * 10)}
						backgroundColor="#3d5875" >
						{
							(fill) => (
								<View style={{ flexDirection:"column", justifyContent:'center', alignItems: 'center' }}>
									<Text style={{ fontSize: 16, textAlign: 'center', color: "#ffffff", fontWeight: 'bold'}}>{(vote_count ? vote_count+' votes' : '0 vote')}</Text>
									<Text style={{ fontSize: 14, textAlign: 'center', color: "#ffffff" }}>{vote_average ? vote_average + " / 10":"?"}</Text>
								</View>
							)
						}
					</AnimatedCircularProgress>
				</View>
			</View>
		</View>
	);
};

	const renderItem = ({ item }) => <Item id={item.id} title={item.title} poster_path={item.poster_path} vote_average={item.vote_average} name={item.name} vote_count={item.vote_count} first_air_date={item.first_air_date} />;

return (
	<View style={{ borderTopWidth: 1, borderTopColor: activeTintColor, backgroundColor: backgroundColor, flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", marginTop: 25}}>
		<SearchBar
			inputContainerStyle={{backgroundColor: backgroundColorDarker}}
			inputStyle={{backgroundColor: backgroundColorDarker, textDecorationLine: 'none'}}
			containerStyle={{ backgroundColor: backgroundColor, borderBottomWidth: 0, borderTopWidth: 0, width: '98%'}}
			placeholder="Rechercher..."
			round
			value={searchValue}
			onChangeText={(text) => searchFunction(text)}
			autoCorrect={false}
		/>
		{ 
			!loading ?
				data.length > 0 ? 
				<FlatList
					style={{ backgroundColor: backgroundColor, border: 'none', maxHeight: '90%'}}
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
				: 
				<View style={{ backgroundColor: backgroundColor, alignItems: "center", marginTop: 30 }}>
					<Ionicons name="search-outline" size={50} color={activeTintColor} />
					<Text style={{ color: activeTintColor, fontSize: 30 }}>Aucun résultat trouvé</Text>
				</View>
		
			: 
				searchValue=='' ?
				<Ionicons name="search-outline" size={50} color={activeTintColor} />
				:
				<Loading />

			}
  </View>
);
};


//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
    return {
		movies: state.api.movies,
		series: state.api.series,
    }
  }
  
  //This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
  const mapDispatchToProps = (dispatch) => {
    return {
		getFilms: () => dispatch(actions.fetchFilms()),
		getSeries: () => dispatch(actions.fetchSeries()),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Search);
