import React , { useEffect, useState }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen'
import HomeScreen from '../HomeScreen';
import { load } from '../helper/storage';
import DashboardScreen from '../DashboardScreen';
import UserDataScreen from '../UserDataScreen';
import PreviewImageScreen from '../PreviewImageScreen';

const Stack = createNativeStackNavigator();


function MainNavigation() {
    useEffect(() => {
        SplashScreen.hide();
      }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="UserData" component={UserDataScreen} />
        <Stack.Screen name="Preview" component={PreviewImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;