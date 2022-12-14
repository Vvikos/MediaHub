import React from "react";
import { StyleSheet, Image, View } from "react-native";
import {backgroundColor, activeTintColor} from "../helpers/colors";

const styles = StyleSheet.create({
	header: {
    marginTop: 140,
    backgroundColor: backgroundColor,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
    logo: {
      height: 110,
      width: 280
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