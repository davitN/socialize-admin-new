/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { TableQueryParams } from '../../types/table-query-params';
import { setLatestPostsAction } from '../ducks/latestPostsDuck';
import { LatestPostsModel } from '../../types/latest-posts';

export function* getLatestPostsSaga({
    params,
  callbacks,
}: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: LatestPostsModel = yield axiosInstance.get("/post/get_latest_posts", {params});
    yield put(setLatestPostsAction(res));
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
