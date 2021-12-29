import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { TableQueryParams } from '../../types/table';
import { AppUsersDataModel, AppUsersModel } from '../../types/appUsers';

export const GET_APP_USERS_SG = 'socialize/main/getAppUsers_SG';
export const SET_APP_USERS = 'socialize/main/setAppUsers';
export const APP_USERS_VERIFY_SG = 'socialize/main/appUsersVerify_SG';
export const GET_SELECTED_APP_USER_SG = 'socialize/main/getSelectedAppUser_SG';

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

export const appUsersVerifyActionSG = (
  id: string,
  data: AppUsersDataModel,
  callbacks: CallBacks
) => ({
  type: APP_USERS_VERIFY_SG,
  id,
  data,
  callbacks,
});

export const getSelectedAppUserActionSG = (userId: string, callbacks: CallBacks) => ({
  type: GET_SELECTED_APP_USER_SG,
  userId,
  callbacks,
});
