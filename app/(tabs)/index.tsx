// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../../Screens/HomeScreen"; // Adjust the path accordingly
import LoginScreen from "../../Screens/LoginScreen"; // Adjust the path accordingly
import MapScreen from "../../Screens/MapScreen"; // Adjust the path accordingly
import BangladeshScreen from "../../Screens/BangladeshScreen"; // Adjust the path accordingly
import RajshahiScreen from "../../Screens/RajshahiScreen"; // Adjust the path accordingly

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Bangladesh" component={BangladeshScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Rajshahi" component={RajshahiScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
