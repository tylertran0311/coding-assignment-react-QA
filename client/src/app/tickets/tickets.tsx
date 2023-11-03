import { Ticket, User } from '@acme/shared-models';
import AddIcon from 'client/src/assets/icons/AddIcon';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Types } from '../store/actions/types';
import {
  AddTicketContainer,
  FormStyled,
  IconContainer,
  Status,
  TicketAssignee,
  TicketDesc,
  TicketDetail,
  TicketHeader,
  TicketStyled,
  TicketTitle,
  TicketsContainer,
} from './tickets-styled';
import { RootState } from '../store/store';

export function Tickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([] as User[]);
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [isCreateTicket, setIsCreateTicket] = useState(false);
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const { ticket } = useSelector((state: RootState) => state.ticketsReducer);

  const getAssignee = useCallback(
    (assigneeId: number | null) => {
      const user: User | undefined = users.find(
        (user) => user.id === assigneeId
      );
      return user ? user.name : 'None';
    },
    [tickets]
  );

  const handleUserCallback = (response: any) => {
    setUsers(response.data);
  };

  const handleTicketCallback = (response: any) => {
    setTickets(response.data);
  };

  const handleTicketClick = (id: number) => {
    navigate({ pathname: `/${id}` });
  };

  const handleCreateTicketClick = () => {
    setIsCreateTicket(!isCreateTicket);
  };

  const handleSubmitCreateTicket = () => {
    dispatch({
      type: Types.CREATE_TICKET_REQUEST,
      payload: {
        callback: handleTicketCallback,
        description: newTicketDesc,
      },
    });
    setIsCreateTicket(false);
    setNewTicketDesc('');
  };

  const handleStatusTicketClick =
    (ticketId: number, completed: boolean) =>
    (e: React.MouseEvent<Element, MouseEvent>): void => {
      e.preventDefault();
      e.stopPropagation();
      completed
        ? dispatch({
            type: Types.INCOMPLETE_TICKET_REQUEST,
            payload: { callback: handleTicketCallback, ticketId: ticketId },
          })
        : dispatch({
            type: Types.COMPLETE_TICKET_REQUEST,
            payload: { callback: handleTicketCallback, ticketId: ticketId },
          });
    };

  const handleAssigneeTicketClick =
    () =>
    (e: React.MouseEvent<Element, MouseEvent>): void => {
      e.preventDefault();
      e.stopPropagation();
    };

  const handleAssigneeChange = (
    e: ChangeEvent<HTMLSelectElement>,
    ticketId: number
  ) => {
    e.target.value.length
      ? dispatch({
          type: Types.ASSIGN_TICKET_REQUEST,
          payload: {
            callback: handleTicketCallback,
            ticketId: ticketId,
            assigneeId: +e.target.value,
          },
        })
      : dispatch({
          type: Types.UNASSIGN_TICKET_REQUEST,
          payload: { callback: handleTicketCallback, ticketId: ticketId },
        });
  };

  useEffect(() => {
    dispatch({
      type: Types.GET_USERS_REQUEST,
      payload: { callback: handleUserCallback },
    });
    dispatch({
      type: Types.GET_TICKETS_REQUEST,
      payload: { callback: handleTicketCallback },
    });
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      <AddTicketContainer>
        <p>ADD TICKET</p>
        <IconContainer onClick={() => handleCreateTicketClick()}>
          <AddIcon />
        </IconContainer>
      </AddTicketContainer>
      {isCreateTicket && (
        <FormStyled onSubmit={handleSubmitCreateTicket}>
          <label>Please enter description:</label>
          <input
            type="text"
            id="desc"
            name="desc"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTicketDesc(e.target.value)
            }
          />
          <input type="submit" />
        </FormStyled>
      )}
      {tickets.length && !ticket.loading ? (
        <TicketsContainer>
          {tickets.map((t) => (
            <TicketStyled onClick={() => handleTicketClick(t.id)} key={t.id}>
              <TicketHeader>
                <TicketTitle>Ticket: {t.id}</TicketTitle>
                <Status
                  completed={t.completed}
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                    handleStatusTicketClick(t.id, t.completed)(e)
                  }
                >
                  {t.completed ? 'Completed' : 'Incomplete'}
                </Status>
              </TicketHeader>
              <TicketDetail>
                <TicketDesc>{t.description}</TicketDesc>
                <TicketAssignee>
                  <label>Assigned: </label>
                  <select
                    name="assignee"
                    id="assignee-select"
                    onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                      handleAssigneeTicketClick()(e)
                    }
                    defaultValue={t.assigneeId ? t.assigneeId.toString() : ''}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleAssigneeChange(e, t.id)
                    }
                  >
                    <option value="">Not Assigned</option>
                    {users.map((user) => (
                      <option value={user.id.toString()}>{user.name}</option>
                    ))}
                  </select>
                </TicketAssignee>
              </TicketDetail>
            </TicketStyled>
          ))}
        </TicketsContainer>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
