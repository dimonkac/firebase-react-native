import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignInPasswordAction} from '../redux/actions/firebaseActions';
import {TodoList} from './todo_list';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const dispatch = useDispatch();

  const user = useSelector(state => state.todosReducer.userID);
  console.log(user);

  // const validateEmail = (e: string): boolean => {
  //   const re =
  //     /^(([^<>()[\]\\.,;:\s@“]+(\.[^<>()[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return !re.test(String(e).toLowerCase());
  // };
  //
  // console.log(validateEmail('dfffd@gmail.com'));

  const textEmail = val => {
    setEmail(val);
  };

  const textPassword = val => {
    setPassord(val);
  };

  const registration = () => {
    dispatch(fetchSignInPasswordAction(email, password));
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <TodoList />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.containerView}>
            <TextInput
              placeholderTextColor="#696565"
              placeholder="please enter your email"
              style={styles.inputStyle}
              onChangeText={textEmail}
            />
            <TextInput
              placeholderTextColor="#696565"
              placeholder="please enter your password"
              style={styles.inputStyle}
              onChangeText={textPassword}
            />
            <TouchableOpacity onPress={registration}>
              <Text>Registration</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  inputStyle: {
    width: '80%',
    backgroundColor: '#ffff',
    borderWidth: 1,
    marginVertical: 5,
  },
});
