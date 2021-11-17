import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import MoviesScreen from "./src/screens/MoviesScreen";
import SeriesScreen from "./src/screens/SeriesScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import {backgroundColor, activeTintColor, activeTintColorFocsued} from "./src/helpers/colors";

const TabsBarConfig = {
	activeTintColor: activeTintColor,
	style: {
        backgroundColor: backgroundColor,
		borderTopColor: activeTintColor, borderTopWidth: 2,
      }
  };

const TabNavigator = createBottomTabNavigator({
Movies: {
	screen: MoviesScreen,
	navigationOptions: {
	tabBarLabel: "Movies",
	tabBarOptions: TabsBarConfig,
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="film-outline"
			size={32}
			color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
		/>
		);
	},
	},
},
Series: {
	screen: SeriesScreen,
	navigationOptions: {
	tabBarLabel: "Series",
	tabBarOptions: TabsBarConfig,
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="tv-outline"
			size={32}
			color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
		/>
		);
	},
	},
},
Search: {
	screen: SearchScreen,
	navigationOptions: {
	tabBarLabel: "Search",
	tabBarOptions: TabsBarConfig,
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="search-outline"
			size={32}
			color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
		/>
		);
	},
	},
},
Profile: {
	screen: ProfileScreen,
	navigationOptions: {
	tabBarLabel: "Profile",
	tabBarOptions: TabsBarConfig,
	tabBarIcon: (tabInfo) => {
		return (
		<Ionicons
			name="person-outline"
			size={32}
			color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
		/>
		);
	},
	},
},
});

const Navigator = createAppContainer(TabNavigator);

export default function App() {
return (
	// <Navigator>
	// 	<MoviesScreen/>
	// </Navigator>

	<MoviesScreen/>

);
}