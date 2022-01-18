import React, { useState, useEffect} from "react";
import { FlatList, View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { urlBackgroundImage, urlPosterImage } from "../helpers/url";
import { backgroundColor, backgroundColorDarker, activeTintColor } from "../helpers/colors";
import ActorCard from "../components/ActorCard";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { List } from 'react-native-paper';
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
  serieTitle: {
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#ffffff",
    textAlign: 'left',
    width: '100%'
  }
});

const SerieScreen = (props)=> {
  const { route, navigation } = props;
  const { media } = route.params;
  const serieDetail = media;
  
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
      { serieDetail ?
        <View style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
            <ImageBackground 
              imageStyle={{width: '100%', height: '100%', opacity: 0.2}} 
              style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', height: '40%', width: '100%', paddingTop: 10}} 
              loadingIndicatorSource={require('../assets/movie_avatar.png')} source={serieDetail.backdrop_path ? { uri: urlBackgroundImage+serieDetail.backdrop_path } : require('../assets/movie_avatar.png')}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', margin: 3, width: '40%' }}>
                <Image
                  style={{height: '100%', width: '100%', borderRadius: 1}} 
                  loadingIndicatorSource={require('../assets/movie_avatar.png')}
                  source={serieDetail.poster_path ? { uri: urlPosterImage+serieDetail.poster_path } : require('../assets/movie_avatar.png')}
                />
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '55%' }}>
                <Text style={styles.serieTitle}>{serieDetail.name}</Text>
                <Text style={{ fontSize: 14, fontStyle: 'italic', textAlign: 'left', color: "#ffffff", width: '100%', opacity: 0.6}}>
                  { serieDetail.genres ?
                    serieDetail.genres.map((genre) => (
                      genre.name + " "
                    ))
                    :
                    'No genre found'
                  }
                </Text>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                <AnimatedCircularProgress style={{ marginTop: 15}}
                  size={100}
                  width={4}
                  fill={ serieDetail.vote_average * 10 }
                  rotation={-360}
                  tintColor={ colorState(serieDetail.vote_average * 10)}
                  backgroundColor="#3d5875" >
                  {
                    (fill) => (
                      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{ fontSize: 15, color: "#ffffff", fontWeight: 'bold'}}>{serieDetail.vote_count} votes</Text>
                      <Text style={{ fontSize: 12, color: "#ffffff"}}>
                        {serieDetail.vote_average} / 10
                      </Text>
                      </View>
                    )
                  }
                </AnimatedCircularProgress>
                </View>
              </View> 
            </ImageBackground>
            
            <ScrollView directionalLockEnabled={false} style={{width: '100%'}}>
              <View style={{marginTop: 30, marginLeft: 4, marginRight: 4}}>
              <Text style={styles.headerTitle}>Description</Text><Text style={styles.text}>{serieDetail.overview ? serieDetail.overview : 'No overview found'}</Text>
              </View>
              
              <View style={{flexDirection: 'column', justifyContent: 'flex-start', marginTop: 30}}>
              <Text style={styles.headerTitle}>Saisons et épisodes</Text>

              <List.Section style ={{ color: "red",  width: "90%", alignSelf: "center"}}>
              {
                serieDetail.seasons && serieDetail.seasons.length>0 ?
                serieDetail.seasons.map((saison) => (
                  <List.Accordion
                    key={saison.name}
                    theme={{ colors: { background: backgroundColor, primary: "#2c75ff" } }}
                    style={{ borderRadius: 1, backgroundColor: activeTintColor, marginTop: 2 }}
                    contentContainerStyle={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                    title={saison.name}
                    left={props => <List.Icon {...props} icon="video-image" />}>
                    {
                      saison.details && saison.details.episodes && saison.details.episodes.length>0 ?
                      saison.details.episodes.map((episode) => (
                        <List.Item key={episode.episode_number} style={{ backgroundColor: backgroundColorDarker, marginTop: 1, borderRadius: 2 }} title={<Text style={{color: activeTintColor}}>Episode {episode.episode_number} - {episode.name}</Text>} />
                      ))
                      :
                      <List.Item style={{ backgroundColor: backgroundColorDarker, marginTop: 1, borderRadius: 2 }} title={<Text style={{color: activeTintColor}}>Episodes non disponibles</Text>} />
                    }
                  </List.Accordion>
                  ))
                :
                <Text style={styles.text}>Détails des saisons ne sont pas encore disponibles</Text>
                }
                </List.Section>
              </View>

              <View style={{flexDirection: 'column', justifyContent: 'flex-start', marginTop: 30, marginBottom: 10}}>
                <Text style={styles.headerTitle}>Acteurs</Text>
                {
                  serieDetail.credits && serieDetail.credits.cast && serieDetail.credits.cast.length > 0 ?
                  <View style={{backgroundColor: backgroundColor}}>
                    <FlatList
                      contentContainerStyle={{backgroundColor: backgroundColorDarker, padding: 10}}
                      keyExtractor={(item) => item.id.toString()}
                      keyboardShouldPersistTaps={"handled"}
                      data={serieDetail.credits.cast}
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
            </ScrollView>
        </View>
      :
        <Loading />
      }
      </>
    );
	};

export default SerieScreen;
