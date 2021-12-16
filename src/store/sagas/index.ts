import { all, takeLatest } from 'redux-saga/effects';
import { checkSignedInSaga } from './mainSaga';
import { GET_DASHBOARD_DATA_SG } from '../ducks/dashboardDuck';
import { getDashboardDataSaga } from './dashboardSaga';
import { GET_LATEST_POSTS_SG } from '../ducks/latestPostsDuck';
import { getLatestPostsSaga } from './latestPostsSaga';
import {
  logoutSaga,
  signInSaga,
  signUpSaga,
  summitSignInOTP_Saga,
} from './authSaga';
import {
  CHECK_SIGNED_IN,
  LOGOUT,
  REQUEST_SIGN_IN_SG,
  REQUEST_SIGN_UP_SG,
  SUBMIT_SIGN_IN_OTP_SG,
} from '../ducks/authDuck';
import { GET_TOP_CUSTOMERS_SG } from '../ducks/topCustomersDuck';
import { getTopCustomersSaga } from './topCustomersSaga';
import { getVenuesSaga, putVenueSaga, saveVenueSaga } from './VenuesSaga';
import { GET_VENUES_SG, PUT_VENUE, SAVE_VENUE } from '../ducks/VenueDuck';
import {
  getCompaniesSaga, getCompanySubscriptionsSaga,
  putCompanySaga,
  saveCompanySaga,
} from './companySaga';
import {
  GET_COMPANIES_SG, GET_COMPANY_SUBSCRIPTION_SG,
  PUT_COMPANY,
  SAVE_COMPANY,
} from '../ducks/companyDuck';

function* actionWatcher() {
  yield takeLatest(CHECK_SIGNED_IN, checkSignedInSaga);
  yield takeLatest(REQUEST_SIGN_IN_SG, signInSaga);
  yield takeLatest(SUBMIT_SIGN_IN_OTP_SG, summitSignInOTP_Saga);
  yield takeLatest(REQUEST_SIGN_UP_SG, signUpSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET_DASHBOARD_DATA_SG, getDashboardDataSaga);
  yield takeLatest(GET_LATEST_POSTS_SG, getLatestPostsSaga);
  yield takeLatest(GET_TOP_CUSTOMERS_SG, getTopCustomersSaga);
  yield takeLatest(SAVE_VENUE, saveVenueSaga);
  yield takeLatest(PUT_VENUE, putVenueSaga);
  yield takeLatest(GET_VENUES_SG, getVenuesSaga);
  yield takeLatest(SAVE_COMPANY, saveCompanySaga);
  yield takeLatest(PUT_COMPANY, putCompanySaga);
  yield takeLatest(GET_COMPANIES_SG, getCompaniesSaga);
  yield takeLatest(GET_COMPANY_SUBSCRIPTION_SG, getCompanySubscriptionsSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
