/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { CallBacks } from '../../types/main';
import { notifyAction } from '../ducks/mainDuck';
import { VenueSendModel, VenueStateModel } from '../../types/venue';
import { TableQueryParams } from '../../types/table';
import { setCompaniesAction } from '../ducks/companyDuck';
import { CompanyModel } from '../../types/company';

export function* getCompaniesSaga({ params, callbacks }: {
  params: TableQueryParams;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    const res: VenueStateModel[] = yield axiosInstance.get("/company/get_companies", { params });
    yield put(setCompaniesAction(res));
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

export function* saveCompanySaga({ data, callbacks }: {
  data: CompanyModel;
  callbacks: CallBacks;
  type: string;
}) {
  try {
    console.log(data);
    yield axiosInstance.post("company/create_company", data);
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

export function* putCompanySaga({ id, data, callbacks }: {
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

