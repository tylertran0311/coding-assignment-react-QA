import styled from 'styled-components';

interface StatusProps {
  completed: boolean;
}

export const TicketsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TicketStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 21%;
  border: 1px solid #111111;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 20px;
  width: 21%;
  overflow-wrap: break-word;
  cursor: pointer;
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const TicketDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TicketTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

export const TicketDesc = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-break: auto;
`;

export const TicketAssignee = styled.div``;

export const Status = styled.div<StatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => (props.completed ? `#219653` : `#EB5757`)};
  font-weight: 600;
  font-size: 16px;

  width: min-content;
  height: 25px;
  padding: 5px 10px;
  border-radius: 18px;
  background-color: ${(props) => (props.completed ? `#d3eadd` : `#e6d0d0`)};
`;

export const IconContainer = styled.div`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
`;

export const AddTicketContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const FormStyled = styled.form`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
