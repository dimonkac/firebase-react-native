import React from 'react';
import {Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

export const Calendars = ({dateChange}) => {
  return (
    <View>
      <Text> Data </Text>
      <Calendar
        current={`${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`}
        onDayPress={day => {
          dateChange(day.dateString);
        }}
        monthFormat={'yyyy MM'}
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        enableSwipeMonths={true}
      />
    </View>
  );
};
