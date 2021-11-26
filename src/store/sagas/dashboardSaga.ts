/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks, IUserData } from '../../types/main';
import { setDashboardDataAction } from '../ducks/dashboardDuck';
import { notifyAction } from '../ducks/mainDuck';

export function* getDashboardDataSaga({
  callbacks,
}: {
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: IUserData = yield axiosInstance.get("/dashboard/get_dashboard");
    console.log(res);
    yield put(setDashboardDataAction(res));
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
