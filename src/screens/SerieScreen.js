import React, { useState, useEffect} from "react";
import { FlatList, View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { urlBackgroundImage, urlPosterImage } from "../helpers/url";
import { backgroundColor, backgroundColorDarker, activeTintColor } from "../helpers/colors";
import ActorCard from "../components/ActorCard";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { List } from 'react-native-paper';

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
    fontSize: 18, 
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
    textAlign: 'left'
  }
});

const SerieScreen = (props)=> {
  const { route, navigation } = props;
  const { media } = route.params;
  const serieDetail = media.details;
  
  const colorState = (moyenne) => {
    if(moyenne < 50)
      return "red";
    else if (moyenne < 75)
      return "orange";
    else
      return "green";
  }

  return (
    <View style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
      <ImageBackground imageStyle={{width: '100%', height: '100%', opacity: 0.2}} style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', height: '40%', width: '100%', paddingTop: 10}} source={{ uri : urlBackgroundImage+serieDetail.backdrop_path }} >
        <Image style={{height: '100%', width: '40%', borderRadius: 1}} source={{ uri : urlPosterImage+serieDetail.poster_path }}/>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100%', width: '50%' }}>
          <Text style={styles.serieTitle}>{serieDetail.name}</Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', textAlign: 'left', color: "#ffffff"}}>
            {
              serieDetail.genres.map((genre) => (
                genre.name + " "
              ))
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
      
      <ScrollView directionalLockEnabled={false} >
        <View style={{marginLeft: 4, marginRight: 4}}>
        <Text style={styles.headerTitle}>Description : </Text><Text style={styles.text}>{serieDetail.overview}</Text>
        </View>

        <Text style={styles.headerTitle}>Saisons et épisodes : </Text>

        <List.Section style ={{ color: "red",  width: "90%", alignSelf: "center"}}>
        {
          serieDetail.seasons.map((saison) => (
            <List.Accordion
              theme={{ colors: { background: backgroundColor, primary: "#2c75ff" } }}
              style={{ borderRadius: 1, backgroundColor: activeTintColor, marginTop: 2 }}
              contentContainerStyle={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
              title={saison.name}
              left={props => <List.Icon {...props} icon="video-image" />}>
              {
                saison.details ?
                saison.details.episodes.map((episode) => (
                  <List.Item style={{ backgroundColor: "#9E9EA9", marginTop: 1, borderRadius: 2 }} title={<Text>Episode {episode.episode_number} - {episode.name}</Text>} />
                ))
                :
                null
              }
            </List.Accordion>
            ))
          }
          </List.Section>

        <View>
        <Text style={styles.headerTitle}>Acteurs : </Text>
        {
          serieDetail.credits.cast.length > 0 ?
            <FlatList
              contentContainerStyle={{backgroundColor: backgroundColorDarker, padding: 10, paddingBottom: 0}}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps={"handled"}
              data={serieDetail.credits.cast}
              renderItem={({ item }) => <ActorCard navigation={navigation} actor={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />	
          : null }
        </View>
      </ScrollView>
    </View>
    );
	};

export default SerieScreen;
