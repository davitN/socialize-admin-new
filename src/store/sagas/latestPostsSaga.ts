/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { TableQueryParams } from '../../types/table';
import { setLatestPostsAction } from '../ducks/latestPostsDuck';
import { LatestPostsModel } from '../../types/latest-posts';
import { PostModel } from '../../types/dashboard';

export function* getLatestPostsSaga({
                                      params,
                                      callbacks,
                                    }: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: LatestPostsModel = yield axiosInstance.get("/post/get_latest_posts", { params });
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

export function* getLatestPostSaga({ postId, callbacks, }: {
  postId: string;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: PostModel = yield axiosInstance.get(`/post/get_post_details/${postId}`);
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

export function* deleteLatestPostSaga({ postId, callbacks, }: {
  postId: string;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: PostModel = yield axiosInstance.delete(`/post/delete/${postId}`);
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


