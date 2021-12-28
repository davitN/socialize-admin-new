import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { TableQueryParams } from '../../types/table';
import { AppUsersModel } from '../../types/appUsers';

export const GET_APP_USERS_SG = 'socialize/main/getAppUsers_SG';
export const SET_APP_USERS = 'socialize/main/setAppUsers';

const initialState: { appUsers: AppUsersModel } = {
  appUsers: {
    count: null,
    data: [],
  },
};

export const appUsersReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_USERS:
      return {
        ...state,
        appUsers: payload as AppUsersModel,
      };
    default:
      return state;
  }
};

export const setAppUsersAction = (appUsers: AppUsersModel) => ({
  type: SET_APP_USERS,
  payload: appUsers,
});

export const getAppUsersActionSG = (
  params: TableQueryParams,
  callbacks?: CallBacks
) => ({
  params,
  type: GET_APP_USERS_SG,
  callbacks,
});
