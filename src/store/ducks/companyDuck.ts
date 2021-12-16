import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { TableQueryParams } from '../../types/table';
import { CompanyModel, CompanySubscriptionModel, CompanyTableModel } from '../../types/company';

export const SAVE_COMPANY = 'socialize/main/saveCompany';
export const PUT_COMPANY = 'socialize/main/putCompany';
export const GET_COMPANIES_SG = 'socialize/main/getCompanies_sg';
export const GET_COMPANY_SUBSCRIPTION_SG = 'socialize/main/getCompanySubscriptions_sg';
export const SET_COMPANIES = 'socialize/main/setCompanies';
export const SET_SUBSCRIPTIONS = 'socialize/main/setCompanySubscriptions';

const initialState: { companiesData: CompanyTableModel, companySubscriptionData: CompanySubscriptionModel[] } = {
  companiesData: {
    count: 0,
    data: [],
  },
  companySubscriptionData: []
};

export const companyReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_COMPANIES:
      return {
        ...state,
        companiesData: payload as CompanyTableModel,
      };
    case SET_SUBSCRIPTIONS:
      return {
        ...state,
        companySubscriptionData: payload as CompanySubscriptionModel[],
      };
    default:
      return state;
  }
};

export const setCompaniesAction = (companies: CompanyTableModel) => ({
  type: SET_COMPANIES,
  payload: companies,
});

export const setCompanySubscriptionAction = (subscriptions: CompanySubscriptionModel[]) => ({
  type: SET_SUBSCRIPTIONS,
  payload: subscriptions,
});

export const getCompaniesActionSG = (
  params: TableQueryParams,
  callbacks?: CallBacks
) => ({
  params,
  type: GET_COMPANIES_SG,
  callbacks,
});

export const getCompanySubscriptionActionSG = (
    companyId: string,
    callbacks?: CallBacks
) => ({
  type: GET_COMPANY_SUBSCRIPTION_SG,
  companyId,
  callbacks,
});

export const saveCompanyAction = (
  data: CompanyModel,
  callbacks?: CallBacks
) => ({
  type: SAVE_COMPANY,
  data,
  callbacks,
});

export const putCompanyAction = (
  id: string,
  data: CompanyModel,
  callbacks?: CallBacks
) => ({
  type: PUT_COMPANY,
  id,
  data,
  callbacks,
});
