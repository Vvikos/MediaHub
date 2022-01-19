import React, { useState, useEffect} from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { requestMovieDetailScreen } from "../api/api";
import { urlBackgroundImage, urlPosterImage } from "../helpers/url";
import { activeTintColor, backgroundColor, backgroundColorDarker } from "../helpers/colors";
import { ImageBackground, Image } from 'react-native';
import ActorCard from "../components/ActorCard";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Loading from "../components/Loading";

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center"
    },
    imgBackground: {
      height: 250,
      width: '100%'
    },
    imgPoster: {
      height: 200,
      width: 140,
      borderRadius: 2
    },
    headerTitle: {
      fontSize: 20, 
      color: "#ffffff", 
      textAlign: 'left', 
      fontWeight: 'bold',
      marginLeft: 10
    },
    text: {
      fontSize: 15, 
      color: "#ffffff", 
      textAlign: 'justify'
    },
    movieTitle: {
      fontSize: 20, 
      fontWeight: "bold", 
      color: "#ffffff",
      textAlign: 'left',
      width: '100%'
    }
  });

const MovieScreen = (props)=> {
  const { route, navigation } = props;
  const { media, media_name } = route.params;
  const movieDetail = media;

  const colorState = (moyenne) => {
    if(moyenne < 50)
      return "red";
    else if (moyenne < 75)
      return "orange";
    else
      return "green";
  }


  return (
    <>
    { movieDetail ?
      <View style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
        <ImageBackground 
          imageStyle={{width: '100%', height: '100%', opacity: 0.2}} 
          style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', height: '40%', width: '100%', paddingTop: 10}} 
          loadingIndicatorSource={require('../assets/movie_avatar.png')}
          defaultImage={require('../assets/movie_avatar.png')}
          source={movieDetail.backdrop_path ? { uri: urlBackgroundImage+movieDetail.backdrop_path } : require('../assets/movie_avatar.png')}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', margin: 3, width: '40%' }}>
            <Image style={{height: '100%', width: '100%', borderRadius: 1}} loadingIndicatorSource={require('../assets/movie_avatar.png')} defaultImage={require('../assets/movie_avatar.png')} source={movieDetail.backdrop_path ? { uri: urlPosterImage+movieDetail.poster_path } : require('../assets/movie_avatar.png')} />
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '55%' }}>
            <Text style={styles.movieTitle}>{movieDetail.title}</Text>
            <Text style={{ fontSize: 14, fontStyle: 'italic', textAlign: 'left', color: "#ffffff", width: '100%', opacity: 0.6}}>
              { movieDetail.genres && movieDetail.genres.length > 0 ?
                movieDetail.genres.map((genre) => (
                  genre.name + " "
                ))
              :
                'No genre found.'
              }
            </Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
            <AnimatedCircularProgress style={{ marginTop: 15}}
              size={100}
              width={4}
              fill={ movieDetail.vote_average * 10 }
              rotation={-360}
              tintColor={ colorState(movieDetail.vote_average * 10)}
              backgroundColor="#3d5875" >
              {
                (fill) => (
                  <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{ fontSize: 15, color: "#ffffff", fontWeight: 'bold'}}>{movieDetail.vote_count} votes</Text>
                  <Text style={{ fontSize: 12, color: "#ffffff"}}>
                    {movieDetail.vote_average} / 10
                  </Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
            </View>
          </View> 
        </ImageBackground>
        
        <View style={{maxHeight: '20%', marginTop: 30, marginLeft: 4, marginRight: 4, width: '100%'}}>
        <Text style={styles.headerTitle}>Description</Text><ScrollView directionalLockEnabled={false} ><Text style={styles.text}>{movieDetail.overview ? movieDetail.overview : 'No overview found.'}</Text></ScrollView>
        </View>

        <View style={{flexDirection: 'column', justifyContent: 'flex-start', marginTop: 30, marginBottom: 10, width: '100%'}}>
          <Text style={styles.headerTitle}>Acteurs</Text>
          { movieDetail.credits && movieDetail.credits.cast && movieDetail.credits.cast.length > 0 ?
            <View style={{backgroundColor: backgroundColorDarker}}>
              <FlatList
                contentContainerStyle={{backgroundColor: backgroundColorDarker, padding: 10}}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps={"handled"}
                data={movieDetail.credits.cast}
                renderItem={({ item }) => <ActorCard navigation={navigation} actor={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              />
            </View>
            : 
            <Text style={styles.text}>Aucun acteur trouvé.</Text> 
          }
        </View>
      </View>
    :
      <Loading />
    }
    </>
    );
	};

export default MovieScreen;
