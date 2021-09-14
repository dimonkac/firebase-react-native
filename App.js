import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {Counter} from './src/components/counter';
import {DemoScreen} from './src/screens/demo_screens';
import {TodoList} from './src/screens/todo_list';
import {Authentication} from './src/screens/authentication';
import {Registration} from './src/screens/registration';

const Stack = createNativeStackNavigator();

const App = () => {
  console.log('render app');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Authentication">
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="DemoScreen" component={DemoScreen} />
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="TodoList" component={TodoList} />
          <Stack.Screen name="Registration" component={Registration} />
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
