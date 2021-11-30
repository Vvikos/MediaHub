import React, { useState, useEffect} from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { requestMovieDetailScreen } from "../api/api";
import { urlPosterImage } from "../helpers/url";
import { backgroundColor } from "../helpers/colors";
import { Image } from 'react-native';

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    immBackground: {
      height: 300,
      width: '100%',
    },
  });

const MovieScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [movieDetail, setMovie] = useState([]);
  console.log(movieDetail);

  useEffect( () => {
		requestMovieDetail();
	}, []);

  const requestMovieDetail= () => {
		requestMovieDetailScreen( movie.id, (data) => {
			setMovie(data[0]);
		});

	};
  return (
    // <ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
    //   {movieDetail.length > 0 ? 
    //     <div>
    //       <View style={styles.center}>
    //         <Image style={styles.immBackground} source={{ uri : 'https://image.tmdb.org/t/p/original/'+movieDetail.backdrop_path }}/>
    //         <Text>{movieDetail.title}</Text>
    //       </View>
    //     </div>
    //   : null}
    // </ScrollView>

    <View style={styles.center}>
      <Image style={styles.immBackground} source={{ uri : 'https://image.tmdb.org/t/p/original/'+movieDetail.backdrop_path }}/>
      <Text>{movieDetail.title}</Text>
    </View>
    );
	};

export default MovieScreen;