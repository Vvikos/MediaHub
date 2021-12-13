import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlPosterImage } from "../helpers/url";
import Modal from "react-native-modal";
import { requestPeopleDetailScreen } from "../api/api";
import { Linking } from "react-native";
import { activeTintColor, backgroundColor } from "../helpers/colors";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
	immBackground: {
      width: 100, 
      height: 100, 
      borderRadius: 50,
      marginLeft: 25

    },
    view: {
        alignItems: "center",
        width: 150,
        alignSelf: 'flex-end',
    },
    text: {
        width: 150,
        fontSize: 11, 
        color: "#ffffff", 
        margin: 25, 
        fontWeight: 'bold'
    },
    modalView: {
      justifyContent: 'flex-end',
      maxHeight: "70%",
      margin: 0,
      marginTop: 'auto',
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 5
    },
    modalContent: {
      color: "#ffffff",
      padding: 22,
      position: 'absolute',
      width: "100%",
      bottom:0,
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      backgroundColor: backgroundColor
    },
    biography: {
      fontSize: 11,
      color: "#ffffff",
      marginBottom: 10
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
    },
    modalBackgroundImg: {
      width: 150, 
      height: 150, 
      borderRadius: 30,
      marginBottom: 10,
    },
    closeButton: {
      color:"#fff",
      backgroundColor: activeTintColor,
      borderColor: "#fff",
      borderRadius: 15,
      padding: 10
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
		<View style={styles.view}>  
      <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>            
        { props.actor.profile_path ? 
            <Image style={styles.immBackground} source={{ uri: urlPosterImage+props.actor.profile_path }}/>
        :
            <Image style={styles.immBackground} source = {require('../assets/actor_avatar.jpg')}/>
        }
        <Text style={styles.text}>{props.actor.name}</Text>
        </TouchableOpacity>

        <Modal
        propagateSwipe={true}
          testID={'modal'}
          isVisible={isModalVisible}
          swipeDirection={['left', 'right']}
          onSwipeComplete={toggleModal}
          style={styles.modalView}>
              <ScrollView contentContainerStyle={styles.modalContent}>
                { peopleDetail.profile_path ? 
                    <Image style={styles.modalBackgroundImg} source={{ uri: urlPosterImage+peopleDetail.profile_path }}/>
                :
                    <Image style={styles.modalBackgroundImg} source = {require('../assets/actor_avatar.jpg')}/>
                }
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
                { peopleDetail.biography ?
                  <Text style={styles.biography}>{peopleDetail.biography}</Text>
                : null }
                          
                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                  <Text>FERMER</Text>
                </TouchableOpacity>
              </ScrollView>
        </Modal>
		</View>
	)
};

export default ActorCard;
