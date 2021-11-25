import { all, takeLatest } from "redux-saga/effects";
import { SET_DEVICE_TOKEN } from "../ducks/mainDuck";
import { checkSignedInSaga, setDeviceTokenSaga } from "./mainSaga";
import { logoutSaga, signInSaga, signUpSaga, summitSignInOTP_Saga } from "./authSaga";
import { CHECK_SIGNED_IN, LOGOUT, REQUEST_SIGN_IN_SG, REQUEST_SIGN_UP_SG, SUBMIT_SIGN_IN_OTP_SG } from "../ducks/authDuck";
import { GET_DASHBOARD_DATA_SG } from "../ducks/dashboardDuck";
import { getDashboardDataSaga } from "./dashboardSaga";

function* actionWatcher() {
  yield takeLatest(CHECK_SIGNED_IN, checkSignedInSaga);
  yield takeLatest(SET_DEVICE_TOKEN, setDeviceTokenSaga);
  yield takeLatest(REQUEST_SIGN_IN_SG, signInSaga);
  yield takeLatest(SUBMIT_SIGN_IN_OTP_SG, summitSignInOTP_Saga);
  yield takeLatest(REQUEST_SIGN_UP_SG, signUpSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_DASHBOARD_DATA_SG, getDashboardDataSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
