import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import MoviesScreen from "./src/screens/MoviesScreen";
import SeriesScreen from "./src/screens/SeriesScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const TabsBarConfig = {
	activeTintColor: "#880921s",
	style: {
        backgroundColor: 'white',
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
	tabBarOptions: TabsBarConfig,
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
	tabBarOptions: TabsBarConfig,
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
	tabBarOptions: TabsBarConfig,
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