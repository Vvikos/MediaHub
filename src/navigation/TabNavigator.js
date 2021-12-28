import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { MoviesStackNavigator, SeriesStackNavigator, SearchStackNavigator, ProfileStackNavigator } from "./StackNavigator";
import {backgroundColor, inactiveTintColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#ff9e00",
            tabBarInactiveTintColor: "#ffffff",
            tabBarActiveBackgroundColor: "#303030",
            tabBarInactiveBackgroundColor: "#303030",
            tabBarStyle: [
            {
                borderTopWidth: 2,
                borderTopColor: activeTintColor,
                backgroundColor: backgroundColor,
                paddingBottom: 8,
                paddingTop: 8,
                height: 70
            },
            null
            ],

        }}
    >
      <Tab.Screen 
        component={MoviesStackNavigator}
        name="MoviesTab"
        options={{
            tabBarLabel: "Movies",
            tabBarLabelStyle: {fontSize: 15},
            tabBarIcon: (tabInfo) => {
                return (
                <Ionicons
                    name="film-outline"
                    size={35}
                    color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
                />
                );
            },
        }}
        />
      <Tab.Screen 
              name="SeriesTab"
              component={SeriesStackNavigator}
              options={{
                  tabBarLabel: "Series",
                  tabBarLabelStyle: {fontSize: 15},
                  tabBarIcon: (tabInfo) => {
                      return (
                      <Ionicons
                          name="tv-outline"
                          size={35}
                          color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
                      />
                      );
                  },
              }}
      />
            <Tab.Screen 
              name="SearchTab"
              component={SearchStackNavigator}
              options={{
                  tabBarLabel: "Search",
                  tabBarLabelStyle: {fontSize: 15},
                  tabBarIcon: (tabInfo) => {
                      return (
                      <Ionicons
                          name="search-outline"
                          size={35}
                          color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
                      />
                      );
                  },
              }}
      />
            <Tab.Screen 
              name="ProfileTab"
              component={ProfileStackNavigator}
              options={{
                  tabBarLabel: "Profile",
                  tabBarLabelStyle: {fontSize: 15},
                  tabBarIcon: (tabInfo) => {
                      return (
                      <Ionicons
                          name="person-outline"
                          size={35}
                          color={tabInfo.focused ? activeTintColor : activeTintColorFocsued}
                      />
                      );
                  },
              }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;