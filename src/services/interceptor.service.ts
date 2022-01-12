import axios, { AxiosError, AxiosResponse } from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
// import notificationService from './notification.service';
// import loader from './loader.service';
import { backendUrl } from './credentials.service';
import storeRegistry from '../store/storeRegistry';
import { resetStoreAction } from '../store/ducks/mainDuck';
// import navigationService, {_navigator} from './navigation.service';

declare module 'axios' {
  export interface AxiosRequestConfig {
    removeLoader?: boolean;
  }
}


let counter = 0;

const axiosInstance = axios.create({
  baseURL: `${backendUrl}`,
});

axiosInstance.interceptors.request.use(
  async (request) => {

    if (++counter < 2 && !request.removeLoader) {
      // loader.show();
    }
    const token = await localStorage.getItem('token');
    if (token) {
      if (request.headers) {
        request.headers.Authorization = `Bearer ${token}`;
      } else {
        request.headers = { Authorization: `Bearer ${token}` };
      }
    }
    return request;
  },
  (error) => {

    // loader.hide();
    return Promise.reject({ ...error });
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return onResponseFulfilled(response);
  },
  (error) => {
    return onResponseRejected(error);
  }
);

const onResponseFulfilled = (response: AxiosResponse) => {
  if (--counter < 1) {
    // loader.hide();
  }
  return response.data;
};

const onResponseRejected = (error: AxiosError) => {
  if (--counter < 1) {
    // loader.hide();
  }
  if (!error.response) {
    // notificationService.notify('warning', 'Warning', 'no internet connection');
    return Promise.reject({ ...error });
  }
  if (error.response.status === 408 || error.response.status === 504) {
    // notificationService.notify(
    //   'error',
    //   'error #' + error.response.status,
    //   'request timed out',
    // );
  } else if (error.response.status === 404 || error.response.status === 504) {
    // notificationService.notify('error', 'Not Found');
  } else if (error.response.status === 500) {
    // notificationService.notify('error', 'Internal Server Error');
  }
  if (
    error.response.status === 401 ||
    error.response.status === 404 ||
    error.response.status === 403
  ) {
    console.log(error);
    localStorage.setItem('authData', '');
    storeRegistry?.getStore().dispatch(resetStoreAction());
  }
  return Promise.reject({ ...error });
};

export default axiosInstance;
