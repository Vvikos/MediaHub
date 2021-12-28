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
import SerieScreen from "../screens/SerieScreen";

const styles = StyleSheet.create({
});

const MoviesStack = createStackNavigator(); 
const SeriesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const Back = " ";

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: activeTintColor,
    height: 27
  },
  headerTitleAlign: 'center',
  headerTintColor: activeTintColor,
  headerBackTitle: Back,
};

const MoviesStackNavigator = () => {
  return (
    <MoviesStack.Navigator screenOptions={screenOptionStyle}>
      <MoviesStack.Screen name="Movies" component={MoviesScreen} />
      <MoviesStack.Screen name="Movie" component={MovieScreen} options={({ route }) => ({ title: route.params.movie.title })}/>
    </MoviesStack.Navigator>
  );
}

const SeriesStackNavigator = () => {
  return (
    <SeriesStack.Navigator screenOptions={screenOptionStyle}>
      <SeriesStack.Screen name="Series" component={SeriesScreen} />
      <SeriesStack.Screen name="Serie" component={SerieScreen} options={({ route }) => ({ title: route.params.serie.name })}/>
    </SeriesStack.Navigator>
  );
}

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator screenOptions={screenOptionStyle}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Movie" component={MovieScreen} options={({ route }) => ({ title: route.params.movie.title })}/>
      <SearchStack.Screen name="Serie" component={SerieScreen} options={({ route }) => ({ title: route.params.serie.name })}/>
    </SearchStack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={screenOptionStyle}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}


export {MoviesStackNavigator, SeriesStackNavigator, SearchStackNavigator, ProfileStackNavigator};
