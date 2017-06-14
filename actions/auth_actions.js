import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

// How to use Async Storage:
  // AsyncStorage.setItem('fb_token', token);
  // AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch an action saying FB Login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Run user through FB login process
    doFacebookLogin(dispatch);
  }
}

const doFacebookLogin = async (dispatch) => {
  // The type and token is the data returned from the login request
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '1910455685858032', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
}
