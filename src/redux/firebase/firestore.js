import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as types from '../actions/types';
import {Alert} from 'react-native';

export const addTodo = async newTodo => {
  try {
    return await firestore().collection(types.TODOS).add(newTodo);
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = async id => {
  try {
    await firestore().collection(types.TODOS).doc(id).delete();
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const updateTodo = async (idTodo, newTodo) => {
  try {
    return await firestore()
      .collection(types.TODOS)
      .doc(idTodo)
      .update(newTodo);
  } catch (e) {
    console.log(e);
  }
};

export const signUser = async () => {
  return await auth()
    .signInAnonymously()
    .then(user => {
      Alert.alert('User signed in anonymously');
      return user.user.uid;
    });
};

export const sigOutUser = async () => {
  return await auth()
    .signOut()
    .then(() => Alert.alert('User signed out!'));
};

export const signPasswordUser = async ({email, password}) => {
  return await auth()
    .createUserWithEmailAndPassword(`${email}`, `${password}`)
    .then(user => {
      Alert.alert('User account created & signed in!');
      return user.user.uid;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
};

export const signAuthorizationUser = async ({email, password}) => {
  return await auth()
    .signInWithEmailAndPassword(`${email}`, `${password}`)
    .then(user => {
      Alert.alert('User account signed in!');
      return user.user.uid;
    })
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
};
