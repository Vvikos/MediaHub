import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlPosterImage } from "../helpers/url";
import Modal from "react-native-modal";
import { requestPeopleDetailScreen } from "../api/api";
import { Linking } from "react-native";
import { activeTintColor, backgroundColor, backgroundColorDarker } from "../helpers/colors";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
	immBackground: {
      width: 100, 
      height: 100, 
      borderRadius: 100
    },
    view: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    text: {
        fontSize: 13, 
        color: "#ffffff",
        textAlign: 'center'
    },
    modalView: {
      backgroundColor: backgroundColorDarker,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      maxHeight: '50%'
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 5
    },
    biography: {
      fontSize: 11,
      color: "#ffffff",
      marginBottom: 10,
      textAlign: 'justify'
    },
    website: {
      marginBottom: 10,
      fontSize: 11,
      color: "#3366bb",
    },
    birthday: {
      marginBottom: 10,
      fontSize: 11,
      color: "#ffffff",
      fontStyle: 'italic'
    },
    modalBackgroundImg: {
      width: 150, 
      height: 150, 
      borderRadius: 100,
      marginBottom: 10,
    }
});

const ActorCard = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [peopleDetail, setPeopleDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
	}, []);

  const toggleModal = () => {
    setLoading(true);
    if(!isModalVisible){
      requestPeopleDetailScreen(props.actor.id, (data) => {
        setPeopleDetail(data[0]);
        setLoading(false);
      });
    }
    setModalVisible(!isModalVisible);

  };

  const convertDate = (input_date) => {
    let date = new Date(input_date);
    let month = parseInt(date.getMonth()+1);
    let day = parseInt(date.getDate());

    if(day < 10){
      day = "0"+day;
    }

    if(month < 10){
      month = "0"+month;
    }
    
    let converted_date= day + "/" + month +"/"+ date.getFullYear();

    return converted_date;
  }

	return (
    <>
        <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
          <View style={styles.view}> 
            <Image style={styles.immBackground} source={props.actor.profile_path ? { uri: urlPosterImage+props.actor.profile_path } : require('../assets/actor_avatar.jpg')}/>
            <Text style={styles.text}>{props.actor.name}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          propagateSwipe={true}
          testID={'modal'}
          isVisible={isModalVisible}
          style={styles.modalView}
        >
          <View style={{padding: 8}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <Image style={styles.modalBackgroundImg} source={props.actor.profile_path ? { uri: urlPosterImage+props.actor.profile_path } : require('../assets/actor_avatar.jpg')}/>
              <View>
                <Text style={styles.name}>{peopleDetail.name}</Text>
                { peopleDetail.birthday ?
                  <Text style={styles.birthday}>{convertDate(peopleDetail.birthday)}
                  
                  { peopleDetail.deathday ?
                      <> - {convertDate(peopleDetail.deathday)}</>
                    : null
                  }
                  </Text>
                : null }

                { peopleDetail.homepage ?
                  <Text style={styles.website} onPress={() => Linking.openURL(peopleDetail.homepage)}>{peopleDetail.homepage}</Text>
                : null }
              </View>
            </View>
              { peopleDetail.biography ?
                <View style={{minHeight: '5%', maxHeight: '40%', marginBottom: 10}}><ScrollView><Text style={styles.biography}>{peopleDetail.biography}</Text></ScrollView></View>
              : null }
                        
              <Button title="FERMER" color={activeTintColor} onPress={toggleModal} />
          </View>
        </Modal>
      </>
	)
};

export default ActorCard;
