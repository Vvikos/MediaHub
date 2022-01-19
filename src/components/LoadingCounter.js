import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const styles = StyleSheet.create({
    containerLoading: {
        height: '100%',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
    },
	imgLoading: {
		height: 200,
		width: 200
	}
});

const LoadingCounter = (props) => {
	return (
        <View style={styles.containerLoading}>
			<Text style={{color:"#ffffff"}}>{props.counter > 0 ? ((props.counter))+"%" : "0%" }</Text>
		    <Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
        </View>
	);
};

export default LoadingCounter;
