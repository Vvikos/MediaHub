import React, { useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlPosterImage } from "../helpers/url";
import Modal from "react-native-modal";
import { requestPeopleDetailScreen } from "../api/api";
import { Linking } from "react-native";
import { activeTintColor, backgroundColor, backgroundColorDarker } from "../helpers/colors";
import { ScrollView } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";

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
      margin: 2,
      height: 'auto',
      minHeight: '30%',
      maxHeight: '70%',
      top: '20%'
    },
    name: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#ffffff"
    },
    biography: {
      fontSize: 11,
      color: "#ffffff",
      textAlign: 'justify'
    },
    website: {
      fontSize: 13,
      color: "#3366bb",
    },
    birthday: {
      fontSize: 13,
      color: "#ffffff",
      fontStyle: 'italic'
    },
    modalBackgroundImg: {
      width: 150, 
      height: 150, 
      borderRadius: 100,
    }
});

const ActorCard = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [peopleDetail, setPeopleDetail] = useState([]);
  const [loading, setLoading] = useState(false);
	const [connection, setConnection] = useState(null);

	NetInfo.fetch().then(state => {
		setConnection(state);
	});
	
  useEffect( () => {
	}, []);

  const toggleModal = () => {
    setLoading(true);
    if(!isModalVisible){
      NetInfo.fetch().then(state => {
        setConnection(state);
      });
      
      if(connection){
        if(connection.isInternetReachable){
          requestPeopleDetailScreen(props.actor.id, (data) => {
            setPeopleDetail(data[0]);
            setLoading(false);
          });
        }
      }
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
            <Image style={styles.immBackground} loadingIndicatorSource={require('../assets/actor_avatar.jpg')} defaultImage={require('../assets/actor_avatar.jpg')} source={props.actor.profile_path ? { uri: urlPosterImage+props.actor.profile_path } : require('../assets/actor_avatar.jpg')}/>
            <Text style={styles.text}>{props.actor.name}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          propagateSwipe={true}
          testID={'modal'}
          isVisible={isModalVisible}
          style={styles.modalView}
        >
          <View style={{padding: 3, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: '100%', width: '100%'}}>
            <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 8}}>
                <Image style={styles.modalBackgroundImg} loadingIndicatorSource={require('../assets/actor_avatar.jpg')} defaultImage={require('../assets/actor_avatar.jpg')}  source={props.actor.profile_path ? { uri: urlPosterImage+props.actor.profile_path } : require('../assets/actor_avatar.jpg')}/>
                <Text style={styles.name}>{props.actor.name}</Text>
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
              <View style={{maxHeight: '45%', borderLeftWidth: 1, borderLeftColor: activeTintColor, paddingLeft: 5}}><ScrollView><Text style={styles.biography}>{peopleDetail.biography}</Text></ScrollView></View>
            : null }
            <Button title="FERMER" color={activeTintColor} onPress={toggleModal} />        
          </View>
        </Modal>
      </>
	)
};

export default ActorCard;
