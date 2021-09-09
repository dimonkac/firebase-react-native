import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignInAction} from '../redux/actions/firebaseActions';
import {TodoList} from './todo_list';

export const Authentication = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.todosReducer.userID);

  console.log(user);

  const sign = () => {
    dispatch(fetchSignInAction());
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <TodoList />
      ) : (
        <View style={styles.containerView}>
          <TouchableOpacity onPress={sign}>
            <Text>sign-in</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#97b1d8',
  },
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
