import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchSignInPasswordAction} from '../redux/actions/firebaseActions';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
  const dispatch = useDispatch();

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
