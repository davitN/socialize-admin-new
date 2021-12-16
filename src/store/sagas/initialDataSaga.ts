/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { setInitialDataAction } from '../ducks/initialDataDuck';
import { InitialDataModel } from '../../types/initial-data';

export function* getInitialDataSaga({
  callbacks,
}: {
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: InitialDataModel = yield axiosInstance.get("/initial/get_initial_data");
    yield put(setInitialDataAction(res));
    callbacks?.success && callbacks.success(res);
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
