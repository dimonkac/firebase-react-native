import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
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
  updateCompletedAction,
  updateTodoAction,
} from '../redux/actions/firebaseActions';

export const TodoList = () => {
  const dispatch = useDispatch();
  const [textTodo, setTextTodo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateText, setUpdateText] = useState('');
  const [updateId, setUpdateId] = useState(0);
  const {todos, isloading} = useSelector(state => state.todosReducer);

  useEffect(() => {
    const subscriber = firestore()
      .collection(types.TODOS)
      .onSnapshot(documentSnapshot => {
        let todo = [];
        documentSnapshot.forEach(doc =>
          todo.push({docID: doc.id, ...doc.data()}),
        );
        dispatch(fetchTodos(todo));
      });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeText = value => {
    setTextTodo(value);
  };

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
    setUpdateId(id);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
    setUpdateText('');
  };

  const updateTextTodo = () => {
    setModalVisible(!modalVisible);
    dispatch(updateTodoAction(updateText, updateId));
    setUpdateText('');
  };

  const newTextTodo = value => {
    setUpdateText(value);
  };

  const changeCompleteTodo = (id, completed) => {
    let complete = !completed;
    dispatch(updateCompletedAction(id, complete));
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
              style={{borderWidth: 1, margin: 10}}
              onChangeText={newTextTodo}
              value={updateText}
            />
            {updateText ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    updateTextTodo(item.docID);
                  }}
                >
                  <Text style={{textAlign: 'center', fontSize: 16}}>
                    Update
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={{textAlign: 'center', fontSize: 16}}>
                    cancel
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={closeModal}>
                <Text style={{textAlign: 'center', fontSize: 16}}>cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
        <View />
        <Switch
          value={item.completed}
          onValueChange={() => changeCompleteTodo(item.docID, item.completed)}
        />
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
          <ActivityIndicator
            style={{marginTop: 150}}
            size="large"
            color="#00ff00"
          />
        ) : (
          <FlatList data={todos} renderItem={renderTodo} />
        )}
      </View>
    </SafeAreaView>
  );
};
