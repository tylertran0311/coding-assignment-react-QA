import { useDispatch, useSelector } from 'react-redux';
import styles from './ticket-details.module.css';
import { ticketsReducer } from '../store/reducers/tickets';
import { RootState } from '../store/store';
import { Ticket, User } from '@acme/shared-models';
import { useEffect, useState } from 'react';
import { Types } from '../store/actions/types';
import {
  Status,
  TicketAssignee,
  TicketDesc,
  TicketTitle,
} from '../tickets/tickets-styled';
import { useLocation } from 'react-router-dom';

/* eslint-disable-next-line */

export function TicketDetails() {
  const [ticket, setTicket] = useState({} as Ticket);
  const { users } = useSelector((state: RootState) => state.usersReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const getAssignee = (assigneeId: number | null) => {
    const user: User | undefined = users.find(
      (user: User) => user.id === assigneeId
    );
    return user ? user.name : 'None';
  };

  const handleSingleTicketCallback = (response: any) => {
    setTicket(response.data);
  };

  useEffect(() => {
    dispatch({
      type: Types.GET_SINGLE_TICKET_REQUEST,
      payload: {
        callback: handleSingleTicketCallback,
        id: +location.pathname.substring(1),
      },
    });
  }, []);

  useEffect(
    () => () => {
      dispatch({ type: Types.UNSET_TICKET_DETAIL });
    },
    []
  );

  return (
    <div className={styles['container']}>
      <h1>Welcome to TicketDetails!</h1>
      {ticket.id ? (
        <div>
          <Status completed={ticket.completed}>
            {ticket.completed ? 'Completed' : 'Incomplete'}
          </Status>
          <TicketTitle>Ticket: {ticket.id}</TicketTitle>
          <TicketDesc>{ticket.description}</TicketDesc>
          <TicketAssignee>
            Assigned: {getAssignee(ticket.assigneeId)}
          </TicketAssignee>
        </div>
      ) : (
        <div>....</div>
      )}
    </div>
  );
}

export default TicketDetails;
