import firestore from '@react-native-firebase/firestore';

export const getTodos = async () => {
  try {
    // return await firestore().collection('todos').get();
    return await firestore().collection('todos');
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
    const allTodo = await firestore().collection('todos');
    console.log(allTodo);
  } catch (e) {
    console.log(e);
  }
};
