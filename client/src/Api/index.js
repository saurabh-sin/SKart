import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../reducers/user';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post(
      'http://localhost:5000/',
      user
    );
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
