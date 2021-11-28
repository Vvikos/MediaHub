import React from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  });

const MovieScreen = ({ route, navigation }) => {
    const { movie } = route.params;

    return (
        <View style={styles.center}>
            <Text>{movie.original_title}</Text>
        </View>
    );
};

export default MovieScreen;