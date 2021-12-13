import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { requestFindMulti } from "../api/api";
import MovieList from "../components/MovieList";
import { backgroundColor } from "../helpers/colors";
import { urlPosterImage } from "../helpers/url";

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
				console.log('FIND DATA');
				console.log(data);
				setData(data[0].results);
				setLoading(false);
			});
		}
	}, [searchValue]);

	const styles = StyleSheet.create({
    imgLoading: {
      height: 250,
      width: 250,
    },
		immBackground: {
			height: 255,
			width: 170,
			borderRadius: 8
		},
  });

	const Item = ({ title, poster_path }) => {
		return (
			<View>
				<TouchableOpacity activeOpacity={0.5}>
					<Image style={styles.immBackground} source={{ uri: urlPosterImage+poster_path }}/>
					<Text style={{ textAlign: 'center', color: "#ffffff" , width: 170, marginTop: 20, fontWeight: 'bold'}}>{title}</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const renderItem = ({ item }) => <Item title={item.title} poster_path={item.poster_path} />;

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
			{ !loading ?
				data.length > 0 ? 
				<FlatList
					style={{ backgroundColor: backgroundColor, border: 'none', width: '80%'}}
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
				: null
			: 
					<Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
			}
  </View>
);
};

export default Search;
