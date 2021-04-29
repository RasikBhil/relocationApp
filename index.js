/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import React from 'react';
import {store, persistor} from './src/store';
import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const MainApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
