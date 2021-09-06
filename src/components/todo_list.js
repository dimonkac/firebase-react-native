import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import * as types from '../redux/actions/types';
import {
  addTodoSucess,
  deleteTodoAction,
  fetchTodos,
} from '../redux/actions/firebaseActions';

export const TodoList = () => {
  console.log('render todolist');
  const dispatch = useDispatch();
  const [textTodo, setTextTodo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateText, setUpdateText] = useState('');
  const {todos, isloading} = useSelector(state => state.todosReducer);

  useEffect(() => {
    const subscriber = firestore()
      .collection(types.TODOS)
      .onSnapshot(documentSnapshot => {
        let todos = [];
        documentSnapshot.forEach(doc =>
          todos.push({docID: doc.id, ...doc.data()}),
        );
        dispatch(fetchTodos(todos));
      });
    return () => subscriber();
  }, []);

  console.log(todos);
  console.log(isloading);

  const onChangeText = value => {
    setTextTodo(value);
  };

  // const addTodo = async () => {
  //   let title = textTodo;
  //   firestore().collection('todos').add({
  //     title,
  //     completed: false,
  //   });
  //   setTextTodo('');
  // };

  const getTodo = () => {
    dispatch(fetchTodos());
  };

  const addTodoButton = () => {
    dispatch(addTodoSucess(textTodo));
    setTextTodo('');
  };

  const deleteButton = id => {
    dispatch(deleteTodoAction(id));
  };

  const openModal = id => {
    setModalVisible(!modalVisible);
  };

  const updateTextTodo = () => {
    setModalVisible(!modalVisible);
  };

  const newTextTodo = value => {
    setUpdateText(value);
  };

  const renderTodo = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'grey',
          alignItems: 'center',
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Modal visible={modalVisible}>
          <View style={{top: '40%'}}>
            <TextInput
              placeholder="enter text"
              style={{borderWidth: 1}}
              onChangeText={newTextTodo}
            />
            <TouchableOpacity onPress={updateTextTodo}>
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text
          key={item.docID}
          style={{color: `${item.completed ? 'blue' : 'red'}`}}
        >
          {item.title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteButton(item.docID);
          }}
        >
          <Text>delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openModal(item.docID);
          }}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>TODO LIST</Text>
        {/*<Button title="get Todos" onPress={getTodos} />*/}
        {/*<Button title="Add TODO" onPress={addTodo} />*/}
        {/*<TextInput*/}
        {/*  value={textTodo}*/}
        {/*  style={{borderWidth: 1, marginHorizontal: 10}}*/}
        {/*  onChangeText={onChangeText}*/}
        {/*/>*/}
        {/*<View>*/}
        {/*  {myTodo.map(todo => (*/}
        {/*    <View key={todo.docID}>*/}
        {/*      <Text style={{color: `${todo.completed ? 'green' : 'red'}`}}>*/}
        {/*        {todo.title}*/}
        {/*      </Text>*/}
        {/*    </View>*/}
        {/*  ))}*/}
        {/*</View>*/}
      </View>
      <View>
        <TouchableOpacity onPress={getTodo}>
          <Text
            style={{
              color: 'red',
              backgroundColor: 'aqua',
              textAlign: 'center',
              fontSize: 18,
            }}
          >
            GET TODOS
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 5,
          }}
        >
          <TextInput
            style={{borderWidth: 1, width: '60%', fontSize: 20}}
            onChangeText={onChangeText}
            value={textTodo}
          />
          <TouchableOpacity onPress={addTodoButton}>
            <Text style={{backgroundColor: 'aqua', fontSize: 20}}>
              ADD TODO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: 'orange'}}>
        {isloading ? (
          <ActivityIndicator />
        ) : (
          <FlatList data={todos} renderItem={renderTodo} />
        )}
      </View>
    </SafeAreaView>
  );
};
