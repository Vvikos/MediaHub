import React from "react";
import { StyleSheet, Image, View } from "react-native";
import {backgroundColor, activeTintColor} from "../helpers/colors";

const styles = StyleSheet.create({
	header: {
        borderBottomWidth: 1,
        borderBottomColor: activeTintColor,
        backgroundColor: backgroundColor,
		height: '10vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
    logo: {
        height: '12vh', 
        width: '30vh'
    }
});

const Header = () => {
    return (
      <View style={styles.header}>
        <Image source = {require('../assets/mh_logo.png')}  style={styles.logo} alt={"test"}/>
      </View>
    );
}

export default Header;