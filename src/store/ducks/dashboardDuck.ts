import { AnyAction } from 'redux';
import { DashboardData, InitialState } from '../../types/dashboard';
import { CallBacks } from '../../types/main';

export const GET_DASHBOARD_DATA_SG = "socialize/main/getDashboardData_sg";
export const SET_DASHBOARD_DATA = "socialize/main/setDashboardData";

const initialState: InitialState = {
  dashboardData: null
};

export const dashboardReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: (payload as DashboardData),
      };
    default:
      return state;
  }
};

export const setDashboardDataAction = (data: DashboardData) => ({
  type: SET_DASHBOARD_DATA,
  payload: data,
});

export const getDashboardDataActionSG = (callbacks?: CallBacks) => ({
  type: GET_DASHBOARD_DATA_SG,
  callbacks,
});
