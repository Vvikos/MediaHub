import React, { useState, useEffect} from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { urlBackgroundImage, urlPosterImage } from "../helpers/url";
import { backgroundColor, activeTintColor } from "../helpers/colors";
import { Image } from 'react-native';
import ActorCard from "../components/ActorCard";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { List } from 'react-native-paper';

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
    headerTitle: {
      fontSize: 18, 
      color: "#ffffff", 
      textAlign: 'justify', 
      margin: 25, 
      fontWeight: 'bold'
    },
    text: {
      fontSize: 15, 
      color: "#ffffff", 
      textAlign: 'justify', 
      margin: 25, 
      marginTop: -15
    },
    serieTitle: {
      fontSize: 18, 
      fontWeight: "bold", 
      color: "#ffffff",
      marginTop: 30
    }
  });

const SerieScreen = (props)=> {
  const { route, navigation } = props;
  const { serie } = route.params;
  const serieDetail = serie.details;
  
  const colorState = (moyenne) => {
    if(moyenne < 50)
      return "red";
    else if (moyenne < 75)
      return "orange";
    else
      return "green";
  }

  return (
    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
      <View style={styles.center}>
        <Image style={styles.imgBackground} source={{ uri : urlBackgroundImage+serieDetail.backdrop_path }} />

        <View style={{flex:2,flexDirection:"row",justifyContent:'space-between'}}>
          <View style={{ flex:1 }}>
            <Image style={styles.imgPoster} source={{ uri : urlPosterImage+serieDetail.poster_path }}/>
          </View>
          <View style={{ flex:1, marginLeft: -100 }}>
            <Text style={styles.serieTitle}>{serieDetail.title}</Text>
            <Text style={{ fontSize: 15, color: "#ffffff", marginTop: 30}}>
             {
                serieDetail.genres.map((genre) => (
                  genre.name + " "
                ))
             }
             </Text>
             <View style={{flex:2,flexDirection:"row",justifyContent:'space-between'}}>
               <View style={{ flex:1, alignItems: "center" }}>
                <AnimatedCircularProgress style={{ marginTop: 15}}
                    size={70}
                    width={4}
                    fill={ serieDetail.vote_average * 10 }
                    rotation={-360}
                    tintColor={ colorState(serieDetail.vote_average * 10)}
                    backgroundColor="#3d5875" >
                    {
                      (fill) => (
                        <Text style={{ fontSize: 12, color: "#ffffff" }}>
                          {serieDetail.vote_average} / 10
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                </View> 
                <View style={{ flex:1 }}>
                  <Text style={{ fontSize: 15, color: "#ffffff", marginTop: 40 , marginLeft: -12}}>({serieDetail.vote_count} votes)</Text>
                </View>
            </View>
          </View>
        </View>

        <Text style={styles.headerTitle}>Description : </Text><Text style={styles.text}>{serieDetail.overview}</Text>
        
        <Text style={styles.headerTitle}>Saisons et épisodes : </Text>

        <List.Section style ={{ color: "red",  width: "90%", alignSelf: "center"}}>
        {
          serieDetail.seasons.map((saison) => (
            <List.Accordion
              theme={{ colors: { background: backgroundColor, primary: "#2c75ff" } }}
              style={{ borderRadius: 15, backgroundColor: activeTintColor, marginTop: 15 }}
              title={saison.name}
              left={props => <List.Icon {...props} icon="video-image" />}>
              {
                saison.details.episodes.map((episode) => (
                  <List.Item style={{ backgroundColor: "#9E9EA9", marginTop: 10, borderRadius: 15 }} title={<Text>Episode {episode.episode_number} - {episode.name}</Text>} />
                ))
              }
            </List.Accordion>
            ))
        }
        </List.Section>
        
        <Text style={styles.headerTitle}>Acteurs : </Text>
        {
          serieDetail.credits.cast.length > 0 ?
          <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  keyboardShouldPersistTaps={"handled"}
                  data={serieDetail.credits.cast}
                  renderItem={({ item }) => <ActorCard navigation={navigation} actor={item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ margin: 15}} />}
                />	
              : null }
      </View>
    </ScrollView>
    );
	};

export default SerieScreen;
