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
      height: 400,
      width: '100%',
      opacity: 0.5,
    },
    imgPoster: {
      height: 255,
      width: 170,
      borderRadius: 8,
      marginLeft: '10%',
      position: 'absolute',
      top: 70,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

const MovieScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [movieDetail, setMovie] = useState([]);

  useEffect( () => {
		requestMovieDetail();
	}, []);

  const requestMovieDetail= () => {
		requestMovieDetailScreen( movie.id, (data) => {
			setMovie(data[0]);
		});

	};
  return (

    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
      <View style={styles.center}>
        <Image style={styles.imgBackground} source={{ uri : urlBackgroundImage+movieDetail.backdrop_path }}/>
        <Image style={styles.imgPoster} source={{ uri : urlPosterImage+movieDetail.poster_path }}/>
        <Text style={{marginLeft: 10, fontSize: 25, fontWeight: "bold", color: "#ffffff", marginTop: 30}}>{movieDetail.title}</Text>
        
        {/* ça passe pas 
          { movieDetail.genres == "undefined" ? 
            movieDetail.genres.map((genre) => (
              <Text>{genre}</Text>
            ))
        : null } */}


      </View>
    </ScrollView>
    );
	};

export default MovieScreen;