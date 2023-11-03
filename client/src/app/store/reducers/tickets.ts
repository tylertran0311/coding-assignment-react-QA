import { Types } from '../actions/types';

const initialState = {
  tickets: [],
  ticket: {},
  loading: false,
};

export const ticketsReducer = (
  state = initialState,
  action: { type: any; payload: { tickets: any; ticket: any } }
) => {
  switch (action.type) {
    case Types.GET_TICKETS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.payload.tickets.data,
        loading: false,
      };
    case Types.GET_SINGLE_TICKET_SUCCESS:
      return {
        ...state,
        ticket: action.payload.ticket.data,
      };
    case Types.UNSET_TICKET_DETAIL:
      return {
        ...state,
        ticket: {},
      };
    default:
      return state;
  }
};
