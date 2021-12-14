import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
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
            tabBarItemStyle: {
                borderTopWidth: 2,
                borderColor: activeTintColor,
            },
            tabBarStyle: [
            {
                display: "flex",
                backgroundColor: backgroundColor
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
            tabBarIcon: (tabInfo) => {
                return (
                <Ionicons
                    name="film-outline"
                    size={32}
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
                  tabBarIcon: (tabInfo) => {
                      return (
                      <Ionicons
                          name="tv-outline"
                          size={32}
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
                  tabBarIcon: (tabInfo) => {
                      return (
                      <Ionicons
                          name="search-outline"
                          size={32}
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
                  tabBarIcon: (tabInfo) => {
                      return (
                      <Ionicons
                          name="person-outline"
                          size={32}
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