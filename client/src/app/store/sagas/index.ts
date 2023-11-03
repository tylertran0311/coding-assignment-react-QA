import { fork } from 'redux-saga/effects';
import { userSaga } from './user-saga';
import { ticketSaga } from './ticket-saga';

export function* rootSaga() {
  yield fork(userSaga);
  yield fork(ticketSaga);
}
