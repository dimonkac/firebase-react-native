import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {Counter} from './src/components/counter';
import {DemoScreen} from './src/screens/demo_screens';
import {TodoList} from './src/components/todo_list';

const Stack = createNativeStackNavigator();

const App = () => {
  console.log('render app');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DemoScreen">
          <Stack.Screen name="DemoScreen" component={DemoScreen} />
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="TodoList" component={TodoList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
