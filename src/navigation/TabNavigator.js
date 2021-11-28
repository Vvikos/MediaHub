import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MoviesStackNavigator, SeriesStackNavigator, SearchStackNavigator, ProfileStackNavigator } from "./StackNavigator";
import {backgroundColor, inactiveTintColor, activeTintColor, activeTintColorFocsued} from "../helpers/colors";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{  headerShown: false }}
        tabBarOptions={{
            activeTintColor: activeTintColor,
            inactiveTintColor: inactiveTintColor,
            activeBackgroundColor: backgroundColor,
            inactiveBackgroundColor: backgroundColor,
    }}>
      <Tab.Screen 
        component={MoviesStackNavigator}
        name="Movies"
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
              name="Series"
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
              name="Search"
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
              name="Profile"
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