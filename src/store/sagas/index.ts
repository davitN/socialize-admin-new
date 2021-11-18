import { all, takeLatest } from "redux-saga/effects";
import { SET_DEVICE_TOKEN } from "../ducks/mainDuck";
import { checkSignedInSaga, setDeviceTokenSaga } from "./mainSaga";
import { logoutSaga, signInSaga, signUpSaga } from "./authSaga";
import { CHECK_SIGNED_IN, LOGOUT, REQUEST_SIGN_IN_SG, REQUEST_SIGN_UP_SG } from "../ducks/authDuck";

function* actionWatcher() {
  yield takeLatest(CHECK_SIGNED_IN, checkSignedInSaga);
  yield takeLatest(SET_DEVICE_TOKEN, setDeviceTokenSaga);
  yield takeLatest(REQUEST_SIGN_IN_SG, signInSaga);
  yield takeLatest(REQUEST_SIGN_UP_SG, signUpSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
