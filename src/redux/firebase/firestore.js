import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as types from '../actions/types';
import {Alert} from 'react-native';

// export const getTodos = async userId => {
//   try {
//     return await firestore()
//       .collection('todos')
//       .where('userId', '==', `${userId}`)
//       .get();
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
//   } catch (e) {
//     throw new Error(e);
//   }
// };

export const addTodo = async () => {
  try {
    return await firestore().collection('todos');
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = async id => {
  console.log(id);
  console.log(5);
  try {
    await firestore().collection('todos').doc(id).delete();
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodoExpired = async todos => {
  try {
    await firestore().collection('todos').doc(todos).delete();
    return true;
  } catch (e) {
    console.log('1321', e);
  }
};

export const updateTodo = async ({id, text, data}) => {
  try {
    return await firestore()
      .collection(types.TODOS)
      .doc(id)
      .update({title: text, data: data});
  } catch (e) {
    console.log(e);
  }
};

export const changeCompleted = async ({id, complete}) => {
  try {
    return await firestore()
      .collection(types.TODOS)
      .doc(id)
      .update({completed: complete})
      .then(() => {
        Alert.alert('change complete');
      });
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
