import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import apiReducer from './src/store/reducer';
import {backgroundColor, activeTintColor, activeTintColorFocsued} from "./src/helpers/colors";
import ProfileNavigator from "./src/navigation/ProfileNavigator";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = combineReducers({api: apiReducer}); // Using Combine Reducers here although only one reducer is present.
// Official explaination here: https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-will-not-run-if-the-store-state-is-the-same
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // The first one is to make the chrome dev extension work

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	api: persistReducer(persistConfig, apiReducer)
  });
  
const store = createStore(
	rootReducer, 
	composeEnhanced(
		applyMiddleware(thunk)
  	)
);

const persistor = persistStore(store);


const navTheme = DefaultTheme;
navTheme.colors.background = backgroundColor;

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer theme={navTheme}>
					<ProfileNavigator />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}