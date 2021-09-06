import firestore from '@react-native-firebase/firestore';

export const getTodos = async () => {
  try {
    return await firestore().collection('todos').get();

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
    return await firestore().collection('todos').doc(id).delete();
  } catch (e) {
    console.log(e);
  }
};
