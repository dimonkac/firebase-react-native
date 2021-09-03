import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {addTodoSucess, fetchTodos} from '../redux/actions/firebaseActions';

export const TodoList = () => {
  const dispatch = useDispatch();
  const [textTodo, setTextTodo] = useState('');
  const todos = useSelector(state => state.todosReducer.todos);
  console.log(todos);

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
    setTextTodo('')
  };

  const renderTodo = ({item}) => {
    return <Text key={item.docID}>{item.title}</Text>;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text style={{textAlign: 'center'}}>TODO LIST</Text>

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
          <Text>GET TODO</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextInput
            style={{borderWidth: 1, width: '60%'}}
            onChangeText={onChangeText}
            value={textTodo}
          />
          {/*<TouchableOpacity onPress={addTodoButton}>*/}
          {/*  <Text>ADD TODO</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </View>
      <View>
        <FlatList data={todos} renderItem={renderTodo} />
      </View>
    </SafeAreaView>
  );
};
