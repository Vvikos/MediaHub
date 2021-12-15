import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "react-native-elements/dist/image/Image";
import { View, Text } from "react-native";
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import apiReducer from './src/store/reducer';

import {backgroundColor, activeTintColor, activeTintColorFocsued} from "./src/helpers/colors";
import ProfileNavigator from "./src/navigation/ProfileNavigator";
import BottomTabNavigator from "./src/navigation/TabNavigator";
//import BottomTabNavigator from "./src/navigation/TabNavigator";

import Header from './src/components/Header';

const reducer = combineReducers({api: apiReducer}); // Using Combine Reducers here although only one reducer is present.
// Official explaination here: https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-will-not-run-if-the-store-state-is-the-same
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // The first one is to make the chrome dev extension work
const store = createStore(
	reducer,
	composeEnhanced(
	  applyMiddleware(thunk)
	)
  );

const navTheme = DefaultTheme;
navTheme.colors.background = backgroundColor;

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer theme={navTheme}>
				<Header />
				<ProfileNavigator />
			</NavigationContainer>
		</Provider>
	);
}