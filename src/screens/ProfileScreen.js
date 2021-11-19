import React from "react";
import { Text, ScrollView, Image, VStack, Box, Divider } from "react-native";
import { Avatar, Card, ListItem, Button, Icon } from 'react-native-elements';

const Profile = () => {

const Component = () => {
	return (
		<Card containerStyle={{ width: '75%', backgroundColor: '#303030', borderColor: '#ff9e00', borderRadius: 12, borderWidth : 2}}>
			<Avatar style={{alignSelf: 'center', width : 100, height :100 }} rounded source={require('../assets/mh_icon.png')} />
			<Card.Title style={{ color: '#ff9e00', fontSize: 32, marginTop: 20}}>Profile</Card.Title>
			<Card.Divider/> 
		</Card>
	);
}

return (
	<ScrollView directionalLockEnabled={false} contentContainerStyle={{ color: 'white', backgroundColor: '#303030', textAlign: 'center', alignItems: "center", justifyContent: "center" }}>
		<Component/>
	</ScrollView>
	);
};

export default Profile;