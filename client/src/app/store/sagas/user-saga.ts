import { takeEvery, call, put, fork } from 'redux-saga/effects';
import { getUsers } from '../../api/tickets-api';
import { User } from '@acme/shared-models';
import * as actions from '../actions/users';
import { Types } from '../actions/types';

function* fetchUsers(action: any) {
  const { callback } = action.payload;
  try {
    const result: User[] = yield call(getUsers);
    yield put(actions.getUsersSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

export function* userSaga() {
  yield takeEvery(Types.GET_USERS_REQUEST, fetchUsers);
}
