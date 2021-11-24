import { AnyAction } from "redux";
import { CallBacks } from "../../types/main";

export const GET_DASHBOARD_DATA_SG = "socialize/auth/getDashboardData_sg";
export const SET_DASHBOARD_DATA = "socialize/auth/setDashboardData";

const initialState: any = {
  dashboard: {},
};

export const dashboardReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: payload,
      };
    default:
      return state;
  }
};

export const setDashboardDataAction = (data: any) => ({
  type: SET_DASHBOARD_DATA,
  payload: data,
});

export const getDashboardDataActionSG = (callbacks?: CallBacks) => ({
  type: GET_DASHBOARD_DATA_SG,
  callbacks,
});
