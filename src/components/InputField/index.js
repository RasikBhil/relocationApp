import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
const InputField = props => {
  const {onChangeText, value, placeHolder, secureTextEntry, style} = props;
  return (
    <TextInput
      style={{...styles.input, ...style}}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeHolder}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};
export default InputField;
const styles = StyleSheet.create({
  input: {
    fontSize: ms(13),
  },
});
