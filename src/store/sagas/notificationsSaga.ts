/* eslint-disable @typescript-eslint/no-explicit-any */

import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import {
  NotificationsDetailModel,
  NotificationsModel,
  NotificationsSendModel,
} from '../../types/notifications';
import { TableQueryParams } from '../../types/table';
import { notifyAction } from '../ducks/mainDuck';
import { setNotificationsAciton } from '../ducks/notificationsDuck';

export function* getNotificationsSaga({
  params,
  callbacks,
}: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: NotificationsModel = yield axiosInstance.get(
      '/notification/get_sent_notifications',
      { params }
    );
    yield put(setNotificationsAciton(res));
    callbacks?.success && callbacks.success();
  } catch (err: any) {
    callbacks?.error && callbacks.error(err.response?.data.message);
    yield put(
      notifyAction({
        type: 'error',
        message: err.response?.data.message,
        showError: false,
      })
    );
  }
}

export function* postNotificationsSaga({
  data,
  callbacks,
}: {
  data: NotificationsSendModel;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: NotificationsModel = yield axiosInstance.post(
      '/notification/send_notifications',
      data
    );
    yield put(setNotificationsAciton(res));
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

export function* getSelectedNotificationsSaga({
  id,
  callbacks,
}: {
  id: string;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: NotificationsDetailModel = yield axiosInstance.get(
      `/notification/get_sent_notification_by_id/${id}`
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
