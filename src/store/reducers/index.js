import * as types from '../types';
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

export default reducers;
