import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MoviesScreen from "../screens/MoviesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SeriesScreen from "../screens/SeriesScreen";
import SearchScreen from "../screens/SearchScreen";
import MovieScreen from "../screens/MovieScreen";
import { Image } from "react-native-elements/dist/image/Image";
import { View, Text, StyleSheet } from "react-native";
import {backgroundColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";
import { width } from "dom-helpers";

const styles = StyleSheet.create({
});

const Stack = createStackNavigator();
const Back = "Retour";

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: backgroundColor,
    borderBottomColor: activeTintColor,
    borderBottomWidth: 1
  },
  headerTitleAlign: 'center',
  headerTintColor: activeTintColor,
};

const Logo = () => {
  return (
    <View style={styles.headerBar}>
      <Image source = {require('../assets/mh_logo.png')}  style={{ margin: 10, height: 50, width: 150}} alt={"test"}/>
    </View>
  );
}

const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Movies" component={MoviesScreen} options={{title: <Logo />}}/>
      <Stack.Screen name="Movie" component={MovieScreen} options={{title: <Logo />}}/>
    </Stack.Navigator>
  );
}

const SeriesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Series" component={SeriesScreen} options={{title: <Logo />}}/>
    </Stack.Navigator>
  );
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Search" component={SearchScreen} options={{title: <Logo />}}/>
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{title: <Logo />}}/>
    </Stack.Navigator>
  );
}


export { MoviesStackNavigator, SeriesStackNavigator, SearchStackNavigator, ProfileStackNavigator };