import React, { useState, useEffect} from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { requestMovieDetailScreen } from "../api/api";
import { urlBackgroundImage, urlPosterImage } from "../helpers/url";
import { backgroundColor } from "../helpers/colors";
import { Image } from 'react-native';
import ActorCard from "../components/ActorCard";


const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
    },
    imgBackground: {
        height: 233,
        width: '100%',
        resizeMode: 'contain',
        opacity: 0.5,
      },
  });

const ActorScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const { actor } = route.params;

  useEffect( () => {
	}, []);



  return (

    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ backgroundColor: backgroundColor, justifyContent: "center" }}>
      { !loading ?

      <View style={styles.center}>
            <Image style={styles.imgBackground} source={{ uri : urlBackgroundImage+actor.profile_path }} />
            <Text>{"test"}</Text>
      </View>

      : <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
          <Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
        </View>
        }

    </ScrollView>
    );
	};

export default ActorScreen;
