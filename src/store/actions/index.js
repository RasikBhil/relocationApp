import * as types from '../types';

export const addUserProfile = payload => dispatch => {
  return dispatch({
    type: types.ADD_USER_PROFILE_DATA,
    payload: payload,
  });
};
