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
  addTodoSuccessAction,
  deleteTodoAction,
  fetchSignOutAction,
  fetchTodosAction,
  updateTodoAction,
} from '../redux/actions/firebaseActions';
import {Calendars} from './calendar';
import {AddInput} from '../components/addInput';
// import {ModalUpdate} from '../components/modalUpdate';
import {connect} from 'react-redux';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', date: '', idTodo: '', modalVisible: false};
  }

  componentDidMount() {
    firestore()
      .collection(types.TODOS)
      .where('userId', '==', `${this.props.userID}`)
      .onSnapshot(documentSnapshot => {
        let todo = [];
        documentSnapshot.forEach(doc =>
          todo.push({docID: doc.id, ...doc.data()}),
        );
        console.log(todo);
        this.props.fetchTodosAction(todo);
      });
  }

  deleteButton = id => {
    this.props.deleteTodoAction(id);
  };

  addTodoButton = (text, date) => {
    this.props.addTodoSuccessAction(text, this.props.userID, date);
  };

  openModal = (idTodo, title) => {
    this.setState({modalVisible: !this.state.modalVisible});
    this.setState({text: title});
    this.setState({idTodo: idTodo});
  };

  closeModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  signOutButton = () => {
    this.props.fetchSignOutAction();
  };

  newTextTodo = value => {
    this.setState({text: value});
  };

  dateChange = val => {
    this.setState({date: val});
  };

  updateTextTodo = (id, completed) => {
    this.setState({modalVisible: !this.state.modalVisible});
    this.props.updateTodoAction(
      this.state.text,
      this.props.userID,
      this.state.date,
      completed,
      this.state.idTodo,
    );
  };

  render() {
    const renderTodo = ({item}) => (
      <View style={styles.containerRenderFlat}>
        <Modal visible={this.state.modalVisible}>
          <View style={styles.positionModal}>
            <TextInput
              placeholder="enter text"
              style={styles.inputModal}
              onChangeText={this.newTextTodo}
              value={this.state.text}
            />
            <Calendars dateChange={this.dateChange} />
            <TouchableOpacity
              onPress={() => {
                this.updateTextTodo(item.userId, item.completed);
              }}
            >
              <Text style={styles.buttonStyle}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.closeModal}>
              <Text style={styles.buttonStyle}>cancel</Text>
            </TouchableOpacity>
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
              this.changeCompleteTodo(
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
              this.deleteButton(item.docID);
            }}
          >
            <Text>delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openModal(item.docID, item.title);
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

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.textStyle}>TODO LIST</Text>
        </View>
        <AddInput addTodoButton={this.addTodoButton} />
        <View style={styles.containerFlat}>
          {this.props.isloading ? (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="large"
              color="#00ff00"
            />
          ) : (
            <FlatList data={this.props.todos} renderItem={renderTodo} />
          )}
        </View>
        <View>
          <TouchableOpacity onPress={this.signOutButton}>
            <Text style={styles.buttonStyle}> SIGN OUT </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

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

const mapStateToProps = state => {
  return state.todosReducer;
};

const mapDispatchToProps = dispatch => {
  return {
    updateTodoAction: (text, id, date, completed, updateId) =>
      dispatch({
        type: types.UPDATE_TODO,
        payload: {text, id, date, completed, updateId},
      }),
    fetchTodosAction: todo =>
      dispatch({type: types.FETCH_TODOS, payload: todo}),
    addTodoSuccessAction: (text, userId, date) =>
      dispatch({type: types.ADD_TODO_SUCCES, payload: {text, userId, date}}),
    deleteTodoAction: id => dispatch({type: types.DELETE_TODO, payload: id}),
    fetchSignOutAction: () => dispatch({type: types.SIGN_OUT_FETCH}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

// export const TodoList = () => {
//   const {todos, isloading, userID} = useSelector(state => state.todosReducer);
//   const dispatch = useDispatch();
//   const [textTodo, setTextTodo] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [updateText, setUpdateText] = useState(`${updateText}`);
//   const [updateId, setUpdateId] = useState('');
//   const [updateDate, setUpdateDate] = useState('');
//   const [date, setDate] = useState('');
//
//   useEffect(() => {
//     const subscriber = firestore()
//       .collection(types.TODOS)
//       .where('userId', '==', `${userID}`)
//       .onSnapshot(documentSnapshot => {
//         let todo = [];
//         documentSnapshot.forEach(doc =>
//           todo.push({docID: doc.id, ...doc.data()}),
//         );
//         dispatch(fetchTodosAction(todo));
//       });
//     return () => subscriber();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//
//   useEffect(() => {
//     dispatch(addTodoSuccessAction(textTodo, userID, date));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [textTodo, date]);
//
//   const addTodoButton = (text, date) => {
//     setTextTodo(text);
//     setDate(date);
//   };
//
//   const deleteButton = id => {
//     dispatch(deleteTodoAction(id));
//   };
//
//   const openModal = (id, title) => {
//     setModalVisible(!modalVisible);
//     setUpdateText(title);
//     setUpdateId(id);
//   };
//
//   const closeModal = () => {
//     setModalVisible(!modalVisible);
//     setUpdateText('');
//   };
//
//   const updateTextTodo = (id, completed) => {
//     setModalVisible(!modalVisible);
//     dispatch(updateTodoAction(updateText, id, updateDate, completed, updateId));
//     setUpdateText('');
//     setUpdateDate('');
//   };
//
//   const newTextTodo = value => {
//     setUpdateText(value);
//   };
//
//   const changeCompleteTodo = (text, id, date, completed, docID) => {
//     let complete = !completed;
//     dispatch(updateTodoAction(text, id, date, complete, docID));
//   };
//
//   const signOutButton = () => {
//     dispatch(fetchSignOutAction());
//   };
//
//   const dateChange = val => {
//     setUpdateDate(val);
//   };
//
//   const renderTodo = ({item}) => (
//     <View style={styles.containerRenderFlat}>
//       {/*<ModalUpdate*/}
//       {/*  modalVisible={modalVisible}*/}
//       {/*  item={item}*/}
//       {/*  closeModal={closeModal}*/}
//       {/*  dateChange={dateChange}*/}
//       {/*  updateText={updateText}*/}
//       {/*  updateTextTodo={updateTextTodo}*/}
//       {/*/>*/}
//       <Modal visible={modalVisible}>
//         <View style={styles.positionModal}>
//           <TextInput
//             placeholder="enter text"
//             style={styles.inputModal}
//             onChangeText={newTextTodo}
//             value={updateText}
//           />
//           <Calendars dateChange={dateChange} />
//           {updateDate ? (
//             <>
//               <TouchableOpacity
//                 onPress={() => {
//                   updateTextTodo(item.userId, item.completed);
//                 }}
//               >
//                 <Text style={styles.buttonStyle}>Update</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={closeModal}>
//                 <Text style={styles.buttonStyle}>cancel</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <TouchableOpacity onPress={closeModal}>
//               <Text style={styles.buttonStyle}>cancel</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </Modal>
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <Switch
//           value={item.completed}
//           onValueChange={() =>
//             changeCompleteTodo(
//               item.title,
//               item.userId,
//               item.date,
//               item.completed,
//               item.docID,
//             )
//           }
//         />
//         <View style={styles.textContainer}>
//           <Text
//             key={item.docID}
//             style={{color: `${item.completed ? 'blue' : 'red'}`}}
//           >
//             {item.title}
//           </Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => {
//             deleteButton(item.docID);
//           }}
//         >
//           <Text>delete</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             openModal(item.docID, item.title);
//           }}
//         >
//           <Text>Update</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{flexWrap: 'wrap'}}>
//         <Text>{item.date}</Text>
//       </View>
//     </View>
//   );
//
//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text style={styles.textStyle}>TODO LIST</Text>
//       </View>
//       <AddInput addTodoButton={addTodoButton} />
//       <View style={styles.containerFlat}>
//         {isloading ? (
//           <ActivityIndicator
//             style={styles.indicatorStyle}
//             size="large"
//             color="#00ff00"
//           />
//         ) : (
//           <FlatList data={todos} renderItem={renderTodo} />
//         )}
//       </View>
//       <View>
//         <TouchableOpacity onPress={signOutButton}>
//           <Text style={styles.buttonStyle}> SIGN OUT </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };
