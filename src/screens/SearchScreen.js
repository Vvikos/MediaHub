import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { requestFindMulti } from "../api/api";
import MovieList from "../components/MovieList";
import { backgroundColor, activeTintColor } from "../helpers/colors";
import { urlPosterImage } from "../helpers/url";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState([]);
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
    imgLoading: {
      height: 250,
      width: 250,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
    },
	immBackground: {
		height: 255,
		width: 170,
		borderRadius: 8
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

  const Item = ({ title, poster_path, vote_average, name, vote_count }) => {
		return (
			<View>
				<TouchableOpacity activeOpacity={0.5}>
				<View style={{flex:2,flexDirection:"row", justifyContent:'space-between', marginTop: 50 }}>
					<View style={{ flex:1 }}>
					{ poster_path ? 
						<Image style={styles.immBackground} source={{ uri: urlPosterImage+poster_path }}/>
						:
						<Image style={styles.immBackground} source = {require('../assets/movie_avatar.jpeg')}/>
					}
					</View>
					
					<View style={{ marginLeft: 25, flex:1 }}>
						{
							title == undefined ?
							<>
							<Text style={{ textAlign: 'center', color: "#ffffff" , width: 140, marginTop: 20, fontWeight: 'bold' }}>{name}</Text>
							<Text style={{ fontSize: 14, textAlign: 'center', color: activeTintColor, width: 140, marginTop: 20, fontWeight: 'bold' }}>Série</Text>
							</>
							:
							<>
							<Text style={{ textAlign: 'center', color: "#ffffff" , width: 140, marginTop: 20, fontWeight: 'bold'}}>{title}</Text>
							<Text style={{ fontSize: 14, textAlign: 'center', color: activeTintColor, width: 140, marginTop: 20, fontWeight: 'bold' }}>Film</Text>
							</>
						}
						<AnimatedCircularProgress style={{ marginTop: 15, marginLeft: 40, marginTop: 30}}
							size={70}
							width={4}
							fill={ vote_average * 10 }
							rotation={-360}
							tintColor={ colorState(vote_average * 10)}
							backgroundColor="#3d5875" >
							{
								(fill) => (
									<Text style={{ fontSize: 12, color: "#ffffff" }}>
									{
										vote_average ?
											vote_average + " / 10"
										:
											"?"
									}
									</Text>
								)
							}
                 		</AnimatedCircularProgress>
						{
							vote_count ?
								<Text style={{ textAlign: 'center', color: "#ffffff" , width: 150, marginTop: 20, fontWeight: 'bold'}}>{vote_count} votes</Text>
							:
								<Text style={{ textAlign: 'center', color: "#ffffff" , width: 150, marginTop: 20, fontWeight: 'bold'}}>0 vote</Text>
						}
					</View>
				</View>
				</TouchableOpacity>
			</View>
		);
	};

	const renderItem = ({ item }) => <Item title={item.title} poster_path={item.poster_path} vote_average={item.vote_average} name={item.name} vote_count={item.vote_count}/>;

return (
	<View style={{ backgroundColor: backgroundColor, flex: 1, alignItems: "center", justifyContent: "start" }}>
		<SearchBar
			containerStyle={{ backgroundColor: backgroundColor, border: 'none', width: '80%'}}
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
					style={{ backgroundColor: backgroundColor, border: 'none', width: '80%'}}
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
				: 
				<View style={{ backgroundColor: backgroundColor, flex: 1, alignItems: "center", justifyContent: "start" }}>
					<Ionicons name="search-outline" size={80} color={activeTintColor} />
					<Text style={{ color: activeTintColor, fontSize: 40 }}>Aucun résultat trouvé</Text>
				</View>
		
			: 
				searchValue=='' ?
				<Ionicons name="search-outline" size={80} color={activeTintColor} />
				:
				<Image style={styles.imgLoading} source={require('../assets/loading.gif')} />

			}
  </View>
);
};

export default Search;
