import React, { useState, useEffect} from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
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
    imgLoading: {
      height: 250,
      width: 250,
    },
  });

const MovieScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const { movie } = route.params;
  const [movieDetail, setMovie] = useState([]);

  useEffect( () => {
		requestMovieDetail();
	}, []);

  const requestMovieDetail= () => {
		requestMovieDetailScreen( movie.id, (data) => {
			setMovie(data[0]);
      console.log(movie.id);
      setLoading(false);
		});
  };

  return (

    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>

      { !loading ?

      <View style={styles.center}>
        <Image style={styles.imgBackground} source={{ uri : urlBackgroundImage+movieDetail.backdrop_path }} />

        <View style={{flex:2,flexDirection:"row",justifyContent:'space-between'}}>
          <View style={{ flex:1 }}>
            <Image style={styles.imgPoster} source={{ uri : urlPosterImage+movieDetail.poster_path }}/>
          </View>
          <View style={{ flex:1, marginLeft: -100 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffffff", marginTop: 30}}>{movieDetail.title}</Text>
            <Text style={{ fontSize: 15, color: "#ffffff", marginTop: 30}}>
             {
                movieDetail.genres.map((genre) => (
                  genre.name + " "
                ))
             }
             </Text>
             <Text style={{ fontSize: 15, color: "#ffffff", marginTop: 30}}>{movieDetail.vote_average} / 10 (votants : {movieDetail.vote_count})</Text>
          </View>
        </View>

        <Text style={{fontSize: 18, color: "#ffffff", textAlign: 'justify', margin: 25, fontWeight: 'bold' }}>Description : </Text><Text style={{fontSize: 15, color: "#ffffff", textAlign: 'justify', margin: 25, marginTop: -15}}>{movieDetail.overview}</Text>

        <Text style={{fontSize: 11, color: "#ffffff", textAlign: 'justify', margin: 25, fontWeight: 'bold' }}>Casting : </Text>

        {
          movieDetail.credits.cast.map((actor) => {
            if(actor.profile_path != null)
            {
              return(
                <View>
                <Image key="{actor}"
                  source={{
                    uri: urlPosterImage+actor.profile_path
                  }}
                  style={{width: 100, height: 100, borderRadius: 100/ 2}}
                />
                <Text style={{ textAlign: "center", fontSize: 11, color: "#ffffff", textAlign: 'justify', margin: 25, fontWeight: 'bold' }}>{actor.name}</Text>
                </View>
              )
            }
          })
        }


      </View>

      : <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
          <Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
        </View>
        }

    </ScrollView>
    );
	};

export default MovieScreen;
