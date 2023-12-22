// Import necessary components from React and React Native
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import PrimaryTextInput from './helper/TextInput';

// Define the LoginScreen component
const LoginScreen = ({ navigation }) => {
  // State variables to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    setPassword('')
    setUsername('')
  },[])

  // Function to handle login button press
  const handleLogin = () => {
   
    if (username === 'Admin' && password === 'Admin') {
   
      navigation.replace('Home');
    } else {
      Alert.alert('Login Failed', 'Please check your username and password.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
        <Image source={require('../assest/Parevdi.png')} style={{height:200,width:200, resizeMode:"contain",marginVertical:20}}/>
      <PrimaryTextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        textInputContainerStyle={{  borderColor: 'gray' ,marginHorizontal:20}}
        autoCapitalize={false}
        autoCorrect={false}
      />
      <PrimaryTextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        textInputContainerStyle={{  borderColor: 'gray' ,marginHorizontal:20}}
      />
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          height: 40,
          width: 100,
          backgroundColor: '#F4722B',
          justifyContent: 'center',
          borderRadius: 10,
          margin: 10,
        }}
        onPress={handleLogin}>
        <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Export the LoginScreen component
export default LoginScreen;
