import React, { useState, useEffect} from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { requestMovieDetailScreen } from "../api/api";
import { urlBackgroundImage, urlPosterImage } from "../helpers/url";
import { backgroundColor } from "../helpers/colors";
import { Image } from 'react-native';

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      // alignItems: "center",
      // textAlign: "center",
    },
    imgBackground: {
      height: 233,
      width: '100%',
      resizeMode: 'contain',
      opacity: 0.5,
    
    },
    imgPoster: {
      height: 200,
      width: 115,
      borderRadius: 8,
      marginLeft: '10%',
      marginTop: -30,
    },
  });

const MovieScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [movieDetail, setMovie] = useState([]);
  console.log(movie.id);
  useEffect( () => {
		requestMovieDetail();
	}, []);

  const requestMovieDetail= () => {
		requestMovieDetailScreen( movie.id, (data) => {
			setMovie(data[0]);
		});

	};
  return (

    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ height: '100%', backgroundColor: backgroundColor, justifyContent: "center" }}>
      <View style={styles.center}>
        <Image style={styles.imgBackground} source={{ uri : urlBackgroundImage+movieDetail.backdrop_path }} />        
        <View style={{flex:2,flexDirection:"row",justifyContent:'space-between'}}>
          <View style={{ flex:1 }}>
            <Image style={styles.imgPoster} source={{ uri : urlPosterImage+movieDetail.poster_path }}/>
          </View>
          <View style={{ flex:1, marginLeft: -100 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffffff", marginTop: 30}}>{movieDetail.title}</Text>
            <Text style={{ fontSize: 13, color: "#ffffff", marginTop: 30}}>Action, Aventure, Science-fiction</Text>
            {/* ça passe pas car le tableau movieDetail.genres est undefined et seulement après il se remplit
              { movieDetail.genres == "undefined" ? 
                movieDetail.genres.map((genre) => (
                  <Text>{genre}</Text>
                ))
            : null } */}
          </View>
        </View>
      </View>

     
    </ScrollView>
    );
	};

export default MovieScreen;