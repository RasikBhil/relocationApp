import * as types from '../types';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
const initialState = {
  userProfileData: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER_PROFILE_DATA: {
      return {...state, userProfileData: action.payload};
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  app: persistReducer(persistConfig, reducers),
});

export default rootReducers;
