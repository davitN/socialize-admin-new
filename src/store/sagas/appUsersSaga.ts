/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { TableQueryParams } from '../../types/table';
import { AppUsersDataModel, AppUsersModel } from '../../types/appUsers';
import { setAppUsersAction } from '../ducks/appUsersDuck';

export function* getAppUsersSaga({
  params,
  callbacks,
}: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: AppUsersModel = yield axiosInstance.get(
      '/app_user/get_app_users',
      { params }
    );
    yield put(setAppUsersAction(res));
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

export function* appUsersVerifySaga({
  callbacks,
  id,
  data,
}: {
  callbacks: CallBacks;
  id: string;
  data: AppUsersModel;
  type: string;
}) {
  try {
    const res: AppUsersModel = yield axiosInstance.put(
      `/app_user/verify/${id}`,
      data
    );
    yield put(setAppUsersAction(res));
    callbacks?.success && callbacks.success();
  } catch (err: any) {
    callbacks?.error && callbacks.error(err.response?.data.message);
    yield put(
      notifyAction({
        type: 'error',
        message: err.response?.data.message,
        showError: true,
      })
    );
  }
}

export function* getSelectedAppUserSaga({
  userId,
  callbacks,
}: {
  userId: string;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: AppUsersDataModel = yield axiosInstance.get(
      `/app_user/get/${userId}`
    );
    callbacks?.success && callbacks.success(res);
  } catch (err: any) {
    callbacks?.error && callbacks.error(err.response?.data.message);
    yield put(
      notifyAction({
        type: 'error',
        message: err.response?.data.message,
        showError: true,
      })
    );
  }
}
