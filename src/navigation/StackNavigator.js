import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MoviesScreen from "../screens/MoviesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SeriesScreen from "../screens/SeriesScreen";
import SearchScreen from "../screens/SearchScreen";
import MovieScreen from "../screens/MovieScreen";
import ActorScreen from "../screens/ActorScreen";
import { Image } from "react-native-elements/dist/image/Image";
import { View, Text, StyleSheet } from "react-native";
import {backgroundColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";
import { width } from "dom-helpers";

const styles = StyleSheet.create({
});

const MoviesStack = createStackNavigator(); 
const SeriesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const Back = " ";

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: backgroundColor,
    borderBottomColor: activeTintColor,
    borderBottomWidth: 1,
  },
  headerTitleAlign: 'center',
  headerTintColor: activeTintColor,
  headerBackTitle: Back,
};

const Logo = () => {
  return (
    <View style={styles.headerBar}>
      <Image source = {require('../assets/mh_logo.png')}  style={{ margin: 10, height: 30, width: 120}} alt={"test"}/>
    </View>
  );
}

const MoviesStackNavigator = () => {
  return (
    <MoviesStack.Navigator screenOptions={screenOptionStyle}>
      <MoviesStack.Screen name="Movies" component={MoviesScreen} options={{title: <Logo />}}/>
      <MoviesStack.Screen name="Movie" component={MovieScreen} options={({ route }) => ({ title: route.params.movie.title })}/>
      <MoviesStack.Screen name="Actor" component={ActorScreen} options={({ route }) => ({ title: route.params.actor.name })}/>
    </MoviesStack.Navigator>
  );
}

const SeriesStackNavigator = () => {
  return (
    <SeriesStack.Navigator screenOptions={screenOptionStyle}>
      <SeriesStack.Screen name="Series" component={SeriesScreen} options={{title: <Logo />}}/>
    </SeriesStack.Navigator>
  );
}

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator screenOptions={screenOptionStyle}>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{title: <Logo />}}/>
    </SearchStack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={screenOptionStyle}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{title: <Logo />}}/>
    </ProfileStack.Navigator>
  );
}


export {MoviesStackNavigator, SeriesStackNavigator, SearchStackNavigator, ProfileStackNavigator};
