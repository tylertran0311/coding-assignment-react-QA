import { User } from '@acme/shared-models';
import { Types } from './types';

export const getUsersSuccess = (users: User[]) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: { users },
});
