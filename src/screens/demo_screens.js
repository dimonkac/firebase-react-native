import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
// import {TodoList} from '../components/todo_list';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        {/*<TouchableOpacity onPress={() => navigation.navigate('TodoList')}>*/}
        {/*  <Text style={styles.textButton}>TodoList</Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity onPress={() => navigation.navigate('Counter')}>
          <Text style={styles.textButton}>Counter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ced6da',
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
