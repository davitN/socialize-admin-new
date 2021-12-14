import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { TableQueryParams } from '../../types/table';
import { CompanyModel } from '../../types/company';

export const SAVE_COMPANY = "socialize/main/saveCompany";
export const PUT_COMPANY = "socialize/main/putCompany";
export const GET_COMPANIES_SG = "socialize/main/getCompanies_sg";
export const SET_COMPANIES = "socialize/main/setCompanies";

const initialState: { companiesData: CompanyModel[] } = {
  companiesData: []
};

export const companyReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_COMPANIES:
      return {
        ...state,
        companiesData: (payload as CompanyModel[]),
      };
    default:
      return state;
  }
};

export const setCompaniesAction = (companies: CompanyModel[]) => ({
  type: SET_COMPANIES,
  payload: companies,
});

export const getCompaniesActionSG = (params: TableQueryParams, callbacks?: CallBacks) => ({
  params,
  type: GET_COMPANIES_SG,
  callbacks,
});

export const saveCompanyAction = (data: CompanyModel, callbacks?: CallBacks) => ({
  type: SAVE_COMPANY,
  data,
  callbacks
});

export const putCompanyAction = (id: string, data: CompanyModel, callbacks?: CallBacks) => ({
  type: PUT_COMPANY,
  id,
  data,
  callbacks
});
