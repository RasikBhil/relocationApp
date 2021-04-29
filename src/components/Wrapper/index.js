import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

const Wrapper = ({style}) => {
  return <SafeAreaView style={{...styles, ...style}} />;
};
// export default Wrapper;

const Box = ({style, children}) => {
  return <View style={style}>{children}</View>;
};

export {Wrapper, Box};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});
