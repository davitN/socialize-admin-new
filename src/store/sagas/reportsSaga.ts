/* eslint-disable @typescript-eslint/no-explicit-any */

import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { ReportsModel } from '../../types/reports';
import { TableQueryParams } from '../../types/table';
import { notifyAction } from '../ducks/mainDuck';
import { setReportsAction } from '../ducks/reportsDuck';

export function* getReportedPostsSaga({
  params,
  callbacks,
}: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: ReportsModel = yield axiosInstance.get(
      '/report/get_reported_posts',
      { params }
    );
    yield put(setReportsAction(res));
    callbacks?.success && callbacks.success(res);
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

export function* getReportedCommentsSaga({
  params,
  callbacks,
}: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: ReportsModel = yield axiosInstance.get(
      '/report/get_reported_post_comments',
      { params }
    );
    yield put(setReportsAction(res));
    callbacks?.success && callbacks.success(res);
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
