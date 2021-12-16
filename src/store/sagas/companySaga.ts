/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { TableQueryParams } from '../../types/table';
import { setCompaniesAction, setCompanySubscriptionAction } from '../ducks/companyDuck';
import { CompanyModel, CompanySubscriptionModel, CompanyTableModel } from '../../types/company';

export function* getCompaniesSaga({
                                    params,
                                    callbacks,
                                  }: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: CompanyTableModel = yield axiosInstance.get("/company/get_companies", { params });
    yield put(setCompaniesAction(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message);
    yield put(
        notifyAction({
          type: 'error',
          message: error.response?.data.message,
          showError: false,
        })
    );
  }
}

export function* getCompanySubscriptionsSaga({ companyId, callbacks }: {
  companyId: string
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: CompanySubscriptionModel[] = yield axiosInstance.get(`/company/get/${companyId}`);
    yield put(setCompanySubscriptionAction(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message);
    yield put(
        notifyAction({
          type: 'error',
          message: error.response?.data.message,
          showError: false,
        })
    );
  }
}

export function* saveCompanySaga({ data, callbacks }: {
  data: CompanyModel;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    console.log(data);
    yield axiosInstance.post("company/create_company", data);
    // yield put(setLatestPostsAction(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message);
    yield put(
        notifyAction({
          type: 'error',
          message: error.response?.data.message,
          showError: false,
        })
    );
  }
}

export function* putCompanySaga({
                                  id,
                                  data,
                                  callbacks,
                                }: {
  id: string;
  data: CompanyModel;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    yield axiosInstance.put(`company/edit_company/${id}`, data);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message);
    yield put(
        notifyAction({
          type: 'error',
          message: error.response?.data.message,
          showError: false,
        })
    );
  }
}
