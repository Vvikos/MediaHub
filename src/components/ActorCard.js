import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlPosterImage } from "../helpers/url";

const styles = StyleSheet.create({
	immBackground: {
      width: 100, 
      height: 100, 
      borderRadius: 50
    },
    view: {
        alignItems: "center",
        width: 150
    },
    text: {
        fontSize: 11, 
        color: "#ffffff", 
        margin: 25, 
        fontWeight: 'bold'
    }
});

const ActorCard = (props) => {
	return (
		<View style={styles.view}>  
        	<TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("Actor", { actor: props.actor })}>            
            { props.actor.profile_path ? 
                <Image style={styles.immBackground} source={{ uri: urlPosterImage+props.actor.profile_path }}/>
            :
                <Image style={styles.immBackground} source = {require('../assets/actor_avatar.jpg')}/>
           }
            <Text style={styles.text}>{props.actor.name}</Text>
            </TouchableOpacity>
		</View>
	)
};

export default ActorCard;
