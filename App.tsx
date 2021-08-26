import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/redux/store';
import {decrement, increment} from './src/redux/actions/counterAction';
import {IRootReducer} from './src/redux/reducers/rootReducer';

const Stack = createNativeStackNavigator();

const DemoScreen: React.FC<{}> = () => {
  const countNumber = useSelector(
    (state: IRootReducer) => state.counterReducer,
  );
  const dispatch = useDispatch();
  const countincrement = () => {
    dispatch(increment());
  };
  const countdecrement = () => {
    dispatch(decrement());
  };
  return (
    <SafeAreaView
      style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
    >
      <Text>{countNumber}</Text>
      <TouchableOpacity onPress={countincrement}>
        <Text>+1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={countdecrement}>
        <Text>-1</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DemoScreen">
          <Stack.Screen name={'DemoScreen'} component={DemoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
