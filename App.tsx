import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/redux/store';
import {decrement, increment} from './src/redux/actions/counterAction';
import {IRootReducer} from './src/redux/reducers/rootReducer';
import * as firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

const DemoScreen: React.FC<{}> = () => {
  const [myTodo, setMyTodo] = useState([]);
  const getTodos = async () => {
    try {
      const todos = await firestore()
        .collection('todos')
        .onSnapshot(docs => {
          const todosR = [];
          docs.forEach(doc => {
            todosR.push({docID: doc.id, ...doc.data()});
          });
          setMyTodo(todosR);
        });
      // todos.forEach(doc => {
      //   todosR.push({
      //     docID: doc.id,
      //     ...doc.data(),
      //   });
      // });
      // return setMyTodo(todosR);
    } catch (e) {
      throw new Error(e);
    }
  };
  console.log(myTodo);

  const addRandomTodo = async () => {
    let title = Math.random().toString(36).substring(7);
    firestore().collection('todos').add({
      title,
      completed: false,
    });
  };

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
    <SafeAreaView style={{alignItems: 'center', flex: 1}}>
      <Text>{countNumber}</Text>
      <TouchableOpacity onPress={countincrement}>
        <Text>+1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={countdecrement}>
        <Text>-1</Text>
      </TouchableOpacity>
      <Button title="get Todos" onPress={getTodos} />
      <Button title="Add random" onPress={addRandomTodo} />
      <View>
        {myTodo.map(todo => (
          <View key={todo.docID}>
            <Text style={{color: `${todo.completed ? 'green' : 'red'}`}}>
              {todo.title}
            </Text>
          </View>
        ))}
      </View>
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
