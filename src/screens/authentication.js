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
import {
  fetchAuthorizationAction,
  fetchSignInAction,
} from '../redux/actions/firebaseActions';
import TodoList from './todo_list';

export const Authentication = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.todosReducer.userID);

  const sign = () => {
    dispatch(fetchSignInAction());
  };

  const signAuthoriz = () => {
    dispatch(fetchAuthorizationAction(email, password));
  };

  const textEmail = val => {
    setEmail(val);
  };

  const textPassword = val => {
    setPassord(val);
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <TodoList navigation={navigation} />
      ) : (
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
          <TouchableOpacity onPress={signAuthoriz}>
            <Text style={styles.textStyle}>sign-in your account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Registration');
            }}
          >
            <Text style={styles.textStyle}>registration</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sign}>
            <Text style={styles.textStyle}>sign-in anonymous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Calendars');
            }}
          >
            <Text style={styles.textStyle}>Calendars</Text>
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
  inputStyle: {
    width: '80%',
    backgroundColor: '#ffff',
    borderWidth: 1,
    marginVertical: 5,
  },
});
