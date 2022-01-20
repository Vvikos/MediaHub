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
		marginTop: -400,
		height: 100,
		width: 100
	}
});

const LoadingCounter = (props) => {
	return (
        <View style={styles.containerLoading}>
		    <Image style={styles.imgLoading} source={require('../assets/loading.gif')} />
			<Text style={{color:"#808080", fontSize: 20}}>{props.counter > 0 ? ((props.counter))+"%" : "0%" }</Text>
        </View>
	);
};

export default LoadingCounter;
