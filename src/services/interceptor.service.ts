import axios, { AxiosError, AxiosResponse } from "axios";
// import AsyncStorage from '@react-native-community/async-storage';
// import notificationService from './notification.service';
// import loader from './loader.service';
import { backendUrl } from "./credentials.service";
import storeRegistry from "../store/storeRegistry";
import { resetStoreAction } from "../store/ducks/mainDuck";
// import navigationService, {_navigator} from './navigation.service';

declare module "axios" {
  export interface AxiosRequestConfig {
    removeLoader?: boolean;
  }
}

let canNotPressBackButton = false;
let counter = 0;

const axiosInstance = axios.create({
  baseURL: `${backendUrl}`,
});

axiosInstance.interceptors.request.use(
  async (request) => {
    canNotPressBackButton = true;
    if (++counter < 2 && !request.removeLoader) {
      // loader.show();
    }
    const token = await localStorage.getItem("token");
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
    canNotPressBackButton = false;
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
  canNotPressBackButton = false;
  if (--counter < 1) {
    // loader.hide();
  }
  return response.data;
};

const onResponseRejected = (error: AxiosError) => {
  canNotPressBackButton = false;
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
  if (error.response.status === 401 || error.response.status === 404 || error.response.status === 403) {
    if (
      true
      // navigationService.getCurrentRoute()?.name !== 'Ping' &&
      // navigationService.getCurrentRoute()?.name !== 'EnableNotifications' &&
      // navigationService.getCurrentRoute()?.name !== 'EnableLocation' &&
      // navigationService.getCurrentRoute()?.name !== 'EnterPassword'
    ) {
      // _navigator?.current?.resetRoot();
      localStorage.setItem("authData", "");
      storeRegistry?.getStore().dispatch(resetStoreAction());
    }
  }
  return Promise.reject({ ...error });
};

export default axiosInstance;
