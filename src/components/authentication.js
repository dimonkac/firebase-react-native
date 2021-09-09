import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignInAction} from '../redux/actions/firebaseActions';
import {TodoList} from './todo_list';

export const Authentication = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.todosReducer.userID);
  // console.log(user);

  const sign = () => {
    dispatch(fetchSignInAction());
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <TodoList />
      ) : (
        <View style={styles.containerView}>
          <TextInput
            placeholderTextColor="#696565"
            placeholder="please enter your email"
            style={{width: '80%', backgroundColor: '#ffff', borderWidth: 1}}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Registration');
            }}
          >
            <Text style={styles.textStyle}>registration</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sign}>
            <Text style={styles.textStyle}>sign-in</Text>
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
  textStyle: {
    fontSize: 20,
  },
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
