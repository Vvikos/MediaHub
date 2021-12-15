import React from "react";
import { StyleSheet, Image, View } from "react-native";
import {backgroundColor, activeTintColor} from "../helpers/colors";

const styles = StyleSheet.create({
	header: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: activeTintColor,
    backgroundColor: backgroundColor,
		height: 80,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
    logo: {
      height: 75,
      width: 200
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