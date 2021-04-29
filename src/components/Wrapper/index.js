import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {colors} from '../../../theme';

const Wrapper = props => {
  return <SafeAreaView style={styles.wrapper}>{props.children}</SafeAreaView>;
};

const Box = ({style, children}) => {
  return <View style={style}>{children}</View>;
};

export {Wrapper, Box};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
