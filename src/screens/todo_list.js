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
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import * as types from '../redux/actions/types';
import {
  addTodoSuccess,
  deleteTodoAction,
  fetchSignOutAction,
  fetchTodos,
  updateCompletedAction,
  updateTodoAction,
} from '../redux/actions/firebaseActions';
import {Calendars} from './calendar';

export const TodoList = () => {
  const {todos, isloading, userID} = useSelector(state => state.todosReducer);
  const dispatch = useDispatch();
  const [textTodo, setTextTodo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updateText, setUpdateText] = useState(`${updateText}`);
  const [updateId, setUpdateId] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [calendar, setCalendar] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection(types.TODOS)
      .where('userId', '==', `${userID}`)
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

  const addTodoButton = () => {
    dispatch(addTodoSuccess(textTodo, userID, updateDate));
    setTextTodo('');
    setUpdateDate('');
    setCalendar(!calendar);
  };

  const deleteButton = id => {
    dispatch(deleteTodoAction(id));
  };

  const openModal = (id, title) => {
    setModalVisible(!modalVisible);
    setUpdateText(title);
    setUpdateId(id);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
    setUpdateText('');
  };

  const updateTextTodo = (id, completed) => {
    setModalVisible(!modalVisible);
    dispatch(updateTodoAction(updateText, id, updateDate, completed, updateId));
    // dispatch(updateTodoAction(updateText, updateId, updateDate));
    setUpdateText('');
    setUpdateDate('');
  };

  const newTextTodo = value => {
    setUpdateText(value);
  };

  const changeCompleteTodo = (text, id, date, completed, docID) => {
    let complete = !completed;
    dispatch(updateTodoAction(text, id, date, complete, docID));
  };

  const signOutButton = () => {
    dispatch(fetchSignOutAction());
  };

  const dateChange = val => {
    setUpdateDate(val);
  };

  const renderTodo = ({item}) => (
    <View style={styles.containerRenderFlat}>
      <Modal visible={modalVisible}>
        <View style={styles.positionModal}>
          <TextInput
            placeholder="enter text"
            style={styles.inputModal}
            onChangeText={newTextTodo}
            value={updateText}
          />
          <Calendars dateChange={dateChange} />
          {updateDate ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  updateTextTodo(item.userId, item.completed);
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Switch
          value={item.completed}
          onValueChange={() =>
            changeCompleteTodo(
              item.title,
              item.userId,
              item.date,
              item.completed,
              item.docID,
            )
          }
        />
        <View style={styles.textContainer}>
          <Text
            key={item.docID}
            style={{color: `${item.completed ? 'blue' : 'red'}`}}
          >
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            deleteButton(item.docID);
          }}
        >
          <Text>delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openModal(item.docID, item.title);
          }}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexWrap: 'wrap'}}>
        <Text>{item.date}</Text>
      </View>
    </View>
  );

  const animate = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setCalendar(!calendar);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textStyle}>TODO LIST</Text>
      </View>
      <View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="enter your todo"
            style={styles.inputStyle}
            onChangeText={onChangeText}
            value={textTodo}
            onFocus={animate}
          />
          {updateDate ? (
            <TouchableOpacity onPress={addTodoButton}>
              <Text style={styles.buttonStyle}>ADD TODO</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          <TouchableOpacity onPress={animate}>
            <Text style={{textAlign: 'center', fontSize: 18}}>add data</Text>
          </TouchableOpacity>
        </View>
      </View>
      {calendar ? <Calendars dateChange={dateChange} /> : null}
      <View style={styles.containerFlat}>
        {isloading ? (
          <ActivityIndicator
            style={styles.indicatorStyle}
            size="large"
            color="#00ff00"
          />
        ) : (
          <FlatList data={todos} renderItem={renderTodo} />
        )}
      </View>
      <View>
        <TouchableOpacity onPress={signOutButton}>
          <Text style={styles.buttonStyle}> SIGN OUT </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  containerFlat: {flex: 1, backgroundColor: 'orange'},
  indicatorStyle: {marginTop: 150},
  buttonStyle: {
    backgroundColor: 'aqua',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
  },
  inputStyle: {borderWidth: 1, width: '60%', fontSize: 20},
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  inputModal: {borderWidth: 1, margin: 10},
  positionModal: {flex: 1, top: 40},
  containerRenderFlat: {
    flex: 1,
    backgroundColor: 'grey',
    margin: 10,
    justifyContent: 'space-between',
  },
  textStyle: {textAlign: 'center', fontWeight: 'bold'},
  textContainer: {
    width: '37%',
  },
});
