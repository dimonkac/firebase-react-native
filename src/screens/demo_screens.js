import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

const image = {
  uri: 'https://www.drzimmerman.com/wp-content/uploads/2017/10/Energize-Icon-Imagr-1400x800.png',
};

export const DemoScreen = ({navigation}) => {
  // const normalizedData = data => {
  //   if (data <= 0) {
  //     return '0  кВТ';
  //   } else if (data >= 100) {
  //     return `${Math.round(data)} кВТ`;
  //   } else if (data >= 1 && data < 100) {
  //     return (Math.floor(data * 10) / 10).toFixed(1);
  //   } else if (data > 0.005 && data < 1) {
  //     return `${data.toFixed(2)} кВТ`;
  //   } else if (data > 0 && data <= 0.005) {
  //     return `${0.01} кВТ`;
  //   }
  // };
  // console.log(normalizedData(0.009));

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={{flex: 1}} source={image} resizeMode="cover">
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Authentication')}
          >
            <Text style={styles.textButton}>Authentication</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Counter')}>
            <Text style={styles.textButton}>Counter</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
