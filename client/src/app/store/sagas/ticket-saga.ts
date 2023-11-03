import { Ticket } from '@acme/shared-models';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  assignTicket,
  completeTicket,
  createTicket,
  getSingleTicket,
  getTickets,
  incompleteTicket,
  unAssignTicket,
} from '../../api/tickets-api';
import * as actions from '../actions/tickets';
import { Types } from '../actions/types';

function* fetchTickets(action: any) {
  const { callback } = action.payload;
  try {
    const result: Ticket[] = yield call(getTickets);
    yield put(actions.getTicketsSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

function* fetchTicket(action: any) {
  const { callback } = action.payload;
  try {
    const result: Ticket = yield call(getSingleTicket, action.payload.id);
    yield put(actions.getSingleTicketsSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

function* createTicketSaga(action: any) {
  const { callback } = action.payload;
  try {
    yield call(createTicket, action.payload.description);
    yield put(actions.createTicketSuccess());
    const result: Ticket[] = yield call(getTickets);
    yield put(actions.getTicketsSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

function* completeTicketSaga(action: any) {
  const { callback } = action.payload;
  try {
    yield call(completeTicket, action.payload.ticketId);
    yield put(actions.completeTicketSuccess());
    const result: Ticket[] = yield call(getTickets);
    yield put(actions.getTicketsSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

function* incompleteTicketSaga(action: any) {
  const { callback } = action.payload;
  try {
    yield call(incompleteTicket, action.payload.ticketId);
    yield put(actions.completeTicketSuccess());
    const result: Ticket[] = yield call(getTickets);
    yield put(actions.getTicketsSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

function* assignTicketSaga(action: any) {
  const { callback } = action.payload;
  try {
    yield call(
      assignTicket,
      action.payload.ticketId,
      action.payload.assigneeId
    );
    yield put(actions.assignTicketSuccess());
    const result: Ticket[] = yield call(getTickets);
    yield put(actions.getTicketsSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

function* unassginTicketSaga(action: any) {
  const { callback } = action.payload;
  try {
    yield call(unAssignTicket, action.payload.ticketId);
    yield put(actions.unassignTicketSuccess());
    const result: Ticket[] = yield call(getTickets);
    yield put(actions.getTicketsSuccess(result));
    callback(result);
  } catch (error) {
    console.error(error);
  }
}

export function* ticketSaga() {
  yield takeEvery(Types.GET_TICKETS_REQUEST, fetchTickets);
  yield takeEvery(Types.GET_SINGLE_TICKET_REQUEST, fetchTicket);
  yield takeEvery(Types.CREATE_TICKET_REQUEST, createTicketSaga);
  yield takeEvery(Types.COMPLETE_TICKET_REQUEST, completeTicketSaga);
  yield takeEvery(Types.INCOMPLETE_TICKET_REQUEST, incompleteTicketSaga);
  yield takeEvery(Types.ASSIGN_TICKET_REQUEST, assignTicketSaga);
  yield takeEvery(Types.UNASSIGN_TICKET_REQUEST, unassginTicketSaga);
}
