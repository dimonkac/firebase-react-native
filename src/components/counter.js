import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '../redux/actions/counterAction';

export const Counter = () => {
  const countNumber = useSelector(state => state.counterReducer);
  const dispatch = useDispatch();
  const countincrement = () => {
    dispatch(increment());
  };
  const countdecrement = () => {
    dispatch(decrement());
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Text>Click: {countNumber}</Text>
        <TouchableOpacity onPress={countincrement}>
          <Text
            style={{borderWidth: 1, margin: 5, padding: 5, borderRadius: 10}}
          >
            +1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={countdecrement}>
          <Text
            style={{borderWidth: 1, margin: 5, padding: 5, borderRadius: 10}}
          >
            -1
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
