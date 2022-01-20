import React from "react";
import { StyleSheet, View, Image } from "react-native";

const styles = StyleSheet.create({
    containerLoading: {
        height: '100%',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
    },
	imgLoading: {
		height: 50,
		width: 50
	}
});

const Loading = () => {
	return (
        <View style={styles.containerLoading}>
		    <Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
        </View>
	);
};

export default Loading;
