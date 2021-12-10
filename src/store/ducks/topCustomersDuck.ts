import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { TableQueryParams } from '../../types/table';
import { TopCustomersModel } from '../../types/top-customers';

export const GET_TOP_CUSTOMERS_SG = "socialize/main/getTopCustomers_sg";
export const SET_TOP_CUSTOMERS = "socialize/main/setTopCustomers";

const initialState: { topCustomers: TopCustomersModel } = {
  topCustomers: {
    count: null,
    data: []
  }
};

export const topCustomersReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_TOP_CUSTOMERS:
      return {
        ...state,
        topCustomers: (payload as TopCustomersModel),
      };
    default:
      return state;
  }
};

export const setTopCustomersAction = (topCustomers: TopCustomersModel) => ({
  type: SET_TOP_CUSTOMERS,
  payload: topCustomers,
});

export const getTopCustomersActionSG = (params: TableQueryParams, callbacks?: CallBacks) => ({
  params,
  type: GET_TOP_CUSTOMERS_SG,
  callbacks,
});
