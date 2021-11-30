import { AnyAction } from 'redux';
import { DashboardData, InitialState } from '../../types/dashboard/index.d';
import { CallBacks } from '../../types/main';

export const GET_DASHBOARD_DATA_SG = "socialize/main/getDashboardData_sg";
export const SET_DASHBOARD_DATA = "socialize/main/setDashboardData";

<<<<<<< HEAD

const initialState: {dashboardData: DashboardDataModel, initialRoles: any} = {
  dashboardData: {
    newCustomersInThisMonth: null,
    totalCustomersInThisMonth: null,
    totalVisitsCount: null,
    totalVisitorsCount: null,
    topCustomers: [],
    latestPosts: [],
    companySubscription: {
      __v: null,
      ordering: null,
      name: '',
      description: '',
      _id: ''
    },
    customerTrendsThrowYear: []
  },
  initialRoles: []
=======
const initialState: InitialState = {
  dashboardData: null
>>>>>>> bd0c17f552d5293d6c4af43b4ecba552e2de855c
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
