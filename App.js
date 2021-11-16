import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import MoviesScreen from "./screens/MoviesScreen";
import SeriesScreen from "./screens/SeriesScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";

const TabNavigator = createBottomTabNavigator({
Movies: {
	screen: MoviesScreen,
	navigationOptions: {
	tabBarLabel: "Movies",
	tabBarOptions: {
		activeTintColor: "#880921",
	},
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="film-outline"
			size={24}
			color={tabInfo.focused ? "#880921" : "#8e8e93"}
		/>
		);
	},
	},
},
Series: {
	screen: SeriesScreen,
	navigationOptions: {
	tabBarLabel: "Series",
	tabBarOptions: {
		activeTintColor: "#880921s",
	},
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="tv-outline"
			size={32}
			color={tabInfo.focused ? "#880921s" : "#8e8e93"}
		/>
		);
	},
	},
},
Search: {
	screen: SearchScreen,
	navigationOptions: {
	tabBarLabel: "Search",
	tabBarOptions: {
		activeTintColor: "#880921s",
	},
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="search-outline"
			size={32}
			color={tabInfo.focused ? "#880921s" : "#8e8e93"}
		/>
		);
	},
	},
},
Profile: {
	screen: ProfileScreen,
	navigationOptions: {
	tabBarLabel: "Profile",
	tabBarOptions: {
		activeTintColor: "#880921s",
	},
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="person-outline"
			size={32}
			color={tabInfo.focused ? "#880921s" : "#8e8e93"}
		/>
		);
	},
	},
},
});

const Navigator = createAppContainer(TabNavigator);

export default function App() {
return (
	<Navigator >
		<MoviesScreen/>
	</Navigator>
);
}