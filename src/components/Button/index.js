import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {ms, s} from 'react-native-size-matters';
import Label from '../Text';
import {colors} from '../../../theme';
const Button = props => {
  const {title, OnPress} = props;
  return (
    <View>
      <TouchableOpacity onPress={OnPress} style={styles.button}>
        <Label style={styles.text}>{title}</Label>
      </TouchableOpacity>
    </View>
  );
};
export default Button;
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gray,
    color: colors.black,
    alignItems: 'center',
    padding: ms(5),
    width: '50%',
    alignSelf: 'center',
    elevation: 3,
    marginVertical: ms(10),
  },
  text: {
    fontSize: s(18),
  },
});
