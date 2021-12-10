/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { VenueSendModel, VenueStateModel } from '../../types/venue';
import { TableQueryParams } from '../../types/table';
import { setVenuesAction } from '../ducks/VenueDuck';

export function* getVenuesSaga({ params, callbacks }: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: VenueStateModel[] = yield axiosInstance.get("/place/get_places", { params });
    yield put(setVenuesAction(res));
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

export function* saveVenueSaga({ data, callbacks }: {
  data: VenueSendModel;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    console.log(data);
    const formData = new FormData();
    formData.append('data', JSON.stringify(data.data));
    formData.append('logo', data.logo);
    formData.append('cover', data.cover);
    formData.append('coverThumbnail', data.coverThumbnail);
    yield axiosInstance.post("place/create_place", formData);
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

export function* putVenueSaga({ id, data, callbacks }: {
  id: string
  data: VenueSendModel,
  callbacks: CallBacks,
  type: string
}) {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data.data));
    if (data.logo) {
      formData.append('logo', data.logo);
    }
    if (data.cover) {
      formData.append('cover', data.cover);
    }
    if (data.coverThumbnail) {
      formData.append('coverThumbnail', data.coverThumbnail);
    }
    yield axiosInstance.put(`place/edit/${id}`, formData);
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

