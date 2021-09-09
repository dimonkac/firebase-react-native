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
  StyleSheet,
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
  const {todos, isloading, userID} = useSelector(state => state.todosReducer);

  console.log(todos.todos);
  console.log(isloading);
  console.log(userID);

  useEffect(() => {
    const subscriber = firestore()
      .collection(types.TODOS)
      .where('userId', '==', 'userID')
      .onSnapshot(documentSnapshot => {
        let todo = [];
        documentSnapshot.forEach(doc =>
          todo.push({docID: doc.id, ...doc.data()}),
        );
        dispatch(fetchTodos(userID));
      });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeText = value => {
    setTextTodo(value);
  };

  const getTodo = () => {
    dispatch(fetchTodos(userID));
  };

  const addTodoButton = () => {
    dispatch(addTodoSucess(textTodo, userID));
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
      <View style={styles.conteinerRenderFlat}>
        <Modal visible={modalVisible}>
          <View style={styles.positionModal}>
            <TextInput
              placeholder="enter text"
              style={styles.inputModal}
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
                  <Text style={styles.buttonStyle}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.buttonStyle}>cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.buttonStyle}>cancel</Text>
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
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textStyle}>TODO LIST</Text>
      </View>
      <View>
        <TouchableOpacity onPress={getTodo}>
          <Text style={styles.buttonStyle}>GET TODOS</Text>
        </TouchableOpacity>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputStele}
            onChangeText={onChangeText}
            value={textTodo}
          />
          <TouchableOpacity onPress={addTodoButton}>
            <Text style={styles.buttonStyle}>ADD TODO</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.conteinerFlatlist}>
        {isloading ? (
          <ActivityIndicator
            style={styles.indicatorStyle}
            size="large"
            color="#00ff00"
          />
        ) : (
          <FlatList data={todos.todos} renderItem={renderTodo} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  conteinerFlatlist: {flex: 1, backgroundColor: 'orange'},
  indicatorStyle: {marginTop: 150},
  buttonStyle: {backgroundColor: 'aqua', textAlign: 'center', fontSize: 20},
  inputStele: {borderWidth: 1, width: '60%', fontSize: 20},
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  inputModal: {borderWidth: 1, margin: 10},
  positionModal: {top: '40%'},
  conteinerRenderFlat: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {textAlign: 'center', fontWeight: 'bold'},
});
