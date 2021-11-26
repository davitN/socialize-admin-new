import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';

<<<<<<< HEAD
export const GET_INITIAL_ROLES_SG = "socialize/main/getInitialRoles_sg";
export const SET_INITIAL_ROLES_DATA = "socialize/main/setInitialRoles";
=======
export const GET_DASHBOARD_DATA_SG = 'socialize/auth/getDashboardData_sg';
export const SET_DASHBOARD_DATA = 'socialize/auth/setDashboardData';
>>>>>>> 02a7af8ddadb6797b6657b28f3bf501e469a68e7

export const GET_DASHBOARD_DATA_SG = "socialize/main/getDashboardData_sg";
export const SET_DASHBOARD_DATA = "socialize/main/setDashboardData";


const initialState: {dashboardData: DashboardDataModel, initialRoles: any} = {
  dashboardData: {
    newCustomersInThisMonth: null,
    totalCustomersInThisMonth: null,
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
};

interface DashboardDataModel {
  newCustomersInThisMonth: number,
  totalCustomersInThisMonth: number,
  topCustomers: Array<{
    _id: string,
    isRealInfoHidden: boolean,
    visitsCount: number,
    lastVisitingTime: string,
    username: string,
    postsCount: number,
    viewsOnPosts: number
  }>,
  latestPosts: Array<{
    _id: string,
    username: string,
    createdAt: string,
    commentsCount: number,
    viewsCount: number,
    customerType: string
  }>,
  companySubscription: {
    _id: string,
    name: string,
    description: string,
    __v: number,
    ordering: number
  },
  customerTrendsThrowYear: Array<{
    firstTimeVisitor: number,
    secondTimeVisitor: number,
    regular: number,
    visitYearMonthDate: string
  }>
}

export const dashboardReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: payload,
      };
    case SET_INITIAL_ROLES_DATA:
      return {
        ...state,
        initialRoles: payload,
      };
    default:
      return state;
  }
};

export const setInitialRolesAction = (data: any) => ({
  type: SET_INITIAL_ROLES_DATA,
  payload: data,
});

export const getInitialRolesActionSG = (callbacks?: CallBacks) => ({
  type: GET_INITIAL_ROLES_SG,
  callbacks,
});

export const setDashboardDataAction = (data: any) => ({
  type: SET_DASHBOARD_DATA,
  payload: data,
});

export const getDashboardDataActionSG = (callbacks?: CallBacks) => ({
  type: GET_DASHBOARD_DATA_SG,
  callbacks,
});
