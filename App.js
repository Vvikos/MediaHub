import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Header } from "react-native-elements/dist/header/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "react-native-elements/dist/image/Image";
import { View, Text } from "react-native";


import {backgroundColor, activeTintColor, activeTintColorFocsued} from "./src/helpers/colors";
import BottomTabNavigator from "./src/navigation/TabNavigator";

export default function App() {
return (
	<SafeAreaProvider style={{backgroundColor: backgroundColor}}>

		<NavigationContainer>
			<BottomTabNavigator />
		</NavigationContainer>
	</SafeAreaProvider>
);
}