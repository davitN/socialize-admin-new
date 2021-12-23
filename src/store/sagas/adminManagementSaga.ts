/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { TableQueryParams } from '../../types/table';
import { AdminModel, AdminTableModel } from '../../types/admin';
import { setAdminManagementsAction } from '../ducks/adminManagementDuck';

export function* getAdminManagementSaga({
                                          params,
                                          callbacks,
                                        }: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: AdminTableModel = yield axiosInstance.get("/admin_management/get_admins", { params });
    yield put(setAdminManagementsAction(res));
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

export function* getSelectedAdminManagementSaga({ id, callbacks }: {
  id: string
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: AdminModel = yield axiosInstance.get(`/admin_management/get/${id}`);
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

export function* saveAdminManagementSaga({ data, callbacks }: {
  data: AdminModel;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    console.log(data);
    yield axiosInstance.post("admin_management/create_admin", data);
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

export function* putAdminManagementSaga({
                                          id,
                                          data,
                                          callbacks,
                                        }: {
  id: string;
  data: AdminModel;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    yield axiosInstance.put(`admin_management/edit/${id}`, data);
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
