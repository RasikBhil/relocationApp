/**
 * @format
 */
import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './src/navigator';
import {colors} from './theme';

const App = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.white} />
      <Navigator />
    </>
  );
};
export default App;
