// navigation/AppNavigator.js
import { StyleSheet , Image} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from "./constants/theme";
import icons from "./constants/icons";

// Actual imports of screens
import WelcomeScreen from "./screens/WelcomeScreen";
import CustomSplashScreen from "./screens/SplashScreen";
import RadioScreen from "./screens/RadioScreen";

import NewsScreen from "./screens/NewsScreen";
import PodcastScreen from "./screens/PodcastScreen";
import LivestreamScreen from "./screens/LivestreamScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator with custom icons from the assets folder
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true, 
        headerShown: false, 
        tabBarActiveTintColor: '#FF0000', // Set focused label color to red
        tabBarInactiveTintColor: colors.colors.secondary, // Optional: inactive color
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,         // Adjusted for shadow spacing
          left: 0,
          right: 0,
          elevation: 5,       // For Android shadow
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          height: 60,
          marginHorizontal: 20,
          borderRadius: 50,
          
          // Shadow properties for iOS
          shadowColor: '#000',     // Black shadow
          shadowOffset: { width: 0, height: 10 }, // Offset for the shadow
          shadowOpacity: 0.1,      // Opacity of the shadow (10%)
          shadowRadius: 10,        // Blurring of the shadow
        },

        tabBarLabelStyle :{
            top: -7,
        }
        
      }}
    >

<Tab.Screen
        name="RadioScreen"
        component={RadioScreen}
        options={{
            tabBarLabel: 'Radio',
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.radio}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.colors.primary : colors.colors.secondary,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="LiveStream"
        component={LivestreamScreen}
        options={{
            tabBarLabel: 'Live Stream',
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.live}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.colors.primary : colors.colors.secondary,
              }}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
            tabBarLabel: 'News',
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.news}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.colors.primary : colors.colors.secondary,
              }}
            />
          ),
        }}
      />

<Tab.Screen
        name="PodcastScreen"
        component={PodcastScreen}
        options={{
            tabBarLabel: 'Podcast',
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.podcast}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.colors.primary : colors.colors.secondary,
              }}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={CustomSplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="RadioScreen" component={RadioScreen} />

      <Stack.Screen name="Main" component={BottomTabNavigator} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});