import React, {useState} from 'react';

import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import DatePicker from 'react-native-modern-datepicker';
export default function DateAndTimePicker({
  visibility,
  onPressClose,
  onSelectedChange,
  current,
  selected,
  mode,
  onPressSave
}) {
  return (
    <View>
      <Modal visible={visibility} animationType={'slide'} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#090C08',
              marginVertical: 60,
              width: '90%',
              borderWidth: 1,
              borderColor: '#090C08',
              borderRadius: 7,
              elevation: 10,
            }}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', margin: 10}}
              onPress={onPressClose}>
              <Image
                source={require('../../assest/close.png')}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
            <DatePicker 
              options={{
                backgroundColor: '#090C08',
                textHeaderColor: '#FFA25B',
                textDefaultColor: '#F6E7C1',
                selectedTextColor: '#fff',
                mainColor: '#F4722B',
                textSecondaryColor: '#D6C7A1',
                borderColor: 'rgba(122, 146, 165, 0.1)',
              }}
              current={current}
              selected={selected}
              mode={mode}
              minuteInterval={30}
              style={{borderRadius: 10}}
              onSelectedChange={onSelectedChange}
            />
              <TouchableOpacity

              style={{alignSelf: 'center',height:40,width:100,backgroundColor:'#F4722B',justifyContent:'center',borderRadius:10,margin:10}}
              onPress={onPressSave}>
                <Text style={{color:'white',textAlign:'center'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
