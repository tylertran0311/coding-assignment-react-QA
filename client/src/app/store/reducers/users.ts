import { Types } from '../actions/types';

const initialState = {
  users: [],
};

export const usersReducer = (
  state = initialState,
  action: { type: any; payload: { users: any } }
) => {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users.data,
      };
    default:
      return state;
  }
};
