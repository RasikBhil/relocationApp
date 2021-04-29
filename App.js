/**
 * @format
 */
import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './src/navigator';
import {colors} from './theme';
import {Wrapper} from './src/components';

const App = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.white} />
      <Wrapper>
        <Navigator />
      </Wrapper>
    </>
  );
};
export default App;
