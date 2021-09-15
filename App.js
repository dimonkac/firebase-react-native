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
import {Calendars} from './src/screens/calendar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Authentication">
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="DemoScreen" component={DemoScreen} />
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="TodoList" component={TodoList} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Calendars" component={Calendars} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
