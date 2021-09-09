import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as types from '../actions/types';

export const getTodos = async userId => {
  try {
    return await firestore()
      .collection('todos')
      .where('userId', '==', `${userId}`)
      .get();

    // .onSnapshot(docs => {
    //   console.log(docs);
    // });
    // await firestore()
    //   .collection('todos')
    //   .onSnapshot(docs => {
    //     const todos = [];
    //     docs.forEach(doc => {
    //       todos.push({docID: doc.id, ...doc.data()});
    //     });
    //   });
    // return console.log(todos) ;
  } catch (e) {
    throw new Error(e);
  }
};

export const addTodo = async () => {
  try {
    return await firestore().collection('todos');
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = async id => {
  try {
    await firestore().collection('todos').doc(id).delete();
    return true;
  } catch (e) {
    // return null;
    console.log(e);
  }
};

export const updateTodo = async ({id, text}) => {
  try {
    return await firestore()
      .collection(types.TODOS)
      .doc(id)
      .update({title: text});
  } catch (e) {
    console.log(e);
  }
};

export const changeCompleted = async ({id, complete}) => {
  try {
    return await firestore()
      .collection(types.TODOS)
      .doc(id)
      .update({completed: complete});
  } catch (e) {
    console.log(e);
  }
};

export const signUser = async () => {
  return await auth()
    .signInAnonymously()
    .then(user => {
      console.log('User signed in anonymously');
      return user.user.uid;
    });
};
