import { Ticket } from '@acme/shared-models';
import { Types } from './types';

export const getTicketsRequest = () => ({
  type: Types.GET_TICKETS_REQUEST,
});

export const getTicketsSuccess = (tickets: Ticket[]) => ({
  type: Types.GET_TICKETS_SUCCESS,
  payload: { tickets },
});

export const getSingleTicketsSuccess = (ticket: Ticket) => ({
  type: Types.GET_SINGLE_TICKET_SUCCESS,
  payload: { ticket },
});

export const createTicketSuccess = () => ({
  type: Types.CREATE_TICKET_SUCCESS,
});

export const completeTicketSuccess = () => ({
  type: Types.COMPLETE_TICKET_SUCCESS,
});

export const incompleteTicketSuccess = () => ({
  type: Types.INCOMPLETE_TICKET_SUCCESS,
});

export const assignTicketSuccess = () => ({
  type: Types.ASSIGN_TICKET_SUCCESS,
});

export const unassignTicketSuccess = () => ({
  type: Types.UNASSIGN_TICKET_SUCCESS,
});
