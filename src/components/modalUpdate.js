// import {
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useState} from 'react';
// import {Calendars} from '../screens/calendar';
//
// export const ModalUpdate = ({
//   modalVisible,
//   item,
//   closeModal,
//   dateChange,
//   updateText,
//   updateTextTodo,
// }) => {
//   const [text, setText] = useState(item.title);
//   console.log(text);
//   const newTextTodo = value => {
//     setText(value);
//   };
//
//   return (
//     <Modal visible={modalVisible}>
//       <View style={styles.positionModal}>
//         <TextInput
//           placeholder="enter text"
//           style={styles.inputModal}
//           onChangeText={newTextTodo}
//           value={text}
//         />
//         <Calendars dateChange={dateChange} />
//         <TouchableOpacity
//           onPress={() => {
//             updateTextTodo(item.userId, item.completed, text);
//           }}
//         >
//           <Text style={styles.buttonStyle}>Update</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={closeModal}>
//           <Text style={styles.buttonStyle}>cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {flex: 1},
//   containerFlat: {flex: 1, backgroundColor: 'orange'},
//   indicatorStyle: {marginTop: 150},
//   buttonStyle: {
//     backgroundColor: 'aqua',
//     textAlign: 'center',
//     fontSize: 20,
//     marginBottom: 5,
//   },
//   inputStyle: {borderWidth: 1, width: '60%', fontSize: 20},
//   containerInput: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 5,
//   },
//   inputModal: {borderWidth: 1, margin: 10},
//   positionModal: {flex: 1, top: 40},
//   containerRenderFlat: {
//     flex: 1,
//     backgroundColor: 'grey',
//     margin: 10,
//     justifyContent: 'space-between',
//   },
//   textStyle: {textAlign: 'center', fontWeight: 'bold'},
//   textContainer: {
//     width: '37%',
//   },
// });
