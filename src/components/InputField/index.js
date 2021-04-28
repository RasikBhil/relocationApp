import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';
import {Box} from '../index';
import {colors} from '../../../theme';
const InputField = props => {
  const {onChangeText, value, placeHolder, secureTextEntry} = props;
  return (
    <Box>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeHolder}
        secureTextEntry={secureTextEntry}
      />
    </Box>
  );
};
export default InputField;
const styles = StyleSheet.create({
  input: {
    height: ms(40),
    margin: ms(10),
    borderBottomWidth: ms(1),
    borderBottomColor: colors.gray,
    borderStyle: 'solid',
    paddingLeft: 0,
  },
});
