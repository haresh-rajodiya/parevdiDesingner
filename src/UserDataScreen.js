//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatListComponent,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {load, save} from './helper/storage';
import FastImage from 'react-native-fast-image';

// create a component
const UserDataScreen = ({route, navigation}) => {
  const data = route.params.userData;

  const deleteItem = async () => {
    Alert.alert(
      'Are you sure?',
      'If you pick yes, then your selected file will be removed from file list.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            var data1 = await load('dummyData');
            let item1 = JSON.parse(data1);
            let temp = [];
            console.log('item1', item1);
            item1.map((item, index) => {
              if (index !== data.index) {
                temp.push(item);
              }
            });
            console.log('temp', temp);
            await save('dummyData', JSON.stringify(temp));
            navigation.goBack();
          },
        },
      ],
    );
  };

  const onPreesImage = (item) => {
    navigation.navigate('Preview',{image:item})
}


  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity onPress={() => deleteItem()}>
          <Image
            source={require('../assest/trash.png')}
            style={{height: 30, width: 30, margin: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginHorizontal: 10,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assest/close.png')}
            style={{height: 20, width: 20 ,margin: 5}}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.name}>Name : {data?.item?.name}</Text>
        <Text style={[styles.name, {}]}>
          Date : {data?.item?.date}
        </Text>
        <Text style={[styles.name, {}]}>
          Comment : {data?.item?.comment}
        </Text>
      </View>
      <View style={{marginTop: 40}}>
        {data?.item?.images?.length === 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.name, {}]}>No Pictures Fouund</Text>
          </View>
        ) : (
          <View style={{margin:10}}>
            <FlatList
              style={{height:400}}
              data={data?.item?.images}
              numColumns={3}
              renderItem={({item}) => {
                return ( 
                  <TouchableOpacity 
                  onPress={()=>onPreesImage(item?.uri)}
                    style={styles.imagesView}>
                    <FastImage
                    onLoad={()=>{
                      console.log(item?.uri)
                    }}
                      source={{
                        uri: item.uri,
                      }}
                      style={{height: 100, width: 100, resizeMode: 'contain',borderRadius:10,}}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    color: 'black', 
    fontSize: 14, 
    marginTop: 10,
    fontSize: 18, 
    fontWeight: '500'
  },
  imagesView:{
    height: 100, 
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    backgroundColor:'rgba(214, 214, 214, 0.8)',
  }
});

//make this component available to the app
export default UserDataScreen;
