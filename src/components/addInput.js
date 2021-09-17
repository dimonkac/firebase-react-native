import React, {useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendars} from '../screens/calendar';

export const AddInput = props => {
  const [calendar, setCalendar] = useState(false);
  const [textTodo, setTextTodo] = useState('');
  const [updateDate, setUpdateDate] = useState('');

  const onChangeText = value => {
    setTextTodo(value);
  };

  const animate = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setCalendar(!calendar);
  };

  const dateChange = val => {
    setUpdateDate(val);
  };

  return (
    <View>
      <View>
        <View style={styles.containerInput}>
          <TextInput
            placeholder="enter your todo"
            style={styles.inputStyle}
            onChangeText={onChangeText}
            value={textTodo}
            onFocus={animate}
          />
          {updateDate ? (
            <TouchableOpacity
              onPress={() => {
                props.addTodoButton(textTodo, updateDate);
                setTextTodo('');
                setUpdateDate('');
              }}
            >
              <Text style={styles.buttonStyle}>ADD TODO</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          <TouchableOpacity onPress={animate}>
            <Text style={{textAlign: 'center', fontSize: 18}}>add data</Text>
          </TouchableOpacity>
        </View>
      </View>
      {calendar ? <Calendars dateChange={dateChange} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  containerFlat: {flex: 1, backgroundColor: 'orange'},
  indicatorStyle: {marginTop: 150},
  buttonStyle: {
    backgroundColor: 'aqua',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
  },
  inputStyle: {borderWidth: 1, width: '60%', fontSize: 20},
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  inputModal: {borderWidth: 1, margin: 10},
  positionModal: {flex: 1, top: 40},
  containerRenderFlat: {
    flex: 1,
    backgroundColor: 'grey',
    margin: 10,
    justifyContent: 'space-between',
  },
  textStyle: {textAlign: 'center', fontWeight: 'bold'},
  textContainer: {
    width: '37%',
  },
});
