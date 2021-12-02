/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { TableQueryParams } from '../../types/table-query-params';
import { TopCustomersModel } from '../../types/top-customers';
import { setTopCustomersAction } from '../ducks/topCustomersDuck';

export function* getTopCustomersSaga({
    params,
  callbacks,
}: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: TopCustomersModel = yield axiosInstance.get("/customer/get_top_customers", {params});
    yield put(setTopCustomersAction(res));
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
