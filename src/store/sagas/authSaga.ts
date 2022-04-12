/* eslint-disable @typescript-eslint/no-explicit-any */
import { put } from 'redux-saga/effects';
import axiosInstance from '../../services/interceptor.service';
import { AuthState, ISignInData, ISignUpData } from '../../types/auth';
import { CallBacks, IUserData } from '../../types/main';
import { UserProfileSendModel } from '../../types/profile';
import { logoutActionSG, setUserDataAction } from '../ducks/authDuck';
import {
  checkedSignedInAction,
  DEFAULT,
  defaultAction,
  notifyAction,
  resetStoreAction,
} from '../ducks/mainDuck';

export function* signInSaga({
  data,
  callbacks,
}: {
  data: ISignInData;
  callbacks?: CallBacks;
  type: string;
}) {
  try {
    const res: IUserData = yield axiosInstance.post(
      'authorization/verify_user',
      {
        email: data.email,
        password: data.password,
      }
    );
    localStorage.setItem('token', res.accessToken);
    yield put(setUserDataAction(res));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message);
    yield put(
      notifyAction({
        type: 'error',
        message: error.response?.data?.message,
        showError: true,
      })
    );
    yield put(defaultAction());
  }
}

export function* summitSignInOTP_Saga(payload: {
  code: string;
  callbacks?: CallBacks;
  type: string;
}) {
  const { code, callbacks } = payload;
  try {
    const res: IUserData = yield axiosInstance.post('authorization/sign_in', {
      code: code,
    });
    localStorage.setItem('token', res.accessToken);
    yield put(setUserDataAction(res));
    yield put(checkedSignedInAction(true));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error(error.response?.data.message);
    yield put(
      notifyAction({
        type: 'error',
        message: error.response?.data?.message,
        showError: true,
      })
    );
    yield put(defaultAction());
  }
}

export function* signUpSaga(payload: {
  data: ISignUpData;
  callback: Function;
  type: string;
}) {
  try {
    // const res: IUserData = yield axiosInstance.put('registration/register', {
    //   OS: Platform.OS,
    //   // deviceToken: pushNotificationData.token,
    // });
    const res: IUserData = yield axiosInstance.post(
      'registration/register',
      payload.data
    );
    // yield notifyAction(
    //   'success',
    //   'Success',
    //   'You have registered Successfully',
    // );
    // setMonitoringUsername(res.username);
    // yield AsyncStorage.setItem("token", res.accessToken);
    yield put(setUserDataAction(res));
    payload.callback();
  } catch (error: any) {
    yield put(
      notifyAction({
        type: 'error',
        message: error.response?.data.message,
        showError: true,
      })
    );
  } finally {
    yield put({ type: DEFAULT });
  }
}

export function* changePasswordSaga(payload: {
  userData: UserProfileSendModel;
  callback: CallBacks;
  type: string;
}) {
  const { userData, callback } = payload;
  try {
    yield axiosInstance.put('/account/change_password', userData);
    yield put(
      notifyAction({
        type: 'success',
        message: 'Password changed succsessfully',
      })
    );
    callback?.success && callback.success();
  } catch (error: any) {
    yield put(
      notifyAction({
        type: 'error',
        message: error.response?.data?.message,
        showError: true,
      })
    );
    callback?.error && callback.error(error);
  }
}

export function* logoutSaga() {
  try {
    // yield axiosInstance.delete('auth/sign_out');
    // yield AsyncStorage.removeItem("token");
    localStorage.removeItem('token');
    yield put(logoutActionSG());
    yield put(resetStoreAction());
  } catch (error) {
    // yield notifyAction("error", "Error", "Something went wrong", true);
  }
}

export function* resetPasswordSaga({
  email,
  callback,
}: {
  email: string;
  callback: CallBacks;
  type: string;
}) {
  try {
    yield axiosInstance.post('/account/reset_password/', { email });
    callback?.success && callback.success();
  } catch (err: any) {
    callback?.error && callback.error(err.response?.data.message);
    yield put(
      notifyAction({
        type: 'error',
        message: err.response?.data?.message,
        showError: true,
      })
    );
  }
}

export function* recoverPasswordSaga({
  password,
  token,
  callback,
}: {
  password: string;
  token: string;
  callback: CallBacks;
  type: string;
}) {
  try {
    localStorage.removeItem('token');
    yield axiosInstance.put(
      '/account/password_recover',
      { password },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    callback?.success && callback.success();
  } catch (err: any) {
    console.log(token);
    callback?.error && callback.error(err.response?.data.message);
    yield put(
      notifyAction({
        type: 'error',
        message: err.response?.data?.message,
        showError: true,
      })
    );
  }
}

export function* attachUserSaga({phone, callback}: {phone: string, callback: CallBacks, type: string}) {
  try {
    yield axiosInstance.put('/account/attach_user_to_admin', {phone});
    callback?.success && callback.success();
  } catch (err: any) {
    callback?.error && callback.error(err.response?.data.message);
  }
} 

export function* getAccountDetailsSaga({callback}: {callback: CallBacks, type: string}) {
  try {
    const res: AuthState = yield axiosInstance.get('/account/get');
    callback?.success && callback.success(res);
  } catch (err: any) {
    callback?.error && callback.error(err.response?.data.message);
  }
}
