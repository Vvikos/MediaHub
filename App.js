import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Header } from "react-native-elements/dist/header/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "react-native-elements/dist/image/Image";
import { View, Text } from "react-native";

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
	headerMode: 'screen',
	cardStyle: { backgroundColor: 'red' },
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
	<SafeAreaProvider style={{backgroundColor: backgroundColor}}>
		<Header
			statusBarProps={{ barStyle: 'dark-content' }}
			containerStyle={{
				backgroundColor: backgroundColor,
				borderBottomColor: activeTintColor, 
				borderBottomWidth: 2,
			}}
			centerComponent={
                <View>
                    <Image source = {require('./src/assets/mh_logo.png')}  style={{ margin: 10, height: 50, width: 250}} alt={"test"}/>
					
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
						<View>
							<Text style={{width: 100, textAlign: 'center', fontWeight: 'bold', color: "white"}}>Think Better</Text>
						</View>
						<View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
						</View>
					</View>
            }  
		/>
		<Navigator>
			<MoviesScreen/>
		</Navigator>
	</SafeAreaProvider>

);
}