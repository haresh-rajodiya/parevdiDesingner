import React, { useEffect, useState } from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import FlashMessage from 'react-native-flash-message';
import { AppState, Platform, StatusBar } from 'react-native';


 const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 34 : StatusBar.currentHeight;

function App() {

  return (
    <>
    <MainNavigation/>
    <FlashMessage
    duration={3000}
    position="top"
    statusBarHeight={STATUS_BAR_HEIGHT}
  />
    </>
  );
}

export default App;