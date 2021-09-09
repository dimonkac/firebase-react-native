import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {fetchSignInAction} from '../redux/actions/firebaseActions';

export const Authentication = () => {
  const dispatch = useDispatch();

  const sign = () => {
    dispatch(fetchSignInAction());
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={sign}>
          <Text>sign-in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
