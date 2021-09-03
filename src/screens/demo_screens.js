import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const image = {
  uri: 'https://www.drzimmerman.com/wp-content/uploads/2017/10/Energize-Icon-Imagr-1400x800.png',
};
export const DemoScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={{flex: 1}} source={image} resizeMode="cover">
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => navigation.navigate('TodoList')}>
            <Text style={{color: '#fff'}}>TodoList</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Counter')}>
            <Text style={{color: '#fff'}}>Counter</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
