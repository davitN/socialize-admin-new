/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { setDashboardDataAction } from '../ducks/dashboardDuck';
import { notifyAction } from '../ducks/mainDuck';
import { DashboardData } from '../../types/dashboard';

export function* getDashboardDataSaga({
  placeId,
  callbacks,
}: {
  placeId: string
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const params = {placeId}
    const res: DashboardData = yield axiosInstance.get(`/dashboard/get_dashboard`, {params});
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
